import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, error, serverError } from '@/lib/response';
import ResumeSubmission from '@/models/ResumeSubmission';
import { extractText, getDocumentProxy } from 'unpdf';
import mammoth from 'mammoth';

const ACTION_VERBS = [
  'developed', 'implemented', 'designed', 'built', 'created', 'managed', 'led',
  'improved', 'increased', 'reduced', 'optimized', 'deployed', 'integrated',
  'architected', 'collaborated', 'delivered', 'launched', 'achieved', 'automated',
  'analyzed', 'coordinated', 'established', 'executed', 'generated', 'maintained',
  'migrated', 'monitored', 'presented', 'resolved', 'streamlined', 'engineered',
  'spearheaded', 'accelerated', 'enhanced', 'contributed', 'transformed',
];

const FILLER_PHRASES = [
  'responsible for', 'duties included', 'helped with', 'worked on', 'assisted with',
];

// ── Info extraction ─────────────────────────────────────────────────────────

function extractEmail(text) {
  const m = text.match(/\b([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})\b/);
  return m ? m[1].toLowerCase() : '';
}

function extractPhone(text) {
  let m;

  // 1. Labeled line — "Phone:", "Mobile:", "Contact:", "Mob:", "Tel:", "WhatsApp:" etc.
  m = text.match(/(?:phone|mobile|mob|tel|ph|contact|cell|whatsapp)[^\d]{0,5}(?:\+?91)?[\s\-\.]?([6-9]\d{4}[\s\-\.]?\d{5})/i);
  if (m) return m[1].replace(/[\s\-\.]/g, '');

  // 2. +91 prefix
  m = text.match(/\+91[\s\-\.]?([6-9]\d{4}[\s\-\.]?\d{5})/);
  if (m) return m[1].replace(/[\s\-\.]/g, '');

  // 3. 91 prefix without +
  m = text.match(/\b91([6-9]\d{9})\b/);
  if (m) return m[1];

  // 4. Plain 10-digit solid
  m = text.match(/\b([6-9]\d{9})\b/);
  if (m) return m[1];

  // 5. Formatted XXXXX XXXXX / XXXXX-XXXXX / XXXXX.XXXXX
  m = text.match(/\b([6-9]\d{4})[\s\-\.](\d{5})\b/);
  if (m) return m[1] + m[2];

  // 6. Last resort — strip all non-digits and find first 10-digit starting 6-9
  const digits = text.replace(/[^\d]/g, '');
  m = digits.match(/([6-9]\d{9})/);
  if (m) return m[1];

  return '';
}

function countProjects(text) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const PROJ_HDR = /^(projects?|personal projects?|academic projects?|key projects?|project work|projects undertaken)$/i;
  const NEXT_SEC = /^(experience|education|skills|work|internship|achievements?|certifications?|awards?|summary|objective|profile|contact|references?|hobbies|interests|languages?|activities|publications?)$/i;

  let inProjects = false;
  let count = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (PROJ_HDR.test(line)) { inProjects = true; continue; }
    if (!inProjects) continue;
    if (NEXT_SEC.test(line) && line.length < 35) break;

    const ok =
      line.length >= 5 && line.length <= 80 &&
      !/^[•\-\*•►▶→\d]/.test(line) &&
      /^[A-Z]/.test(line) &&
      !/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{4})/i.test(line) &&
      !/^(developed|built|created|implemented|designed|used|worked|the |a |an |with |for |to )/i.test(line) &&
      !/^(technologies?|tech stack|tools used|languages?)\s*:/i.test(line);

    if (ok) count++;
  }
  return Math.min(count, 15);
}

// ────────────────────────────────────────────────────────────────────────────

const COMMON_KEYWORDS = [
  'python', 'javascript', 'java', 'react', 'node.js', 'sql', 'html', 'css',
  'git', 'github', 'api', 'aws', 'docker', 'typescript', 'mongodb', 'mysql',
  'rest', 'agile', 'communication', 'leadership', 'team', 'problem solving',
  'linux', 'figma', 'tailwind', 'next.js', 'express', 'postgresql', 'firebase',
];

function scoreResume(text) {
  const lower = text.toLowerCase();
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

  const sections = {
    contact: /\b(email|phone|mobile|linkedin|github|@[\w.]+)\b/i.test(text),
    summary: /\b(summary|objective|profile|about me|career goal)\b/i.test(text),
    experience: /\b(experience|employment|work history|professional background|internship)\b/i.test(text),
    education: /\b(education|degree|university|college|school|bachelor|master|b\.?tech|m\.?tech|b\.?e\b|m\.?e\b|bsc|msc|cgpa|gpa)\b/i.test(text),
    skills: /\b(skills|technologies|technical skills|core competencies|expertise|tools)\b/i.test(text),
    projects: /\b(projects?|personal projects?|academic projects?|key projects?|portfolio)\b/i.test(text),
  };

  const verbsFound = ACTION_VERBS.filter((v) => lower.includes(v));
  const metricRegex = /\d+\s*%|\d+x|\$[\d,]+|\b\d+\s*(users|clients|projects|teams|members|million|thousand|hours|days|weeks|months|people)\b/gi;
  const quantified = (text.match(metricRegex) || []).length;
  const words = text.split(/\s+/).filter(Boolean).length;
  const fillerCount = FILLER_PHRASES.filter((f) => lower.includes(f)).length;

  // Bullet point analysis
  const bulletLines = lines.filter((l) =>
    /^[•\-\*•‣►▶→]|^\d+[.)]\s/.test(l) && l.length > 15
  );
  const bulletsWithMetrics = bulletLines.filter((l) => metricRegex.test(l)).length;
  // Reset lastIndex since metricRegex is global
  metricRegex.lastIndex = 0;

  // Keyword gap analysis
  const keywordGaps = COMMON_KEYWORDS.filter((k) => !lower.includes(k));

  // COMPLETENESS — 45 pts
  let completeness = 0;
  if (sections.contact) completeness += 8;
  if (sections.summary) completeness += 7;
  if (sections.experience) completeness += 10;
  if (sections.education) completeness += 10;
  if (sections.skills) completeness += 10;

  // QUALITY — 35 pts
  let quality = 0;
  if (sections.projects) quality += 8;
  quality += Math.min(8, Math.floor((verbsFound.length / 5) * 8));
  quality += Math.min(9, quantified * 3);
  const wordScore =
    words >= 300 && words <= 800 ? 10 :
    words >= 200 ? 6 :
    words > 800 && words <= 1200 ? 7 : 3;
  quality += wordScore;

  // FORMAT — 20 pts
  let format = 0;
  if (words >= 250 && words <= 900) format += 10;
  else if (words > 0) format += 5;
  format += Math.max(0, 5 - fillerCount * 2);
  if (words > 50) format += 5;

  const score = Math.min(100, completeness + quality + format);

  const issues = [];
  if (!sections.contact) issues.push('Missing contact information (email/phone)');
  if (!sections.summary) issues.push('Add a professional summary or career objective');
  if (!sections.experience) issues.push('Work/internship experience section not detected');
  if (!sections.education) issues.push('Education section not found');
  if (!sections.skills) issues.push('Skills section is missing');
  if (!sections.projects) issues.push('Add a projects section — critical for freshers');
  if (verbsFound.length < 5) issues.push(`Use more action verbs (found ${verbsFound.length}, aim for 5+)`);
  if (quantified < 2) issues.push('Add quantified achievements — numbers make your resume stand out');
  if (bulletLines.length > 0 && bulletsWithMetrics === 0) issues.push('None of your bullet points contain measurable results (numbers/%)');
  if (words < 250) issues.push('Resume is too short — add more detail about your experience');
  if (words > 1200) issues.push('Resume is too long — aim for 1–2 pages maximum');
  if (fillerCount > 0) issues.push('Replace weak phrases like "responsible for" with strong action verbs');

  return {
    score,
    completeness,
    quality,
    format,
    sections,
    verbCount: verbsFound.length,
    quantifiedCount: quantified,
    wordCount: words,
    bulletCount: bulletLines.length,
    bulletsWithMetrics,
    keywordGaps: keywordGaps.slice(0, 8),
    issues,
  };
}

async function parseFileText(buffer, mimeType, fileName) {
  const ext = (fileName || '').split('.').pop().toLowerCase();

  // PDF
  if (mimeType === 'application/pdf' || ext === 'pdf') {
    const uint8 = new Uint8Array(buffer);
    const pdf = await getDocumentProxy(uint8);
    const { text } = await extractText(pdf, { mergePages: true });
    return text || '';
  }

  // DOCX
  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    ext === 'docx'
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value || '';
  }

  // DOC (older Word — mammoth handles many .doc files too)
  if (mimeType === 'application/msword' || ext === 'doc') {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value || '';
    } catch {
      throw new Error('Could not read .doc file. Try saving it as .docx and re-uploading.');
    }
  }

  // Plain text
  if (mimeType === 'text/plain' || ext === 'txt') {
    return buffer.toString('utf-8');
  }

  throw new Error('Unsupported file type. Please upload a PDF, DOCX, DOC, or TXT file.');
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume');
    const name = (formData.get('name') || '').trim();
    const email = (formData.get('email') || '').trim();

    if (!file || typeof file === 'string') return error('No file uploaded');

    const buffer = Buffer.from(await file.arrayBuffer());
    let text;
    try {
      text = await parseFileText(buffer, file.type, file.name);
    } catch (e) {
      return error(e.message || 'Could not read the file. Please try a different format.');
    }

    if (!text || text.trim().length < 50) {
      return error(
        'The file appears to be empty or image-based (scanned). Please upload a text-based resume.'
      );
    }

    const result = scoreResume(text);
    const extractedEmail = extractEmail(text);
    const phone = extractPhone(text);
    const projectCount = countProjects(text);

    await connectDB();

    if (phone) {
      const exists = await ResumeSubmission.findOne({ phone }).lean();
      if (!exists) {
        await ResumeSubmission.create({ email: extractedEmail, phone, projectCount });
      }
    } else {
      await ResumeSubmission.create({ email: extractedEmail, phone: '', projectCount });
    }

    return ok({ result });
  } catch (err) {
    return serverError(err);
  }
}

async function toggleContacted(request) {
  try {
    await connectDB();
    const { id } = await request.json();
    const doc = await ResumeSubmission.findById(id);
    if (!doc) return error('Not found', 404);
    doc.contacted = !doc.contacted;
    await doc.save();
    return ok({ contacted: doc.contacted });
  } catch (err) {
    return serverError(err);
  }
}

async function listSubmissions(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = 20;
    const skip = (page - 1) * limit;

    const [submissions, total] = await Promise.all([
      ResumeSubmission.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ResumeSubmission.countDocuments(),
    ]);

    return ok({ submissions, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    return serverError(err);
  }
}

export const GET = withAuth(listSubmissions);
export const PATCH = withAuth(toggleContacted);

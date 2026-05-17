import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, serverError } from '@/lib/response';
import StudentOffer from '@/models/StudentOffer';

const DEFAULT_SERVICES = [
  {
    icon: 'FileText',
    title: 'Resume Optimization',
    description: 'ATS-friendly format, action verb rewrites, keyword gap analysis, and measurable bullet points that get you shortlisted.',
    highlight: false,
  },
  {
    icon: 'Linkedin',
    title: 'LinkedIn Profile Building',
    description: 'Professional headline, keyword-rich summary, skills optimization, and profile setup that recruiters actually notice.',
    highlight: false,
  },
  {
    icon: 'Globe',
    title: 'Portfolio Website',
    description: 'Custom Next.js portfolio, hosted and deployed, SEO-optimized — your personal brand on the internet.',
    highlight: false,
  },
  {
    icon: 'Package',
    title: 'Career Starter Bundle',
    description: 'All three services together at a special student price. The complete launchpad for your first job or internship.',
    highlight: true,
  },
];

async function getOrCreate() {
  await connectDB();
  let doc = await StudentOffer.findOne().lean();
  if (!doc) {
    doc = await StudentOffer.create({ services: DEFAULT_SERVICES });
    doc = doc.toObject();
  }
  if (!doc.services?.length) {
    doc = await StudentOffer.findByIdAndUpdate(
      doc._id,
      { services: DEFAULT_SERVICES },
      { new: true }
    ).lean();
  }
  return doc;
}

export async function GET() {
  try {
    const doc = await getOrCreate();
    return ok({ offer: doc });
  } catch (err) {
    return serverError(err);
  }
}

async function updateOffer(request) {
  try {
    await connectDB();
    const body = await request.json();
    let doc = await StudentOffer.findOne();
    if (!doc) {
      doc = await StudentOffer.create({ ...body, services: body.services || DEFAULT_SERVICES });
    } else {
      Object.assign(doc, body);
      await doc.save();
    }
    return ok({ offer: doc });
  } catch (err) {
    return serverError(err);
  }
}

export const PUT = withAuth(updateOffer);

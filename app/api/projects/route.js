import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, created, error, serverError } from '@/lib/response';
import Project from '@/models/Project';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const query = { isActive: true };
    if (featured === 'true') query.isFeatured = true;
    if (category) query.category = category;
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    return ok({ projects });
  } catch (err) {
    return serverError(err);
  }
}

async function createProject(request) {
  try {
    await connectDB();
    const body = await request.json();
    if (!body.title || !body.description) return error('Title and description are required');
    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    const project = await Project.create(body);
    return created({ project });
  } catch (err) {
    if (err.code === 11000) return error('A project with this slug already exists');
    return serverError(err);
  }
}

export const POST = withAuth(createProject);

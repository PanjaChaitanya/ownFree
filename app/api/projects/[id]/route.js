import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, error, serverError } from '@/lib/response';
import Project from '@/models/Project';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const project = await Project.findOne({
      $or: [{ _id: id.match(/^[0-9a-f]{24}$/) ? id : null }, { slug: id }],
      isActive: true,
    });
    if (!project) return error('Project not found', 404);
    return ok({ project });
  } catch (err) {
    return serverError(err);
  }
}

async function updateProject(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const project = await Project.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!project) return error('Project not found', 404);
    return ok({ project });
  } catch (err) {
    if (err.code === 11000) return error('A project with this slug already exists');
    return serverError(err);
  }
}

async function deleteProject(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) return error('Project not found', 404);
    return ok({ message: 'Project deleted' });
  } catch (err) {
    return serverError(err);
  }
}

export const PUT = withAuth(updateProject);
export const DELETE = withAuth(deleteProject);

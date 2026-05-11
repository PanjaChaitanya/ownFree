import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, error, serverError } from '@/lib/response';
import Blog from '@/models/Blog';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const blog = await Blog.findOne({
      $or: [{ _id: id.match(/^[0-9a-f]{24}$/) ? id : null }, { slug: id }],
      isPublished: true,
    });
    if (!blog) return error('Blog not found', 404);
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });
    return ok({ blog });
  } catch (err) {
    return serverError(err);
  }
}

async function updateBlog(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    if (body.isPublished && !body.publishedAt) body.publishedAt = new Date();
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true });
    if (!blog) return error('Blog not found', 404);
    return ok({ blog });
  } catch (err) {
    if (err.code === 11000) return error('A blog with this slug already exists');
    return serverError(err);
  }
}

async function deleteBlog(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return error('Blog not found', 404);
    return ok({ message: 'Blog deleted' });
  } catch (err) {
    return serverError(err);
  }
}

export const PUT = withAuth(updateBlog);
export const DELETE = withAuth(deleteBlog);

import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, created, error, serverError } from '@/lib/response';
import Blog from '@/models/Blog';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');
    const query = { isPublished: true };
    if (featured === 'true') query.isFeatured = true;
    if (category) query.category = category;
    const blogs = await Blog.find(query).sort({ publishedAt: -1 }).limit(limit);
    return ok({ blogs });
  } catch (err) {
    return serverError(err);
  }
}

async function createBlog(request) {
  try {
    await connectDB();
    const body = await request.json();
    if (!body.title || !body.content) return error('Title and content are required');
    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    if (body.isPublished && !body.publishedAt) {
      body.publishedAt = new Date();
    }
    const blog = await Blog.create(body);
    return created({ blog });
  } catch (err) {
    if (err.code === 11000) return error('A blog with this slug already exists');
    return serverError(err);
  }
}

export const POST = withAuth(createBlog);

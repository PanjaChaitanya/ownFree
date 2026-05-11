import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, serverError } from '@/lib/response';
import Project from '@/models/Project';
import Service from '@/models/Service';
import ContactMessage from '@/models/ContactMessage';
import Blog from '@/models/Blog';
import Testimonial from '@/models/Testimonial';

async function getDashboardStats() {
  try {
    await connectDB();
    const [
      totalProjects,
      totalServices,
      totalMessages,
      unreadMessages,
      totalBlogs,
      totalTestimonials,
      recentMessages,
      recentProjects,
    ] = await Promise.all([
      Project.countDocuments({ isActive: true }),
      Service.countDocuments({ isActive: true }),
      ContactMessage.countDocuments({ isArchived: false }),
      ContactMessage.countDocuments({ isRead: false, isArchived: false }),
      Blog.countDocuments({ isPublished: true }),
      Testimonial.countDocuments({ isActive: true }),
      ContactMessage.find({ isArchived: false }).sort({ createdAt: -1 }).limit(5),
      Project.find({ isActive: true }).sort({ createdAt: -1 }).limit(4),
    ]);

    return ok({
      stats: {
        totalProjects,
        totalServices,
        totalMessages,
        unreadMessages,
        totalBlogs,
        totalTestimonials,
      },
      recentMessages,
      recentProjects,
    });
  } catch (err) {
    return serverError(err);
  }
}

export const GET = withAuth(getDashboardStats);

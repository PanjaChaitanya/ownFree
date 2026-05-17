import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import Blog from '@/models/Blog';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://horizonweblabs.vercel.app';

export default async function sitemap() {
  const now = new Date();

  const staticRoutes = [
    // Core pages
    { url: `${BASE}`,                                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0  },
    { url: `${BASE}/about`,                              lastModified: now, changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/services`,                           lastModified: now, changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${BASE}/projects`,                           lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/blog`,                               lastModified: now, changeFrequency: 'daily',   priority: 0.8  },
    { url: `${BASE}/contact`,                            lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/pricing`,                            lastModified: now, changeFrequency: 'monthly', priority: 0.75 },

    // Student & resume tools — new, high-intent pages
    { url: `${BASE}/resume-checker`,                     lastModified: now, changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${BASE}/student-special`,                    lastModified: now, changeFrequency: 'weekly',  priority: 0.9  },

    // Local SEO landing pages
    { url: `${BASE}/web-developer-hyderabad`,            lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/web-developer-andhra-pradesh`,       lastModified: now, changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/web-developer-vizag`,                lastModified: now, changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/web-developer-vijayawada`,           lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/web-developer-india`,                lastModified: now, changeFrequency: 'monthly', priority: 0.9  },
  ];

  try {
    await connectDB();
    const [projects, blogs] = await Promise.all([
      Project.find({ isActive: true }).select('slug updatedAt').lean(),
      Blog.find({ isPublished: true }).select('slug updatedAt').lean(),
    ]);

    const projectRoutes = projects.map((p) => ({
      url: `${BASE}/projects/${p.slug}`,
      lastModified: p.updatedAt || now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    const blogRoutes = blogs.map((b) => ({
      url: `${BASE}/blog/${b.slug}`,
      lastModified: b.updatedAt || now,
      changeFrequency: 'weekly',
      priority: 0.65,
    }));

    return [...staticRoutes, ...projectRoutes, ...blogRoutes];
  } catch {
    return staticRoutes;
  }
}

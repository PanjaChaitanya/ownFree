import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import Blog from '@/models/Blog';


export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://horizonweblabs.com';

  const staticRoutes = [
    { url: baseUrl,                                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/about`,                         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`,                      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/projects`,                      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/blog`,                          lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
    { url: `${baseUrl}/contact`,                       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    // Location landing pages — high priority for local SEO
    { url: `${baseUrl}/web-developer-hyderabad`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${baseUrl}/web-developer-andhra-pradesh`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${baseUrl}/web-developer-vizag`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${baseUrl}/web-developer-vijayawada`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/web-developer-india`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9  },
  ];

  try {
    await connectDB();
    const [projects, blogs] = await Promise.all([
      Project.find({ isActive: true }).select('slug updatedAt').lean(),
      Blog.find({ isPublished: true }).select('slug updatedAt').lean(),
    ]);

    const projectRoutes = projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    const blogRoutes = blogs.map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: b.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    return [...staticRoutes, ...projectRoutes, ...blogRoutes];
  } catch {
    return staticRoutes;
  }
}

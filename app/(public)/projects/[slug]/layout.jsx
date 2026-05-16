import { connectDB } from '@/lib/db';
import Project from '@/models/Project';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://horizonweblabs.com';

  try {
    await connectDB();
    const project = await Project.findOne({ slug, isActive: true }).select(
      'title description tags image'
    ).lean();

    if (!project) {
      return {
        title: 'Project Not Found',
        description: 'The requested project could not be found.',
      };
    }

    const title = `${project.title} — Web Development Project | Horizon Web Labs`;
    const description =
      project.description?.slice(0, 155) ||
      `Case study: ${project.title}. Built by Horizon Web Labs, a web development company in Hyderabad, India.`;

    return {
      title,
      description,
      keywords: [
        project.title,
        ...(project.tags || []),
        'web development project Hyderabad',
        'web app case study India',
        'Horizon Web Labs portfolio',
      ],
      alternates: { canonical: `/projects/${slug}` },
      openGraph: {
        title,
        description,
        url: `/projects/${slug}`,
        type: 'article',
        images: project.image ? [{ url: project.image, width: 1200, height: 630, alt: project.title }] : [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: project.image ? [project.image] : [`${baseUrl}/og-image.png`],
      },
    };
  } catch {
    return {
      title: 'Project Case Study | Horizon Web Labs',
      description: 'Web development project by Horizon Web Labs, Hyderabad.',
    };
  }
}

export default function ProjectSlugLayout({ children }) {
  return children;
}

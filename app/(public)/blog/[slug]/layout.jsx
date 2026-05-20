import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://horizonweblabs.vercel.app';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    await connectDB();
    const blog = await Blog.findOne({ slug, isPublished: true })
      .select('title excerpt author category tags thumbnail seo publishedAt updatedAt readTime')
      .lean();

    if (!blog) {
      return {
        title: 'Article Not Found | Horizon Web Labs',
        description: 'The blog post you are looking for could not be found.',
        robots: { index: false },
      };
    }

    const title = blog.seo?.metaTitle || `${blog.title} | Horizon Web Labs`;
    const description =
      blog.seo?.metaDescription ||
      blog.excerpt ||
      `${blog.title} — Read the full article on Horizon Web Labs blog. Web development tips, SEO strategies, and digital growth insights from Hyderabad.`;
    const ogImage = blog.seo?.ogImage || blog.thumbnail || `${BASE}/og-image.png`;
    const canonical = `/blog/${slug}`;
    const keywords = blog.seo?.keywords?.length
      ? blog.seo.keywords
      : [
          ...(blog.tags || []),
          blog.category,
          'web development blog India',
          'Horizon Web Labs',
          'web developer Hyderabad',
        ].filter(Boolean);

    return {
      title,
      description,
      keywords,
      authors: [{ name: blog.author || 'Horizon Web Labs', url: BASE }],
      alternates: { canonical },
      openGraph: {
        type: 'article',
        title,
        description,
        url: canonical,
        siteName: 'Horizon Web Labs',
        locale: 'en_IN',
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        publishedTime: blog.publishedAt?.toISOString(),
        modifiedTime: blog.updatedAt?.toISOString(),
        authors: [blog.author || 'Horizon Web Labs'],
        tags: blog.tags || [],
        section: blog.category,
      },
      twitter: {
        card: 'summary_large_image',
        site: '@horizonweblabs',
        title,
        description,
        images: [ogImage],
      },
    };
  } catch {
    return {
      title: 'Blog | Horizon Web Labs',
      description: 'Web development tips and insights from Horizon Web Labs, Hyderabad.',
    };
  }
}

export default async function BlogSlugLayout({ children, params }) {
  const { slug } = await params;
  const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://horizonweblabs.vercel.app';

  let articleSchema = null;

  try {
    await connectDB();
    const blog = await Blog.findOne({ slug, isPublished: true })
      .select('title excerpt author category tags thumbnail publishedAt updatedAt readTime')
      .lean();

    if (blog) {
      articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        description: blog.excerpt || '',
        image: blog.thumbnail || `${BASE}/og-image.png`,
        author: {
          '@type': 'Organization',
          name: blog.author || 'Horizon Web Labs',
          url: BASE,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Horizon Web Labs',
          url: BASE,
          logo: {
            '@type': 'ImageObject',
            url: `${BASE}/H-logo-removebg.png`,
          },
        },
        datePublished: blog.publishedAt?.toISOString(),
        dateModified: blog.updatedAt?.toISOString(),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${BASE}/blog/${slug}`,
        },
        keywords: (blog.tags || []).join(', '),
        articleSection: blog.category,
        timeRequired: `PT${blog.readTime || 5}M`,
        inLanguage: 'en-IN',
      };
    }
  } catch {
    // schema generation failed — skip it
  }

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {children}
    </>
  );
}

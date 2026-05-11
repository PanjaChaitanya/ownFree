import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, default: '' },
    content: { type: String, required: true },
    thumbnail: { type: String, default: '' },
    thumbnailPublicId: { type: String, default: '' },
    author: { type: String, default: 'Horizon Web Labs' },
    category: { type: String, default: 'General' },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    readTime: { type: Number, default: 5 },
    views: { type: Number, default: 0 },
    publishedAt: { type: Date },
    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      keywords: [{ type: String }],
      ogImage: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

BlogSchema.index({ slug: 1 });
BlogSchema.index({ isPublished: 1 });
BlogSchema.index({ category: 1 });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

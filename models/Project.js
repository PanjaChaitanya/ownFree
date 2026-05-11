import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    thumbnailPublicId: { type: String, default: '' },
    gallery: [
      {
        url: { type: String },
        publicId: { type: String },
        caption: { type: String, default: '' },
      },
    ],
    websiteUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    techStack: [{ type: String }],
    category: { type: String, default: 'Web Development' },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    completionDate: { type: Date },
    clientName: { type: String, default: '' },
    order: { type: Number, default: 0 },
    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
);

ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ isFeatured: 1 });
ProjectSchema.index({ category: 1 });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);

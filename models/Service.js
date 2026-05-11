import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, default: '' },
    icon: { type: String, default: 'Code' },
    image: { type: String, default: '' },
    imagePublicId: { type: String, default: '' },
    features: [{ type: String }],
    pricing: {
      startingAt: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
      type: { type: String, enum: ['fixed', 'hourly', 'monthly', 'custom'], default: 'fixed' },
    },
    color: { type: String, default: '#7c3aed' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
);

ServiceSchema.index({ slug: 1 });
ServiceSchema.index({ order: 1 });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);

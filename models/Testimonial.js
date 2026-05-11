import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    position: { type: String, default: '' },
    company: { type: String, default: '' },
    avatar: { type: String, default: '' },
    avatarPublicId: { type: String, default: '' },
    review: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    projectRef: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

import mongoose from 'mongoose';

const ServiceItemSchema = new mongoose.Schema({
  icon: { type: String, default: 'FileText' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  highlight: { type: Boolean, default: false },
}, { _id: true });

const StudentOfferSchema = new mongoose.Schema({
  isEnabled: { type: Boolean, default: true },
  barText: { type: String, default: 'Are you a student or fresher? 🎓' },
  barCta: { type: String, default: 'See Student Offers' },
  heroTitle: { type: String, default: 'Launch Your Career the Right Way' },
  heroSubtitle: {
    type: String,
    default: 'Special packages designed for students and freshers — from resume to portfolio to LinkedIn, we set you up for success.',
  },
  services: { type: [ServiceItemSchema], default: [] },
  resumeCtaText: { type: String, default: 'Not sure where to start? Check your ATS score first — it\'s free.' },
  resumeCtaButton: { type: String, default: 'Check My Resume Score →' },
}, { timestamps: true });

export default mongoose.models.StudentOffer ||
  mongoose.model('StudentOffer', StudentOfferSchema);

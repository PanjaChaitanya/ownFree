import mongoose from 'mongoose';

const ResumeSubmissionSchema = new mongoose.Schema(
  {
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    projectCount: { type: Number, default: 0 },
    contacted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.ResumeSubmission ||
  mongoose.model('ResumeSubmission', ResumeSubmissionSchema);

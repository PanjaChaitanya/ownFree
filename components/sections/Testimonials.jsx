'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { staggerContainer, fadeUp } from '@/animations/variants';

const defaultTestimonials = [
  {
    _id: '1', name: 'Sarah Mitchell', position: 'CEO', company: 'TechStart Inc.',
    review: 'Horizon Web Labs transformed our online presence completely. The attention to detail and quality of work exceeded every expectation we had going into this project.',
    rating: 5,
  },
  {
    _id: '2', name: 'James Chen', position: 'Founder', company: 'GrowthBase',
    review: 'Working with them was an absolute pleasure. They delivered a stunning web app on time and within budget. Communication was clear throughout the whole process.',
    rating: 5,
  },
  {
    _id: '3', name: 'Priya Sharma', position: 'Marketing Director', company: 'Nexus Digital',
    review: 'The SEO results after working with them were phenomenal. Organic traffic increased by 200% in just 3 months. I can\'t recommend them highly enough.',
    rating: 5,
  },
  {
    _id: '4', name: 'Alex Rodriguez', position: 'CTO', company: 'InnovateTech',
    review: 'Best decision we made was hiring Horizon Web Labs. The code quality is exceptional and the team is incredibly responsive whenever we need anything.',
    rating: 5,
  },
  {
    _id: '5', name: 'Emily Carter', position: 'Product Lead', company: 'Bloom Studio',
    review: 'They took our vague concept and turned it into something we\'re genuinely proud of. The design is stunning and the site performs beautifully.',
    rating: 5,
  },
  {
    _id: '6', name: 'Michael Torres', position: 'CEO', company: 'Launchpad Co.',
    review: 'Fast, reliable, and professional. Our landing page went from 1.2% to 4.8% conversion rate after they redesigned it. The ROI has been incredible.',
    rating: 5,
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-200'}`} />
      ))}
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <motion.div variants={fadeUp} className="group">
      <div className="card h-full flex flex-col p-6">
        <div className="flex items-start justify-between mb-4">
          <StarRating rating={t.rating || 5} />
          <Quote className="w-6 h-6 text-violet-200 shrink-0" />
        </div>

        <blockquote className="text-zinc-700 text-[15px] leading-relaxed mb-6 flex-1">
          "{t.review}"
        </blockquote>

        <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-violet-500 to-violet-700 shrink-0 flex items-center justify-center">
            {t.avatar ? (
              <Image src={t.avatar} alt={t.name} fill className="object-cover" />
            ) : (
              <span className="text-white text-sm font-bold">{t.name[0]}</span>
            )}
          </div>
          <div>
            <p className="text-zinc-900 text-sm font-bold leading-tight">{t.name}</p>
            <p className="text-zinc-400 text-xs">
              {t.position}{t.company ? ` — ${t.company}` : ''}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.testimonials?.length > 0) setTestimonials(json.data.testimonials);
      })
      .catch(() => {});
  }, []);

  const active = testimonials.filter((t) => t.isActive !== false).slice(0, 6);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Client Love"
          title="What Our Clients Say"
          subtitle="Don't take our word for it — hear directly from businesses we've helped grow."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {active.map((t) => (
            <TestimonialCard key={t._id} t={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

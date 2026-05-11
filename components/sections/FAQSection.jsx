'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const defaultFAQs = [
  { _id: '1', question: 'How long does it take to build a website?', answer: 'Timelines vary by project complexity. A landing page typically takes 1-2 weeks, a business website 2-4 weeks, and a full web application 4-12 weeks. We provide a detailed timeline after our discovery call.' },
  { _id: '2', question: 'What technologies do you use?', answer: 'We specialise in Next.js, React, Node.js, MongoDB, PostgreSQL, and Tailwind CSS. We also work with Stripe for payments, Cloudinary for media, and Vercel/AWS for deployment. We choose the best stack for your specific needs.' },
  { _id: '3', question: 'Do you offer ongoing support after launch?', answer: 'Absolutely. We offer flexible maintenance packages that include bug fixes, performance monitoring, content updates, and feature enhancements. Most clients stay on a monthly retainer.' },
  { _id: '4', question: 'How much does a project cost?', answer: 'Pricing depends on scope and complexity. Landing pages start at $500, business websites at $1,500, and full web applications from $3,000+. We provide a detailed quote after understanding your requirements — no hidden fees.' },
  { _id: '5', question: 'Do you handle both design and development?', answer: 'Yes — we are a full-service studio. We handle UI/UX design, development, testing, deployment, and post-launch support. You get a single team responsible for everything.' },
  { _id: '6', question: 'Can I update the website myself after launch?', answer: 'Yes. We build projects with an integrated CMS admin panel so you can manage all content yourself without touching code. We also provide a short walkthrough and documentation.' },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-zinc-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-start justify-between gap-4 text-left group"
      >
        <span className="text-zinc-900 font-semibold text-[15px] leading-snug group-hover:text-violet-700 transition-colors">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="shrink-0 mt-0.5"
        >
          <Plus className={`w-5 h-5 transition-colors ${isOpen ? 'text-violet-600' : 'text-zinc-400 group-hover:text-zinc-600'}`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-zinc-500 text-[15px] leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [faqs, setFaqs] = useState(defaultFAQs);
  const [openId, setOpenId] = useState(defaultFAQs[0]._id);

  useEffect(() => {
    fetch('/api/faqs')
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.faqs?.length > 0) {
          setFaqs(json.data.faqs);
          setOpenId(json.data.faqs[0]._id);
        }
      })
      .catch(() => {});
  }, []);

  const active = faqs.filter((f) => f.isActive !== false);

  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before we start working together."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden divide-y-0 px-6"
        >
          {active.map((faq) => (
            <FAQItem
              key={faq._id}
              faq={faq}
              isOpen={openId === faq._id}
              onToggle={() => setOpenId(openId === faq._id ? null : faq._id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

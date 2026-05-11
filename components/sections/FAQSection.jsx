'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const defaultFAQs = [
  { _id: '1', question: 'How long does it take to build a website?', answer: 'Timelines vary by project complexity. A landing page typically takes 1-2 weeks, a business website 2-4 weeks, and a full web application 4-12 weeks. We provide a detailed timeline after our discovery call.' },
  { _id: '2', question: 'What technologies do you use?', answer: 'We specialise in Next.js, React, Node.js, MongoDB, PostgreSQL, and Tailwind CSS. We also work with Stripe for payments, Cloudinary for media, and Vercel/AWS for deployment.' },
  { _id: '3', question: 'Do you offer ongoing support after launch?', answer: 'Absolutely. We offer flexible maintenance packages that include bug fixes, performance monitoring, content updates, and feature enhancements. Most clients stay on a monthly retainer.' },
  { _id: '4', question: 'How much does a project cost?', answer: 'Pricing depends on scope and complexity. Landing pages start at $500, business websites at $1,500, and full web applications from $3,000+. We provide a detailed quote with no hidden fees.' },
  { _id: '5', question: 'Do you handle both design and development?', answer: 'Yes — we are a full-service studio handling UI/UX design, development, testing, deployment, and post-launch support. One team responsible for everything.' },
  { _id: '6', question: 'Can I update the website myself after launch?', answer: 'Yes. We build projects with an integrated CMS admin panel so you can manage all content without touching code. We also provide a walkthrough and documentation.' },
];

function FAQItem({ faq, isOpen, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="border-b border-zinc-100 last:border-0"
    >
      <motion.button
        onClick={onToggle}
        whileHover={{ x: 4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="w-full py-5 flex items-start justify-between gap-4 text-left group"
      >
        <span className={`font-semibold text-[15px] leading-snug transition-colors duration-200 ${isOpen ? 'text-violet-700' : 'text-zinc-900 group-hover:text-violet-700'}`}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? '#ede9fe' : '#f4f4f5' }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center"
        >
          <Plus className={`w-4 h-4 transition-colors ${isOpen ? 'text-violet-600' : 'text-zinc-500'}`} />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -8 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -4 }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="pb-5 text-zinc-500 text-[15px] leading-relaxed"
            >
              {faq.answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
          className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden px-6"
        >
          {active.map((faq, i) => (
            <FAQItem
              key={faq._id}
              faq={faq}
              index={i}
              isOpen={openId === faq._id}
              onToggle={() => setOpenId(openId === faq._id ? null : faq._id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

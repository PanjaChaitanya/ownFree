'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare, Send, Clock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { fadeUp, staggerContainer } from '@/animations/variants';

const serviceOptions = [
  'Web App Development', 'Landing Page', 'Portfolio Website',
  'Business Website', 'SEO Services', 'Resume Optimization', 'Other',
];

const budgetOptions = ['< $500', '$500 – $1,500', '$1,500 – $3,000', '$3,000 – $5,000', '$5,000+'];

const emptyForm = {
  name: '', email: '', phone: '', subject: '',
  message: '', service: '', budget: '',
};

const inputCls = 'w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all';
const selectCls = 'w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-700 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all';
const labelCls = 'block text-sm font-medium text-zinc-700 mb-1.5';

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState({
    email: 'hello@horizonweblabs.com',
    phone: '+1 (555) 000-0000',
    whatsapp: '',
  });
  const [form, setForm] = useState(emptyForm);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/content?section=contact')
      .then((r) => r.json())
      .then((json) => { if (json.success && json.data.contact) setContactInfo(json.data.contact); })
      .catch(() => {});
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        setSuccess(true);
        setForm(emptyForm);
        toast.success("Message sent! We'll get back to you within 24 hours.");
      } else {
        toast.error(json.error || 'Failed to send message.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
              Contact Us
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 leading-tight tracking-tight mb-5"
          >
            Let's Build
            <span className="gradient-text"> Together</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65 }}
            className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed"
          >
            Have a project in mind? We'd love to hear about it. Drop us a message and we'll get back within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Contact content */}
      <section className="pb-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          >
            {/* Info sidebar */}
            <motion.div variants={fadeUp} className="lg:col-span-2 space-y-5">
              <div className="card p-6 sm:p-8">
                <h2 className="text-zinc-900 font-bold text-xl mb-6">Get In Touch</h2>
                <div className="space-y-5">
                  {contactInfo.email && (
                    <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-violet-700" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-zinc-400 mb-0.5 uppercase tracking-wide font-medium">Email</p>
                        <p className="text-zinc-700 text-sm group-hover:text-violet-700 transition-colors truncate font-medium">
                          {contactInfo.email}
                        </p>
                      </div>
                    </a>
                  )}
                  {contactInfo.phone && (
                    <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400 mb-0.5 uppercase tracking-wide font-medium">Phone</p>
                        <p className="text-zinc-700 text-sm group-hover:text-blue-600 transition-colors font-medium">
                          {contactInfo.phone}
                        </p>
                      </div>
                    </a>
                  )}
                  {contactInfo.whatsapp && (
                    <a
                      href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400 mb-0.5 uppercase tracking-wide font-medium">WhatsApp</p>
                        <p className="text-zinc-700 text-sm group-hover:text-green-600 transition-colors font-medium">Chat with us</p>
                      </div>
                    </a>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 mb-0.5 uppercase tracking-wide font-medium">Response Time</p>
                      <p className="text-zinc-700 text-sm font-medium">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6 sm:p-8">
                <h3 className="text-zinc-900 font-bold mb-5">Why Work With Us?</h3>
                <ul className="space-y-3">
                  {[
                    'Free initial consultation',
                    'On-time project delivery',
                    'Transparent pricing',
                    '100% satisfaction guarantee',
                    'Ongoing support included',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-zinc-600">
                      <CheckCircle className="w-4 h-4 text-violet-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <div className="card p-6 sm:p-8">
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-zinc-900 font-bold text-xl mb-2">Message Sent!</h3>
                    <p className="text-zinc-500 mb-6 leading-relaxed">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setSuccess(false)} variant="outline" size="sm">
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Name *</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Email *</label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Phone</label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Service Needed</label>
                        <select name="service" value={form.service} onChange={handleChange} className={selectCls}>
                          <option value="">Select a service</option>
                          {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Budget Range</label>
                        <select name="budget" value={form.budget} onChange={handleChange} className={selectCls}>
                          <option value="">Select budget</option>
                          {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Subject</label>
                        <input
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="Project inquiry"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your project, goals, and timeline..."
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    <Button
                      type="submit"
                      loading={sending}
                      size="lg"
                      className="w-full justify-center"
                      iconRight={<Send className="w-4 h-4" />}
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

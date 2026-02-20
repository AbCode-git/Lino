import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Bridal Session',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          data: {
            name: formData.name,
            email: formData.email,
            type: formData.type,
            message: formData.message
          }
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          type: 'Bridal Session',
          message: ''
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact py-32 bg-primary" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <span className="text-gold text-xs uppercase tracking-[0.4em] font-montserrat block mb-6">Connect</span>
            <h2 className={`text-5xl md:text-7xl text-ivory font-playfair mb-12 leading-tight reveal-element ${inView ? 'active' : ''}`}>
              Secure Your <span className="italic font-light text-gold">Presence</span>
            </h2>

            <div className={`space-y-12 reveal-element ${inView ? 'active' : ''}`} style={{ transitionDelay: '200ms' }}>
              <div>
                <h3 className="text-gold text-[10px] uppercase tracking-widest mb-4 font-bold">The Studio</h3>
                <p className="text-ivory font-light text-xl">Meskel Square, Estifanos building<br />Addis Ababa, Ethiopia</p>
              </div>
              <div>
                <h3 className="text-gold text-[10px] uppercase tracking-widest mb-4 font-bold">Direct Line</h3>
                <p className="text-ivory font-light text-xl">+251 911 234 567<br />hello@linobeauty.com</p>
              </div>
              <div>
                <h3 className="text-gold text-[10px] uppercase tracking-widest mb-4 font-bold">Hours</h3>
                <p className="text-ivory font-light text-sm uppercase tracking-[0.3em]">Tue — Sun / 10am — 8pm</p>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className={`space-y-8 bg-primary-dark p-12 border border-ivory/5 shadow-2xl reveal-element ${inView ? 'active' : ''}`} style={{ transitionDelay: '300ms' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-2 group">
                  <label htmlFor="contact_name" className="text-[10px] text-gold uppercase tracking-widest font-bold group-focus-within:text-ivory transition-colors">Full Name</label>
                  <input
                    type="text"
                    id="contact_name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-ivory/10 py-4 text-ivory focus:border-gold focus-visible:border-gold outline-none transition-all duration-500 font-light placeholder:text-ivory/10 transition-property-[border-color]"
                    placeholder="e.g., Janice Doe…"
                    required
                  />
                </div>
                <div className="space-y-2 group">
                  <label htmlFor="contact_email" className="text-[10px] text-gold uppercase tracking-widest font-bold group-focus-within:text-ivory transition-colors">Email Address</label>
                  <input
                    type="email"
                    id="contact_email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-ivory/10 py-4 text-ivory focus:border-gold focus-visible:border-gold outline-none transition-all duration-500 font-light placeholder:text-ivory/10 transition-property-[border-color]"
                    placeholder="janice@atelier.com…"
                    required
                    spellCheck={false}
                  />
                </div>
              </div>
              <div className="space-y-2 group">
                <label htmlFor="contact_type" className="text-[10px] text-gold uppercase tracking-widest font-bold group-focus-within:text-ivory transition-colors">Inquiry Type</label>
                <select
                  id="contact_type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-ivory/10 py-4 text-ivory focus:border-gold focus-visible:border-gold outline-none transition-all duration-500 font-light appearance-none cursor-pointer transition-property-[border-color]"
                  required
                >
                  <option className="bg-primary text-ivory">Bridal Session</option>
                  <option className="bg-primary text-ivory">Editorial Shoot</option>
                  <option className="bg-primary text-ivory">Special Occasion</option>
                  <option className="bg-primary text-ivory">Consultation</option>
                </select>
              </div>
              <div className="space-y-2 group">
                <label htmlFor="contact_message" className="text-[10px] text-gold uppercase tracking-widest font-bold group-focus-within:text-ivory transition-colors">Message</label>
                <textarea
                  id="contact_message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-transparent border-b border-ivory/10 py-4 text-ivory focus:border-gold focus-visible:border-gold outline-none transition-all duration-500 font-light resize-none placeholder:text-ivory/10 transition-property-[border-color]"
                  placeholder="Describe your vision…"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-6 bg-gold text-primary font-bold uppercase tracking-[0.4em] text-xs transition-all duration-700 mt-8 shadow-xl ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-ivory focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary outline-none'}`}
              >
                {isSubmitting ? 'Sending Request…' : 'Request Appointment'}
              </button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gold/10 border border-gold/20 text-gold text-[10px] uppercase tracking-widest text-center"
                >
                  Message sent. Our studio will reach out to you shortly.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase tracking-widest text-center"
                >
                  Submission failed. Please check your connection and try again.
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

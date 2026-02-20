import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function AppointmentSection() {
  const [mounted, setMounted] = useState(false);

  // Form state
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    phone: '+251',
    service: '',
    date: '',
    time: '',
    notes: ''
  });

  const [today, setToday] = useState('');

  useEffect(() => {
    setMounted(true);
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  // Available time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00'
  ];

  // Available services (English Luxury)
  const services = [
    'Signature Hair Artistry',
    'Expert Makeup Artistry',
    'Bridal Couture',
    'Special Event Glamour',
    'The Polished Touch (Nails)',
    'Eye & Brow Definition'
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData(prev => ({
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
          type: 'appointment',
          data: appointmentData
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setAppointmentData({
          name: '', phone: '+251', service: '', date: '', time: '', notes: ''
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

  // Prevent rendering transition states until mounted to avoid hydration mismatch
  const canShow = mounted && inView;

  return (
    <section id="reservations" className="appointment py-32 bg-primary" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold text-xs uppercase tracking-[0.4em] font-montserrat block mb-4">Reservations</span>
          <h2 className={`text-5xl md:text-7xl text-ivory font-playfair mb-8 reveal-element ${canShow ? 'active' : ''}`}>
            Explore Your <span className="italic font-light text-gold">Transformation</span>
          </h2>
          <div className={`w-20 h-[1px] bg-gold/30 mx-auto mb-8 reveal-element ${canShow ? 'active' : ''}`} style={{ transitionDelay: '100ms' }}></div>
          <p className={`text-ivory/40 text-sm uppercase tracking-[0.2em] max-w-lg mx-auto reveal-element ${canShow ? 'active' : ''}`} style={{ transitionDelay: '200ms' }}>
            Bespoke artistry tailored to your unique essence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
          {/* Info Side */}
          <div className={`reveal-element ${canShow ? 'active' : ''}`} style={{ transitionDelay: '300ms' }}>
            <h3 className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-12">The Process</h3>

            <div className="space-y-12">
              {[
                { step: '01', title: 'Consultation', desc: 'Selection of bespoke services tailored to your structural vision.' },
                { step: '02', title: 'Scheduling', desc: 'Coordination of a private session at your preferred time.' },
                { step: '03', title: 'Preparation', desc: 'Providing essential details for our concierge to curate your experience.' },
                { step: '04', title: 'Confirmation', desc: 'Secure verification of your appointment via encrypted channels.' }
              ].map((item, idx) => (
                <div key={idx} className="flex group">
                  <div className="mr-8 flex flex-col items-center">
                    <div className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center text-gold text-xs font-montserrat group-hover:bg-gold group-hover:text-primary transition-all duration-500">
                      {item.step}
                    </div>
                    {idx !== 3 && <div className="w-[1px] h-full bg-gold/10 mt-4"></div>}
                  </div>
                  <div className="pb-8">
                    <h4 className="text-ivory font-playfair text-xl mb-3 tracking-wide">{item.title}</h4>
                    <p className="text-ivory/40 text-sm font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className={`bg-primary-light p-10 md:p-12 border border-ivory/5 reveal-element ${canShow ? 'active' : ''}`} style={{ transitionDelay: '400ms' }}>
            <h3 className="text-ivory font-playfair text-3xl mb-10 tracking-wide">Schedule Session</h3>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-2">
                  <label htmlFor="apt_name" className="text-gold text-[10px] uppercase tracking-[0.2em] font-bold">Full Name</label>
                  <input
                    type="text"
                    id="apt_name"
                    name="name"
                    autoComplete="name"
                    value={appointmentData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-ivory/10 py-3 text-ivory/80 focus:border-gold focus-visible:border-gold outline-none transition-all duration-500 font-light placeholder:text-ivory/20 transition-property-[border-color]"
                    placeholder="e.g., Alexander McQueen…"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="apt_phone" className="text-gold text-[10px] uppercase tracking-[0.2em] font-bold">Phone Number</label>
                  <input
                    type="tel"
                    id="apt_phone"
                    name="phone"
                    autoComplete="tel"
                    value={appointmentData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-ivory/10 py-3 text-ivory/80 focus:border-gold focus-visible:border-gold outline-none transition-all duration-500 font-light placeholder:text-ivory/20 transition-property-[border-color]"
                    placeholder="+251 091..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="apt_service" className="text-gold text-[10px] uppercase tracking-[0.2em] font-bold">Select Artistry</label>
                  <div className="relative group">
                    <select
                      id="apt_service"
                      name="service"
                      value={appointmentData.service}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-ivory/10 py-3 text-ivory/80 focus:border-gold focus-visible:border-gold outline-none transition-all duration-500 font-light appearance-none transition-property-[border-color] pr-8"
                      required
                    >
                      <option value="" className="bg-primary text-ivory/20">Choose Service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service} className="bg-primary text-ivory/80">{service}</option>
                      ))}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold/40 group-focus-within:text-gold transition-colors duration-500">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="apt_date" className="text-gold text-[10px] uppercase tracking-[0.2em] font-bold">Preferred Date</label>
                  <input
                    type="date"
                    id="apt_date"
                    name="date"
                    value={appointmentData.date}
                    onChange={handleChange}
                    min={today}
                    className="w-full bg-transparent border-b border-ivory/10 py-3 text-ivory/80 focus:border-gold focus-visible:border-gold outline-none transition-all duration-500 font-light color-scheme-dark transition-property-[border-color]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="apt_time" className="text-gold text-[10px] uppercase tracking-[0.2em] font-bold">Aesthetic Time</label>
                  <div className="relative group">
                    <select
                      id="apt_time"
                      name="time"
                      value={appointmentData.time}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-ivory/10 py-3 text-ivory/80 focus:border-gold focus-visible:border-gold outline-none transition-all duration-500 font-light appearance-none transition-property-[border-color] pr-8"
                      required
                    >
                      <option value="" className="bg-primary text-ivory/20">Choose Time</option>
                      {timeSlots.map((time, index) => (
                        <option key={index} value={time} className="bg-primary text-ivory/80">{time}</option>
                      ))}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold/40 group-focus-within:text-gold transition-colors duration-500">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="apt_notes" className="text-gold text-[10px] uppercase tracking-[0.2em] font-bold">Notes & Inspirations</label>
                <textarea
                  id="apt_notes"
                  name="notes"
                  value={appointmentData.notes}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-ivory/10 p-4 text-ivory/80 focus:border-gold focus-visible:border-gold outline-none transition-all duration-500 font-light placeholder:text-ivory/20 transition-property-[border-color]"
                  placeholder="Describe your vision or special requests…"
                  rows="3"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 bg-gold text-primary font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-ivory shadow-2xl'} focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary outline-none transition-property-[background-color,color,opacity]`}
              >
                {isSubmitting ? 'Booking Session…' : 'Book Now!!'}
              </button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gold/10 border border-gold/20 text-gold text-[10px] uppercase tracking-widest text-center"
                >
                  Thank you! Your session is being processed. Our concierge will contact you shortly.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase tracking-widest text-center"
                >
                  We encountered an issue. Please try again or contact us directly.
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        .color-scheme-dark {
          color-scheme: dark;
        }
      `}</style>
    </section>
  );
}
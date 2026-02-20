import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function ServicesSection() {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const services = [
    {
      title: 'Signature Hair Artistry',
      subtitle: 'Precision Styling',
      description: 'Sculpted styles and bespoke treatments designed for elegance and longevity.'
    },
    {
      title: 'Expert Makeup Artistry',
      subtitle: 'The Sculpted Visage',
      description: 'Precision application enhancing your structural beauty for high-profile events.'
    },
    {
      title: 'The Polished Touch',
      subtitle: 'Luxury Manicure',
      description: 'Intricate detail and restorative care for a perfectly polished finishing touch.'
    },
    {
      title: 'Eye & Brow Definition',
      subtitle: 'The Framing Art',
      description: 'Framing your gaze with meticulous shaping and sophisticated definition.'
    },
    {
      title: 'Bridal Couture',
      subtitle: 'Wedding Specialist',
      description: 'Comprehensive beauty curation for the definitive luxury wedding experience.'
    },
    {
      title: 'Cinematic Artistry',
      subtitle: 'Special Effects',
      description: 'Cinematic and editorial artistry for visionary projects and photoshoots.'
    }
  ];

  return (
    <section id="services" className="services py-32 bg-primary-dark" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-gold text-xs uppercase tracking-[0.3em] font-montserrat block mb-4">The Collection</span>
            <h2 className={`text-5xl md:text-7xl text-ivory font-playfair leading-tight reveal-element ${inView ? 'active' : ''}`}>
              Bespoke <span className="italic font-light text-gold">Services</span>
            </h2>
          </div>
          <p className={`text-ivory/40 text-sm max-w-sm mb-4 reveal-element ${inView ? 'active' : ''}`} style={{ transitionDelay: '200ms' }}>
            A curated selection of artistic disciplines, delivered with absolute precision and discretion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-ivory/5 border border-ivory/5">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card p-12 bg-primary hover:bg-primary-light transition-colors duration-500 hover:text-gold focus-within:bg-primary-light outline-none reveal-element ${inView ? 'active' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="text-gold/30 text-xs font-montserrat tracking-widest mb-6 block uppercase">{service.subtitle}</span>
              <h3 className="text-2xl text-ivory font-playfair mb-6 group-hover:text-gold transition-colors">{service.title}</h3>
              <p className="text-ivory/40 text-sm font-light leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="h-[1px] w-8 bg-gold/20 group-hover:w-16 transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

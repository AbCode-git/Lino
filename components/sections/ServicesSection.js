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
    <section id="services" className="services py-32 bg-primary-dark">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gold text-xs uppercase tracking-[0.3em] font-montserrat block mb-4"
            >
              The Collection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl text-ivory font-playfair leading-tight"
            >
              Services
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-ivory/40 text-sm max-w-sm mb-4"
          >
            A curated selection of artistic disciplines, delivered with absolute precision and discretion.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-ivory/5 border border-ivory/5">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="service-card p-12 bg-primary hover:bg-primary-light transition-colors duration-500 hover:text-gold focus-within:bg-primary-light outline-none"
            >
              <span className="text-gold/30 text-xs font-montserrat tracking-widest mb-6 block uppercase">{service.subtitle}</span>
              <h3 className="text-2xl text-ivory font-playfair mb-6 group-hover:text-gold transition-colors">{service.title}</h3>
              <p className="text-ivory/40 text-sm font-light leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="h-[1px] w-8 bg-gold/20 group-hover:w-16 transition-all duration-700"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

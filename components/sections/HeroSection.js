import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const sectionRef = useRef(null);

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      suppressHydrationWarning
      className="hero min-h-screen flex items-center px-[5%] relative overflow-hidden bg-primary"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover opacity-30"
        >
          <source src="/videos/interior.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>
      </div>

      <div className="hero-content relative z-[2] max-w-[800px]">
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={textVariants}
          className="inline-block px-4 py-1 border border-gold/30 rounded-full mb-6"
        >
          <span className="text-gold text-xs uppercase tracking-widest font-montserrat">Certified Makeup Artistry</span>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl text-gold mb-4 font-playfair leading-[0.9] italic"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={textVariants}
        >
          Lino <br /> <span className="text-ivory not-italic">Beauty</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-10 text-ivory/80 max-w-[500px] font-light leading-relaxed"
          initial="hidden"
          animate="visible"
          custom={2}
          variants={textVariants}
        >
          Elevating your essence through the sophisticated art of transformation. Bespoke glamour for the modern individual.
        </motion.p>

        <motion.div
          className="cta-container flex gap-6 flex-wrap"
          initial="hidden"
          animate="visible"
          custom={3}
          variants={textVariants}
        >
          <Link
            href="/#reservations"
            className="px-10 py-4 bg-gold text-primary font-bold uppercase tracking-widest text-xs transition-colors duration-500 hover:bg-ivory focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary outline-none"
          >
            Book a Session
          </Link>
          <Link
            href="/#services"
            className="px-10 py-4 border border-ivory/30 text-ivory font-bold uppercase tracking-widest text-xs transition-all duration-500 hover:border-gold hover:text-gold focus-visible:border-gold focus-visible:text-gold outline-none"
            style={{ transitionProperty: 'border-color, color' }}
          >
            The Atelier
          </Link>
        </motion.div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute left-[5%] bottom-10 h-32 w-[1px] bg-gold/20 hidden lg:block">
        <motion.div
          className="w-full bg-gold h-1/2"
          animate={{ height: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
}

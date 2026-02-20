import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import OptimizedImage from '../ui/OptimizedImage';
import Link from 'next/link';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yFrame = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="about" className="about py-32 bg-primary-dark overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
              style={{ y: yImage }}
            >
              <OptimizedImage
                src="/images/lulit-profile.jpg"
                alt="Lulit - Certified Makeup Artist"
                width={600}
                height={800}
                className="grayscale hover:grayscale-0 transition-all duration-1000 border border-ivory/10 shadow-2xl"
              />
            </motion.div>
            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-10 -right-10 bg-gold p-8 z-20"
            >
              <span className="block text-4xl font-playfair text-primary font-bold leading-none">6+</span>
              <span className="text-[10px] text-primary/80 uppercase tracking-widest font-bold">Years of Artistry</span>
            </motion.div>
            {/* Decorative frame */}
            <motion.div
              className="absolute top-10 -left-10 w-full h-full border border-gold/20 -z-10"
              style={{ y: yFrame }}
            ></motion.div>
          </div>

          <div className="lg:w-1/2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-gold text-xs uppercase tracking-[0.4em] font-montserrat block mb-6"
            >
              The Artiste
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-5xl md:text-7xl text-ivory font-playfair mb-8 leading-tight"
            >
              Crafting <span className="italic font-light text-gold">Timeless</span> Elegance
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-6 text-ivory/60 font-light leading-relaxed"
            >
              <p>
                Lino Beauty represents the culmination of a six-year journey in professional makeup artistry. Led by Lulit, a certified specialist in high-fashion and bridal aesthetics, our studio is dedicated to the belief that beauty is an individual masterpiece.
              </p>
              <p>
                We eschew the generic for the bespoke, blending contemporary techniques with a classic understanding of structure and light. Every session is a private atelier experience, tailored to evoke your most sophisticated self.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-12 flex items-center gap-6"
            >
              <div className="w-12 h-[1px] bg-gold"></div>
              <span className="text-gold font-playfair italic text-2xl">Lulit W.</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Link
                href="/#reservations"
                className="inline-block mt-12 px-10 py-4 border border-gold text-gold text-[10px] uppercase tracking-widest hover:bg-gold hover:text-primary focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary outline-none transition-all duration-500"
                style={{ transitionProperty: 'background-color, color' }}
              >
                Learn Our Philosophy
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
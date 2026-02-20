import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import OptimizedImage from '../ui/OptimizedImage';
import Link from 'next/link';

export default function AboutSection() {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="about" className="about py-32 bg-primary-dark overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative">
            <div className={`relative z-10 reveal-element ${inView ? 'active' : ''}`}>
              <OptimizedImage
                src="/images/lulit-profile.jpg"
                alt="Lulit - Certified Makeup Artist"
                width={600}
                height={800}
                className="grayscale hover:grayscale-0 transition-all duration-1000 border border-ivory/10 shadow-2xl"
              />
            </div>
            {/* Experience Badge */}
            <div className={`absolute -bottom-10 -right-10 bg-gold p-8 z-20 reveal-element ${inView ? 'active' : ''}`} style={{ transitionDelay: '300ms' }}>
              <span className="block text-4xl font-playfair text-primary font-bold leading-none">6+</span>
              <span className="text-[10px] text-primary/80 uppercase tracking-widest font-bold">Years of Artistry</span>
            </div>
            {/* Decorative frame */}
            <div className="absolute top-10 -left-10 w-full h-full border border-gold/20 -z-10"></div>
          </div>

          <div className="lg:w-1/2">
            <span className="text-gold text-xs uppercase tracking-[0.4em] font-montserrat block mb-6">The Artiste</span>
            <h2 className={`text-5xl md:text-7xl text-ivory font-playfair mb-8 leading-tight reveal-element ${inView ? 'active' : ''}`}>
              Crafting <span className="italic font-light text-gold">Timeless</span> Elegance
            </h2>

            <div className={`space-y-6 text-ivory/60 font-light leading-relaxed reveal-element ${inView ? 'active' : ''}`} style={{ transitionDelay: '200ms' }}>
              <p>
                Lino Beauty represents the culmination of a six-year journey in professional makeup artistry. Led by Lulit, a certified specialist in high-fashion and bridal aesthetics, our studio is dedicated to the belief that beauty is an individual masterpiece.
              </p>
              <p>
                We eschew the generic for the bespoke, blending contemporary techniques with a classic understanding of structure and light. Every session is a private atelier experience, tailored to evoke your most sophisticated self.
              </p>
            </div>

            <div className={`mt-12 flex items-center gap-6 reveal-element ${inView ? 'active' : ''}`} style={{ transitionDelay: '400ms' }}>
              <div className="w-12 h-[1px] bg-gold"></div>
              <span className="text-gold font-playfair italic text-2xl">Lulit W.</span>
            </div>

            <Link
              href="/#contact"
              className="inline-block mt-12 px-10 py-4 border border-gold text-gold text-[10px] uppercase tracking-widest hover:bg-gold hover:text-primary focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary outline-none transition-all duration-500"
              style={{ transitionProperty: 'background-color, color' }}
            >
              Learn Our Philosophy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
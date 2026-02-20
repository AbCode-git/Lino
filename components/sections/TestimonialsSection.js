import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '../ui/OptimizedImage';

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Bride',
      quote: 'Lulit transformed me into a masterpiece. Not just makeup, but an elevation of my soul for my wedding day. Truly unparalleled artistry.',
      rating: 5,
      image: '/images/gallery/make-up-2.jpg'
    },
    {
      id: 2,
      name: 'Meron Tadesse',
      role: 'Editorial Model',
      quote: 'Working with Lino Beauty is a journey into structural perfection. The light, the shadow, the texture—everything is meticulously curated.',
      rating: 5,
      image: '/images/gallery/make-up-7.jpg'
    },
    {
      id: 3,
      name: 'Rebecca Alemayehu',
      role: 'Private Client',
      quote: 'I do not trust anyone else with my presence. Lulit understands my features better than I do myself. Exceptional and private.',
      rating: 5,
      image: '/images/gallery/make-up-and-hair-10.jpg'
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="testimonials py-32 bg-primary overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <span className="text-gold text-xs uppercase tracking-[0.4em] font-montserrat block mb-6">The Verdict</span>
            <h2 className={`text-5xl md:text-7xl text-ivory font-playfair mb-12 leading-tight reveal-element ${inView ? 'active' : ''}`}>
              Voice of <span className="italic font-light text-gold">Elegance</span>
            </h2>

            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <p className="text-2xl md:text-3xl font-playfair italic text-ivory/80 leading-relaxed mb-8">
                    “{testimonials[currentSlide].quote}”
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-[1px] bg-gold"></div>
                    <div>
                      <p className="text-gold text-[10px] uppercase tracking-widest font-bold mb-1">{testimonials[currentSlide].role}</p>
                      <div className="w-8 h-[1px] bg-gold/30"></div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-4 mt-12">
              <button onClick={prevSlide} className="w-12 h-12 border border-ivory/10 flex items-center justify-center text-ivory hover:border-gold hover:text-gold focus-visible:border-gold focus-visible:text-gold outline-none transition-colors duration-500" aria-label="Previous testimonial">←</button>
              <button onClick={nextSlide} className="w-12 h-12 border border-ivory/10 flex items-center justify-center text-ivory hover:border-gold hover:text-gold focus-visible:border-gold focus-visible:text-gold outline-none transition-colors duration-500" aria-label="Next testimonial">→</button>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="aspect-[4/5] relative overflow-hidden grayscale border border-ivory/5 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <OptimizedImage
                    src={testimonials[currentSlide].image}
                    alt={testimonials[currentSlide].name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Decorative frame */}
            <div className="absolute top-10 right-10 w-full h-full border border-gold/20 -z-10 translate-x-10 translate-y-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
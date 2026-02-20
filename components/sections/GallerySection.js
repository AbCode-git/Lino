import { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import OptimizedImage from '../ui/OptimizedImage';

const galleryItems = [
  {
    category: 'makeup',
    image: '/images/gallery/make-up-6.jpg',
    title: 'Noir Glamour',
    description: 'Sophisticated evening aesthetics'
  },
  {
    category: 'hair',
    image: '/images/gallery/hair-1.jpg',
    title: 'Sculpted Silhouette',
    description: 'Precision hair tailoring'
  },
  {
    category: 'wedding',
    image: '/images/gallery/bridal-shower-2.jpg',
    title: 'The Bride',
    description: 'Timeless structural beauty'
  },
  {
    category: 'makeup',
    image: '/images/gallery/make-up-12.jpg',
    title: 'Gold Essence',
    description: 'Metallic focus artistry'
  },
  {
    category: 'hair',
    image: '/images/gallery/make-up-and-hair-13.jpg',
    title: 'Ethereal Waves',
    description: 'Fluid editorial styling'
  },
  {
    category: 'wedding',
    image: '/images/gallery/bridal-shower-1.jpg',
    title: 'Royal Preparation',
    description: 'Bespoke bridal preparation ritual'
  }
];

const filterCategories = [
  { value: 'all', label: 'All' },
  { value: 'makeup', label: 'Makeup' },
  { value: 'hair', label: 'Hair Artistry' },
  { value: 'nails', label: 'Nail Art' },
  { value: 'wedding', label: 'Bridal' }
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="gallery py-32 bg-primary" ref={sectionRef}>
      <div className="container mx-auto px-6" ref={inViewRef}>
        <div className="text-center mb-20">
          <span className="text-gold text-xs uppercase tracking-[0.4em] font-montserrat block mb-4">The Portfolio</span>
          <h2 className={`text-5xl md:text-7xl text-ivory font-playfair mb-8 reveal-element ${inView ? 'active' : ''}`}>
            Our <span className="italic font-light text-gold">Artistry</span>
          </h2>

          <div className={`flex flex-wrap justify-center gap-8 mt-12 reveal-element ${inView ? 'active' : ''}`}>
            {filterCategories.map((category, index) => (
              <button
                key={index}
                className={`text-[10px] uppercase tracking-[0.3em] font-montserrat transition-colors relative pb-2 ${activeFilter === category.value ? 'text-gold' : 'text-ivory/40 hover:text-ivory focus-visible:text-ivory'} outline-none`}
                onClick={() => setActiveFilter(category.value)}
              >
                {category.label}
                {activeFilter === category.value && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[1px] bg-gold" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
          {filteredItems.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              style={{ y: index % 2 === 0 ? y1 : y2 }}
              className="group relative aspect-[3/4] overflow-hidden bg-primary-dark border border-ivory/5 cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <OptimizedImage
                src={item.image}
                alt={item.title}
                fill
                objectFit="cover"
                className="grayscale transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8">
                <span className="text-gold text-[10px] uppercase tracking-widest mb-2">{item.category}</span>
                <h3 className="text-2xl text-ivory font-playfair mb-2">{item.title}</h3>
                <p className="text-ivory/60 text-xs font-light">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[2000] bg-primary/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-20 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-5xl w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <OptimizedImage
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                objectFit="contain"
                priority
                className="select-none"
              />

              <div className="absolute top-0 right-0 p-4">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gold hover:text-ivory transition-colors duration-300 p-2"
                  aria-label="Close Lightbox"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full bg-gradient-to-t from-primary via-primary/50 to-transparent">
                <span className="text-gold text-[10px] uppercase tracking-[0.4em] mb-4 block font-montserrat">{selectedImage.category}</span>
                <h3 className="text-3xl md:text-5xl text-ivory font-playfair mb-4 leading-tight">{selectedImage.title}</h3>
                <p className="text-ivory/60 font-light max-w-xl text-sm leading-relaxed">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

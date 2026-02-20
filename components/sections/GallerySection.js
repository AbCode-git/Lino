import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import OptimizedImage from '../ui/OptimizedImage';

const galleryItems = [
  // Signature Collection (Original & High Definition)
  { category: 'makeup', image: '/images/gallery/make-up-6.jpg', title: 'Noir Glamour', description: 'Sophisticated evening aesthetics' },
  { category: 'hair', image: '/images/gallery/hair-1.jpg', title: 'Sculpted Silhouette', description: 'Precision hair tailoring' },
  { category: 'wedding', image: '/images/gallery/bridal-shower-2.jpg', title: 'The Bride', description: 'Timeless structural beauty' },
  { category: 'makeup', image: '/images/gallery/make-up-12.jpg', title: 'Gold Essence', description: 'Metallic focus artistry' },
  { category: 'hair', image: '/images/gallery/make-up-and-hair-13.jpg', title: 'Ethereal Waves', description: 'Fluid editorial styling' },
  { category: 'wedding', image: '/images/gallery/bridal-shower-1.jpg', title: 'Royal Preparation', description: 'Bespoke bridal preparation ritual' },

  // Editorial Masterpieces (Main Gallery)
  { category: 'makeup', image: '/images/gallery/3362757156500869850_2939237332_2.jpg', title: 'Studio Noir', description: 'High-definition editorial makeup' },
  { category: 'makeup', image: '/images/gallery/3418451107224162418_2939237332_1.jpg', title: 'Platinum Gaze', description: 'Metallic structural artistry' },
  { category: 'makeup', image: '/images/gallery/3563386678177672417_2939237332_1.jpg', title: 'Satin Radiance', description: 'Signature studio glow' },
  { category: 'makeup', image: '/images/gallery/3713572151350565638_2939237332.jpg', title: 'Vantage Point', description: 'Editorial profile studies' },
  { category: 'makeup', image: '/images/gallery/hair-and-make-up-3.jpg', title: 'Luminous Atelier', description: 'Dual coiffure and visage artistry' },

  // The Bridal Suite (User Feed)
  { category: 'wedding', image: '/images/gallery/user_feed/Bridal-1.jpg', title: 'Couture Bride I', description: 'Bespoke bridal transformation' },
  { category: 'wedding', image: '/images/gallery/user_feed/Bridal-2.jpg', title: 'Couture Bride II', description: 'Sophisticated wedding artistry' },
  { category: 'wedding', image: '/images/gallery/user_feed/Bride-11.jpg', title: 'Modern Bridal Glam', description: 'Sophisticated wedding artistry' },
  { category: 'wedding', image: '/images/gallery/user_feed/Bride-12.jpg', title: 'Ethereal Bridal', description: 'Soft and glowy bridal look' },
  { category: 'wedding', image: '/images/gallery/user_feed/Bride-17.jpg', title: 'Traditional Radiance', description: 'Cultural bridal precision' },
  { category: 'wedding', image: '/images/gallery/user_feed/Bride-1.jpg', title: 'Eternal Elegance', description: 'Timeless bridal radiance' },
  { category: 'wedding', image: '/images/gallery/user_feed/Bride-3.jpg', title: 'Royal Veil', description: 'High-definition bridal precision' },
  { category: 'wedding', image: '/images/gallery/user_feed/Bride-4.jpg', title: 'Silk & Stone', description: 'Structural bridal beauty' },
  { category: 'wedding', image: '/images/gallery/user_feed/Bride-7.jpg', title: 'Lace Tradition', description: 'Cultural bridal artistry' },
  { category: 'wedding', image: '/images/gallery/user_feed/2897925831621386506_2939237332_1.jpg', title: 'Reception Radiance', description: 'High-profile evening event look' },

  // Hair & Sculpture (User Feed)
  { category: 'hair', image: '/images/gallery/user_feed/Hair-1.jpg', title: 'Cascading Tresses', description: 'Luxury waves and volume' },
  { category: 'hair', image: '/images/gallery/user_feed/Hair-10.jpg', title: 'Architectural Style', description: 'Modern hair sculpture' },
  { category: 'hair', image: '/images/gallery/user_feed/Hair-2.jpg', title: 'Braid Artistry', description: 'Intricate and detailed braiding' },
  { category: 'hair', image: '/images/gallery/user_feed/Hair-7.jpg', title: 'Polished Curls', description: 'Defined and elegant curling' },
  { category: 'hair', image: '/images/gallery/user_feed/Hair-4.jpg', title: 'Crimson Wave', description: 'Vibrant color and movement' },
  { category: 'hair', image: '/images/gallery/user_feed/Hair-5.jpg', title: 'Sleek Infinity', description: 'Precision sleek tailoring' },
  { category: 'hair', image: '/images/gallery/user_feed/Hair-6.jpg', title: 'Modern Updo', description: 'Contemporary bridal styling' },
  { category: 'hair', image: '/images/gallery/user_feed/Hair-9.jpg', title: 'Editorial Twist', description: 'High-fashion hair design' },
  { category: 'hair', image: '/images/gallery/user_feed/2580788437717950872_2939237332_2.jpg', title: 'Polished Finish', description: 'Precision studio hair' },
  { category: 'hair', image: '/images/gallery/user_feed/3096637042016809696_2939237332.jpg', title: 'Voluminous Wave', description: 'High-profile hair volume' },

  // Makeup Masterpieces (User Feed)
  { category: 'makeup', image: '/images/gallery/user_feed/Makeup-10.jpg', title: 'Sunset Glow', description: 'Warm editorial makeup' },
  { category: 'makeup', image: '/images/gallery/user_feed/Makeup-11.jpg', title: 'High Contrast', description: 'Bold and dramatic look' },
  { category: 'makeup', image: '/images/gallery/user_feed/Makeup-13.jpg', title: 'Soft Focus', description: 'Natural and radiant skin' },
  { category: 'makeup', image: '/images/gallery/user_feed/Makeup-19.jpg', title: 'Emerald Gaze', description: 'Vibrant eye-focused artistry' },
  { category: 'makeup', image: '/images/gallery/user_feed/Makeup-12.jpg', title: 'Matte Perfection', description: 'Sophisticated matte finish' },
  { category: 'makeup', image: '/images/gallery/user_feed/Makeup--14.jpg', title: 'Midnight Velvet', description: 'Deep evening glamour' },
  { category: 'makeup', image: '/images/gallery/user_feed/Makeup-15.jpg', title: 'Emerald Editorial', description: 'Vibrant pigment focus' },
  { category: 'makeup', image: '/images/gallery/user_feed/Makeup-21.jpg', title: 'Bold Spectrum', description: 'Experimental pigment work' },
  { category: 'makeup', image: '/images/gallery/user_feed/Makeup-Hair-9.jpg', title: 'Dual Artistry', description: 'Coordinated hair and makeup' },

  // Studio Highlights (User Feed)
  { category: 'makeup', image: '/images/gallery/user_feed/2224704228744351048_2939237332_1.jpg', title: 'Studio Precision', description: 'High-definition studio makeup' },
  { category: 'makeup', image: '/images/gallery/user_feed/2986554338574363763_2939237332_2.jpg', title: 'HD Radiance', description: 'HD camera-ready makeup' },
  { category: 'makeup', image: '/images/gallery/user_feed/2222831694398787938_2939237332_1.jpg', title: 'Signature Gaze', description: 'The definitive Lino radiance' },
  { category: 'makeup', image: '/images/gallery/user_feed/2396016502778912853_2939237332.jpg', title: 'Velvet Gaze', description: 'Soft focus evening look' },
  { category: 'makeup', image: '/images/gallery/user_feed/2454039000891888771_2939237332_1.jpg', title: 'Gala Glamour', description: 'High-coverage evening artistry' },
  { category: 'makeup', image: '/images/gallery/user_feed/2503807237430900806_2939237332_1.jpg', title: 'The Gaze', description: 'Precision eye-definition' },
  { category: 'makeup', image: '/images/gallery/user_feed/2634412423618048218_2939237332.jpg', title: 'Satin Finish', description: 'Polished studio texture' },
  { category: 'makeup', image: '/images/gallery/user_feed/2710481967008252649_2939237332.jpg', title: 'Radiant Dawn', description: 'Fresh morning daylight glam' },
  { category: 'makeup', image: '/images/gallery/user_feed/2897927809764198354_2939237332.jpg', title: 'The Muse', description: 'Editorial inspiration session' },
  { category: 'makeup', image: '/images/gallery/user_feed/3018647169572990967_2939237332_1.jpg', title: 'Geometric Beauty', description: 'Clean geometric makeup' },
  { category: 'makeup', image: '/images/gallery/user_feed/3176386151006626559_2939237332_2.jpg', title: 'Cinematic Visage', description: 'Drama and contrast study' },
  { category: 'makeup', image: '/images/gallery/user_feed/3257460099490318521_2939237332_1.jpg', title: 'Timeless Glow', description: 'Enduring radiant aesthetics' },

  // Nail Artistry (User Feed)
  { category: 'nails', image: '/images/gallery/user_feed/Nail-3.jpg', title: 'Pearl Minimalist', description: 'Clean and sophisticated nails' },
  { category: 'nails', image: '/images/gallery/user_feed/Nail-4.jpg', title: 'Gilded Fingertips', description: 'Luxury metallic nail finish' },
  { category: 'nails', image: '/images/gallery/user_feed/Nail-12.jpg', title: 'The Groomed Look', description: 'Signature restorative manicure' }
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

  // Noir Spotlight Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const spotlightBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(212, 175, 55, 0.03), transparent 80%)`
  );


  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="gallery py-32 bg-primary" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold text-xs uppercase tracking-[0.4em] font-montserrat block mb-4">The Portfolio</span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl text-ivory font-playfair mb-8"
          >
            Our <span className="italic font-light text-gold">Artistry</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
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
          </motion.div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-12 relative"
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight background */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-0"
            style={{ background: spotlightBg }}
          />

          {filteredItems.map((item, index) => (
            <PortfolioCard
              key={`${item.title}-${index}`}
              item={item}
              index={index}
              yOffset={index % 2 === 0 ? y1 : y2}
              onClick={() => setSelectedImage(item)}
            />
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

// Separate component for 3D Tilt effect and local state
function PortfolioCard({ item, index, yOffset, onClick }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 150 });

  function onMouseMove(event) {
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Editorial Asymmetric Spans
  const getGridSpan = (idx) => {
    const pattern = [
      'md:col-span-4', // Small
      'md:col-span-8', // Large
      'md:col-span-5', // Medium
      'md:col-span-7', // Medium-Large
      'md:col-span-12', // Hero Full
      'md:col-span-6', // Half
      'md:col-span-6', // Half
    ];
    return pattern[idx % pattern.length];
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        y: yOffset,
        rotateX,
        rotateY,
        perspective: 1000
      }}
      className={`group relative ${getGridSpan(index)} aspect-[4/5] overflow-hidden bg-primary-dark border border-ivory/5 cursor-pointer z-10 transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
      <OptimizedImage
        src={item.image}
        alt={item.title}
        fill
        objectFit="cover"
        className="grayscale transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0 contrast-[1.1]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10 z-20">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="text-gold text-[10px] uppercase tracking-widest mb-3 font-bold"
        >
          {item.category}
        </motion.span>
        <h3 className="text-3xl text-ivory font-playfair mb-3 leading-tight tracking-wide">{item.title}</h3>
        <p className="text-ivory/60 text-xs font-light tracking-widest uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100 lowercase italic">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

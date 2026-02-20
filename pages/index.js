import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from '../components/layout/Layout';

// Import sections with dynamic loading for code splitting
const HeroSection = dynamic(() => import('../components/sections/HeroSection'), {
  ssr: false, // Disable server-side rendering to avoid hydration mismatch
});
const ServicesSection = dynamic(() => import('../components/sections/ServicesSection'), {
  ssr: false, // Disable server-side rendering to avoid hydration mismatch
});
// ProductsSection import removed
const AppointmentSection = dynamic(() => import('../components/sections/AppointmentSection'), { ssr: false });
const GallerySection = dynamic(() => import('../components/sections/GallerySection'), { ssr: false });
const TestimonialsSection = dynamic(() => import('../components/sections/TestimonialsSection'), { ssr: false });
const AboutSection = dynamic(() => import('../components/sections/AboutSection'), { ssr: false });
const ContactSection = dynamic(() => import('../components/sections/ContactSection'), { ssr: false });

export default function Home() {
  // Initialize scroll reveal animation
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-element');

    if (revealElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.1 });

      revealElements.forEach(el => observer.observe(el));

      return () => {
        revealElements.forEach(el => observer.unobserve(el));
      };
    }
  }, []);

  return (
    <>
      <Head>
        <title>LINO Beauty Lounge | Certified Makeup Artist</title>
        <meta name="description" content="LINO Beauty Lounge offers professional makeup services, hair styling, manicure, pedicure, and special packages for weddings and events." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <HeroSection />
        <ServicesSection />
        {/* ProductsSection removed */}
        <AppointmentSection />
        <GallerySection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </Layout>
    </>
  );
}
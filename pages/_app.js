import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Analytics } from "@vercel/analytics/react";
import '../styles/globals.css';

// Import fonts
import { Montserrat, Cormorant_Garamond } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Handle page transitions and loading states
  useEffect(() => {
    const handleStart = () => {
      // Add loading state if needed
    };
    const handleComplete = () => {
      // Remove loading state if needed

      // Initialize scroll reveal animation
      const revealElements = document.querySelectorAll('.reveal-element');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.1 });

      revealElements.forEach(el => observer.observe(el));
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LINO Beauty Lounge | Certified Makeup Artist</title>
      </Head>
      <div className={`${montserrat.variable} ${cormorant.variable}`}>
        <Component {...pageProps} />
        <Analytics />
      </div>
    </>
  );
}

export default MyApp;
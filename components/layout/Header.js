import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
      document.body.classList.remove('menu-open');
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.classList.toggle('menu-open');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.classList.remove('menu-open');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 ${isScrolled ? 'bg-primary/95 backdrop-blur-xl py-4 border-b border-ivory/5' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="group">
          <div className="flex flex-col">
            <h1 className="text-3xl font-playfair font-bold text-gold tracking-[0.2em] group-hover:text-ivory transition-colors">LINO</h1>
            <span className="text-[10px] text-ivory/60 uppercase tracking-[0.5em] -mt-1 block">Signature Beauty Atelier</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:block">
          <ul className="flex gap-12 text-[10px] uppercase tracking-[0.3em] font-medium text-ivory/70">
            {['Services', 'Gallery', 'Testimonials', 'About', 'Reservations'].map((item) => (
              <li key={item}>
                <Link href={`/#${item.toLowerCase()}`} className="hover:text-gold transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-500"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-8">
          <Link
            href="/#reservations"
            className="hidden md:block px-8 py-3 border border-gold/40 text-gold text-[10px] uppercase tracking-widest hover:bg-gold hover:text-primary transition-all duration-500"
          >
            Book a Session
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gold focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary outline-none p-2"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <div className={`w-8 h-[0.5px] bg-current mb-2 transition-transform duration-500 ${isMobileMenuOpen ? 'rotate-45 translate-y-[4.25px]' : ''}`}></div>
            <div className={`w-8 h-[0.5px] bg-current transition-transform duration-500 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[4.25px]' : ''}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={navRef}
        className={`fixed top-0 right-0 h-screen bg-primary-dark z-[1001] transition-transform duration-700 w-full md:w-[400px] border-l border-ivory/5 flex flex-col justify-center items-center shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <ul className="flex flex-col items-center gap-10 text-xs uppercase tracking-[0.5em] text-ivory/80">
          {['Services', 'Gallery', 'Testimonials', 'About', 'Reservations'].map((item) => (
            <li key={item}>
              <Link
                href={`/#${item.toLowerCase()}`}
                className="hover:text-gold transition-colors text-2xl font-playfair lowercase italic"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#reservations"
          className="mt-20 px-12 py-4 bg-gold text-primary font-bold uppercase tracking-widest text-xs"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}
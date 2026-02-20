import { useState } from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaTiktok, FaPinterest, FaPaperPlane } from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="bg-primary pt-24 pb-12 border-t border-ivory/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="group inline-block mb-8">
              <div className="flex flex-col">
                <h2 className="text-3xl font-playfair font-bold text-gold tracking-[0.2em] group-hover:text-ivory transition-colors">LINO</h2>
                <span className="text-[10px] text-ivory/60 uppercase tracking-[0.5em] -mt-1 block">Signature Beauty Atelier</span>
              </div>
            </Link>
            <p className="text-ivory/40 text-sm font-light leading-relaxed mb-8 max-w-xs">
              Dedicated to the sophisticated art of transformation. Bespoke glamour for the modern individual.
            </p>
            <div className="flex gap-6 mt-8">
              <a href="https://www.instagram.com/makeup_by_lino/" target="_blank" rel="noopener noreferrer" className="text-ivory/40 hover:text-gold transition-colors" aria-label="LINO Instagram Artistry Page">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-ivory/40 hover:text-gold transition-colors" aria-label="LINO Facebook Presence">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="text-ivory/40 hover:text-gold transition-colors" aria-label="LINO TikTok Gallery">
                <FaTiktok size={18} />
              </a>
              <a href="#" className="text-ivory/40 hover:text-gold transition-colors" aria-label="LINO Pinterest Inspirations">
                <FaPinterest size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Navigation</h3>
            <ul className="space-y-4 text-ivory/60 text-[10px] uppercase tracking-widest font-medium">
              <li><Link href="/#services" className="hover:text-gold transition-colors focus-visible:text-gold outline-none">Services</Link></li>
              <li><Link href="/#gallery" className="hover:text-gold transition-colors focus-visible:text-gold outline-none">Artistry</Link></li>
              <li><Link href="/#about" className="hover:text-gold transition-colors focus-visible:text-gold outline-none">The Artiste</Link></li>
              <li><Link href="/#contact" className="hover:text-gold transition-colors focus-visible:text-gold outline-none">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Services</h3>
            <ul className="space-y-4 text-ivory/60 text-[10px] uppercase tracking-widest font-medium">
              <li className="hover:text-ivory transition-colors cursor-default">Haut Coiffure</li>
              <li className="hover:text-ivory transition-colors cursor-default">Le Visage Artistry</li>
              <li className="hover:text-ivory transition-colors cursor-default">Signature Manicure</li>
              <li className="hover:text-ivory transition-colors cursor-default">Mariée Atelier</li>
              <li className="hover:text-ivory transition-colors cursor-default">Editorial Shoots</li>
            </ul>
          </div>

          <div>
            <h3 className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-8">The Journal</h3>
            <p className="text-ivory/40 text-sm font-light mb-8">Subscribe to receive insights on artistry & private session availability.</p>
            <form className="relative group" onSubmit={handleSubmit}>
              <input
                type="email"
                name="newsletter_email"
                id="footer-newsletter-email"
                autoComplete="email"
                placeholder="Enter email address…"
                required
                className="w-full bg-transparent border-b border-ivory/10 py-4 text-ivory/80 focus:border-gold focus-visible:border-gold outline-none transition-all font-light text-[10px] tracking-widest placeholder:text-ivory/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                spellCheck={false}
              />
              <button
                type="submit"
                className="absolute right-0 bottom-4 text-gold/40 hover:text-gold transition-colors focus-visible:text-gold outline-none"
                aria-label="Subscribe to newsletter"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-ivory/5 text-[8px] uppercase tracking-[0.4em] text-ivory/20">
          <p>&copy; {currentYear} LINO BEAUTY ATELIER. ALL RIGHTS RESERVED.</p>
          <div className="mt-4 md:mt-0 flex gap-8">
            <Link href="/privacy" className="hover:text-ivory transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-ivory transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
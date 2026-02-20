import { useEffect, useState, useRef } from 'react';
import { useThrottle, useIsTouchDevice } from '../../utils/optimizePerformance';

export default function OptimizedCursor() {
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isTouchDevice = useIsTouchDevice();
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const magneticRef = useRef(null);

  // Throttled mouse movement
  const onMouseMove = (e) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (!cursorRef.current) return;

    // Direct cursor follows mouse exactly
    cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

    // Check for magnetic pull
    if (magneticRef.current) {
      const rect = magneticRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < 100) {
        // Pull the follower more towards the center
        const pullFactor = 0.4;
        mousePos.current = {
          x: e.clientX - (distanceX * pullFactor),
          y: e.clientY - (distanceY * pullFactor)
        };

        // Slightly move the actual element too (Magnetic effect)
        magneticRef.current.style.transform = `translate3d(${distanceX * 0.2}px, ${distanceY * 0.2}px, 0)`;
      } else {
        magneticRef.current.style.transform = `translate3d(0, 0, 0)`;
      }
    }
  };

  useEffect(() => {
    if (isTouchDevice) return;

    // Follower animation loop
    let requestRef;
    const animateFollower = () => {
      if (cursorFollowerRef.current) {
        // Smooth interpolation
        followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.15;
        followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.15;

        cursorFollowerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }
      requestRef = requestAnimationFrame(animateFollower);
    };

    requestRef = requestAnimationFrame(animateFollower);

    const onMouseDown = () => {
      if (cursorRef.current) cursorRef.current.style.scale = '0.8';
      if (cursorFollowerRef.current) cursorFollowerRef.current.style.scale = '1.2';
    };

    const onMouseUp = () => {
      if (cursorRef.current) cursorRef.current.style.scale = '1';
      if (cursorFollowerRef.current) cursorFollowerRef.current.style.scale = '1';
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Initial listener for mouse pos to avoid starting at 0,0
    const initialPos = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      followerPos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
      window.removeEventListener('mousemove', initialPos);
    };
    window.addEventListener('mousemove', initialPos);

    // Add hover and magnetic effects
    const addEffects = () => {
      const interactives = document.querySelectorAll('a, button, .service-card, .gallery-item');
      const magneticTargets = document.querySelectorAll('a[href="/#contact"], button[type="submit"]');

      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorFollowerRef.current?.classList.add('cursor-follower-active');
          cursorRef.current?.classList.add('cursor-active');
        });
        el.addEventListener('mouseleave', () => {
          cursorFollowerRef.current?.classList.remove('cursor-follower-active');
          cursorRef.current?.classList.remove('cursor-active');
        });
      });

      magneticTargets.forEach(el => {
        el.addEventListener('mouseenter', () => { magneticRef.current = el; });
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'translate3d(0, 0, 0)';
          magneticRef.current = null;
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Wait for components to mount fully
    const timer = setTimeout(addEffects, 1000);

    return () => {
      cancelAnimationFrame(requestRef);
      window.removeEventListener('mousemove', initialPos);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      clearTimeout(timer);
    };
  }, [isTouchDevice]);

  if (isTouchDevice || typeof window === 'undefined') return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
      />
      <div
        ref={cursorFollowerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-gold/30 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
      />
      <style jsx global>{`
        .cursor-active { transform: scale(0.5) !important; background-color: white !important; }
        .cursor-follower-active { width: 60px !important; height: 60px !important; border-color: white !important; background-color: rgba(255,255,255,0.05) !important; }
      `}</style>
    </div>
  );
}

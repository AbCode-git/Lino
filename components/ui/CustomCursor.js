import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorFollower = cursorFollowerRef.current;
    
    if (!cursor || !cursorFollower) return;
    
    const onMouseMove = (e) => {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Delayed follower effect
        setTimeout(() => {
          cursorFollower.style.left = `${e.clientX}px`;
          cursorFollower.style.top = `${e.clientY}px`;
        }, 100);
      });
    };
    
    const onMouseDown = () => {
      cursor.style.width = '8px';
      cursor.style.height = '8px';
      cursorFollower.style.width = '25px';
      cursorFollower.style.height = '25px';
    };
    
    const onMouseUp = () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      cursorFollower.style.width = '30px';
      cursorFollower.style.height = '30px';
    };
    
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    
    // Add hover effect for interactive elements
    const addHoverEffect = () => {
      const hoverElements = document.querySelectorAll('a, button, .service-card, .package, .gallery-item, .social-icon');
      
      hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          cursor.style.width = '15px';
          cursor.style.height = '15px';
          cursor.style.backgroundColor = 'var(--secondary-color)';
          cursorFollower.style.width = '40px';
          cursorFollower.style.height = '40px';
        });
        
        element.addEventListener('mouseleave', () => {
          cursor.style.width = '10px';
          cursor.style.height = '10px';
          cursor.style.backgroundColor = 'var(--accent-color)';
          cursorFollower.style.width = '30px';
          cursorFollower.style.height = '30px';
        });
      });
    };
    
    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    
    // Initialize hover effects
    addHoverEffect();
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);
  
  return (
    <>
      <div 
        ref={cursorRef} 
        className={`fixed w-2.5 h-2.5 bg-accent rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isVisible ? 'opacity-70' : 'opacity-0'}`}
      />
      <div 
        ref={cursorFollowerRef} 
        className={`fixed w-7 h-7 bg-accent bg-opacity-30 rounded-full pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isVisible ? 'opacity-50' : 'opacity-0'}`}
      />
    </>
  );
}
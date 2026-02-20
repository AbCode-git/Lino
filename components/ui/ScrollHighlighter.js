import { useEffect } from 'react';

export default function ScrollHighlighter() {
  useEffect(() => {
    // Function to handle scroll and highlight active section
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100; // Offset for better UX
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Find all navigation links that point to this section
        const navLinks = document.querySelectorAll(`a[href*="#${sectionId}"]`);
        
        // Check if current scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Add active class to corresponding nav links
          navLinks.forEach(link => {
            link.classList.add('active');
          });
        } else {
          // Remove active class from nav links
          navLinks.forEach(link => {
            link.classList.remove('active');
          });
        }
      });
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Call once on mount to set initial state
    handleScroll();
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
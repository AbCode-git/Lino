/**
 * Utilities for optimizing performance across the application
 */

import { useEffect, useRef, useCallback, useState } from 'react';

/**
 * Hook to throttle function calls for better performance
 * @param {Function} callback - The function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Throttled function
 */
export function useThrottle(callback, delay) {
  // Safe initialization for SSR
  const lastRan = useRef(typeof window !== 'undefined' ? Date.now() : 0);
  
  return useCallback(
    (...args) => {
      // Ensure we're in browser environment
      if (typeof window === 'undefined') return;
      
      const now = Date.now();
      if (now - lastRan.current >= delay) {
        callback(...args);
        lastRan.current = now;
      }
    },
    [callback, delay]
  );
}

/**
 * Hook to debounce function calls for better performance
 * @param {Function} callback - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);
  
  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

/**
 * Hook to optimize animations with requestAnimationFrame
 * @param {Function} callback - Animation frame callback
 * @returns {Object} - Methods to start and stop the animation
 */
export function useAnimationFrame(callback) {
  const requestRef = useRef();
  const previousTimeRef = useRef();
  
  const animate = useCallback(
    (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );
  
  return {
    start: () => {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    },
    stop: () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    },
  };
}

/**
 * Hook to detect if the device is a mobile/touch device
 * This helps optimize certain effects that might be heavy on mobile
 * @returns {boolean} - True if the device is a touch device
 */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    const isTouchDevice = (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
    
    setIsTouch(isTouchDevice);
  }, []);
  
  return isTouch;
}

/**
 * Hook to implement intersection observer for lazy loading and animations
 * @param {Object} options - IntersectionObserver options
 * @param {Function} callback - Callback when element is intersecting
 * @returns {Object} - Ref to attach to the element
 */
export function useIntersectionObserver(options = {}, callback) {
  const observerRef = useRef(null);
  const elementRef = useRef(null);

  useEffect(() => {
    // Skip if SSR or no callback provided
    if (typeof window === 'undefined' || !callback) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        callback(entry.isIntersecting, entry);
      });
    }, {
      threshold: options.threshold || 0.1,
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
    });

    observerRef.current = observer;

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [callback, options.threshold, options.root, options.rootMargin]);

  return elementRef;
}

/**
 * Optimizes font loading by preloading critical fonts
 * Call this function early in your application
 */
export function optimizeFontLoading() {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  const fontUrls = [
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap'
  ];

  fontUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = url;
    document.head.appendChild(link);

    // Also add the stylesheet
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = url;
    style.media = 'print';
    style.onload = () => {
      style.media = 'all';
    };
    document.head.appendChild(style);
  });
}
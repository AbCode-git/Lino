/**
 * Utility for lazy loading components with better loading states
 * This improves performance by only loading components when needed
 */

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

/**
 * Creates a lazily loaded component with a loading fallback
 * @param {Function} importFunc - The import function for the component
 * @param {Object} options - Options for the dynamic import
 * @param {React.Component} options.fallback - Component to show while loading
 * @param {boolean} options.ssr - Whether to render on server-side
 * @returns {React.Component} - The lazily loaded component
 */
export function lazyLoad(importFunc, { fallback = null, ssr = true } = {}) {
  const LazyComponent = dynamic(importFunc, {
    loading: () => fallback,
    ssr,
  });

  // Return a wrapped component that uses Suspense for better error handling
  return function LazyLoadWrapper(props) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

/**
 * Default loading component that can be used as a fallback
 * @returns {React.Component} - A simple loading component
 */
export function LoadingFallback() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-pulse flex flex-col items-center">
        <div className="rounded-full bg-secondary h-12 w-12 mb-4"></div>
        <div className="h-2 bg-secondary rounded w-24"></div>
      </div>
    </div>
  );
}
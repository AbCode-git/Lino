/**
 * Custom image loader for Next.js Image component
 * This helps with image optimization and better loading performance.
 * Next.js requires the loader to return a URL that includes the 'width' parameter.
 */

export default function imageLoader({ src, width, quality }) {
  // Handle placeholder images from external sources
  if (src.startsWith('https://via.placeholder.com')) {
    const textMatch = src.match(/\?text=(.+)/);
    const text = textMatch ? textMatch[1] : 'LINO+Beauty';
    return `https://via.placeholder.com/${width}x${Math.round(width * 1.2)}?text=${text}&quality=${quality || 75}`;
  }

  // Handle Unsplash images
  if (src.includes('images.unsplash.com')) {
    const url = new URL(src);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', (quality || 75).toString());
    return url.toString();
  }

  // Handle other remote images
  if (src.startsWith('http')) {
    try {
      const url = new URL(src);
      url.searchParams.set('w', width.toString());
      if (quality) url.searchParams.set('q', quality.toString());
      return url.toString();
    } catch (e) {
      // Fallback if URL is invalid
      return `${src}${src.includes('?') ? '&' : '?'}w=${width}`;
    }
  }

  // Handle local images (starting with /)
  // We append it as a query parameter to satisfy Next.js's "implement width" requirement.
  // We use a fallback to ensure that if the query param is problematic, the image still loads.
  try {
    const separator = src.includes('?') ? '&' : '?';
    return `${src}${separator}w=${width}`;
  } catch (e) {
    return src;
  }
}

/**
 * Generates a blurred placeholder for images
 */
export function getBlurDataURL() {
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcikiIC8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyIiB4MT0iMCIgeTE9IjAiIHgyPSIxMDAiIHkyPSIxMDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjZjhmOWZhIiAvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Q0YTBhNyIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4=';
}

/**
 * Generates a color-matched blur placeholder based on image type
 */
export function getImageSpecificPlaceholder(src = '') {
  let startColor = '#f8f9fa';
  let endColor = '#d4a0a7';

  if (src.includes('makeup')) {
    startColor = '#f8f9fa';
    endColor = '#d4a0a7';
  } else if (src.includes('hair')) {
    startColor = '#f8f9fa';
    endColor = '#a86e7c';
  } else if (src.includes('nail')) {
    startColor = '#f8f9fa';
    endColor = '#d4af37';
  } else if (src.includes('wedding')) {
    startColor = '#f8f9fa';
    endColor = '#d4a0a7';
  }

  const svg = `
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="url(#paint0_linear)" />
      <defs>
        <linearGradient id="paint0_linear" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stop-color="${startColor}" />
          <stop offset="1" stop-color="${endColor}" />
        </linearGradient>
      </defs>
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}
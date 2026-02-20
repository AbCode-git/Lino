import Image from 'next/image';
import { useState } from 'react';
import imageLoader, { getBlurDataURL } from '../../utils/imageLoader';

/**
 * Optimized image component that uses Next.js Image with performance enhancements
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  className = '',
  priority = false,
  objectFit = 'cover',
  quality = 75,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  style,
  ...props
}) {
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle image loading error
  const handleError = () => {
    setIsError(true);
  };

  // Handle successful image load
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // If there's an error or no src, show placeholder
  const imageSrc = isError || !src
    ? 'https://via.placeholder.com/500x600?text=LINO+Beauty'
    : src;

  // Next.js Image properties
  const imageProps = {
    src: imageSrc,
    alt: alt || 'LINO Beauty image',
    quality,
    priority,
    loader: imageLoader,
    placeholder: "blur",
    blurDataURL: getBlurDataURL(),
    onError: handleError,
    onLoad: handleLoad,
    sizes,
    style: {
      objectFit,
      transition: 'opacity 0.5s ease, filter 0.5s ease',
      opacity: isLoaded ? 1 : 0.8,
      filter: isLoaded ? 'none' : 'blur(5px)',
      ...style,
    },
    ...props
  };

  // If fill is true, don't pass width and height
  if (fill) {
    imageProps.fill = true;
  } else {
    imageProps.width = width || 500;
    imageProps.height = height || 500;
  }

  return (
    <div
      className={`relative overflow-hidden ${className} ${fill ? 'w-full h-full' : ''} ${isLoaded ? 'image-loaded' : 'image-loading'}`}
      aria-hidden={!alt}
    >
      <Image {...imageProps} />
    </div>
  );
}
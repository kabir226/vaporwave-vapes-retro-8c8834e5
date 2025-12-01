import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onClick?: () => void;
}

// Generate srcset for responsive images
const generateSrcSet = (src: string): string => {
  // For Supabase storage URLs, we can add width parameters
  if (src.includes('supabase') || src.includes('storage')) {
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    return sizes
      .map(size => `${src}?width=${size} ${size}w`)
      .join(', ');
  }
  return '';
};

// Generate sizes attribute for responsive images
const defaultSizes = '(max-width: 320px) 280px, (max-width: 640px) 580px, (max-width: 768px) 700px, (max-width: 1024px) 940px, (max-width: 1280px) 1200px, 1920px';

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  width,
  height,
  priority = false,
  objectFit = 'cover',
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before entering viewport
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate blur placeholder (base64 tiny placeholder)
  const blurDataUrl = `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width || 400} ${height || 300}">
      <filter id="b" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="20"/>
      </filter>
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      <rect width="100%" height="100%" fill="#333" filter="url(#b)"/>
    </svg>`
  )}`;

  const srcSet = generateSrcSet(src);

  const objectFitClass = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  }[objectFit];

  if (!src || hasError) {
    return (
      <div
        ref={containerRef}
        className={cn(
          'bg-muted flex items-center justify-center',
          containerClassName
        )}
        style={{ width, height }}
      >
        <span className="text-muted-foreground text-sm">Image non disponible</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', containerClassName)}
      style={{ width, height }}
      onClick={onClick}
    >
      {/* Blur placeholder */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-500',
          isLoaded ? 'opacity-0' : 'opacity-100'
        )}
        style={{
          backgroundImage: `url(${blurDataUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
          transform: 'scale(1.1)',
        }}
      />

      {/* Skeleton pulse animation while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      {/* Actual image */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          srcSet={srcSet || undefined}
          sizes={srcSet ? defaultSizes : undefined}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            objectFitClass,
            className
          )}
        />
      )}
    </div>
  );
};

export default OptimizedImage;

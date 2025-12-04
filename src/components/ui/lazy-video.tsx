import React, { useState, useRef, useEffect } from 'react';
import { Loader2, Play } from 'lucide-react';

interface LazyVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  poster?: string;
  onClick?: () => void;
}

const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  className = '',
  autoPlay = false,
  loop = false,
  muted = true,
  controls = false,
  playsInline = true,
  poster,
  onClick
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.1
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative ${className}`}
      onClick={onClick}
    >
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse rounded-xl">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-xl">
          <Play className="w-8 h-8 text-muted-foreground" />
        </div>
      )}

      {/* Video element - only render when in view */}
      {isInView && !hasError && (
        <video
          ref={videoRef}
          src={src}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          controls={controls}
          playsInline={playsInline}
          poster={poster}
          preload="metadata"
          onLoadedData={handleLoadedData}
          onCanPlay={handleLoadedData}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default LazyVideo;

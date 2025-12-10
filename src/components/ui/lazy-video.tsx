import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Loader2, Play } from 'lucide-react';
import { getPosterUrlFromVideo } from '@/lib/videoPosterGenerator';

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
  eager?: boolean; // Load immediately without lazy loading
  rootMargin?: string; // Custom intersection margin
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
  onClick,
  eager = false,
  rootMargin = '500px' // Aggressive preloading - start loading 500px before viewport
}) => {
  const [isInView, setIsInView] = useState(eager);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [generatedPoster, setGeneratedPoster] = useState<string | null>(null);
  const [staticPosterLoaded, setStaticPosterLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Try to load static WebP poster first (uploaded alongside video)
  const staticPosterUrl = getPosterUrlFromVideo(src);

  // Generate poster from first video frame if no poster provided
  const generatePosterFromVideo = useCallback(async () => {
    if (poster || !src) return;
    
    try {
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.muted = true;
      video.preload = 'metadata';
      
      await new Promise<void>((resolve, reject) => {
        video.onloadeddata = () => resolve();
        video.onerror = () => reject();
        video.src = src;
        // Seek to 0.1s for first meaningful frame
        video.currentTime = 0.1;
      });

      await new Promise<void>((resolve) => {
        video.onseeked = () => resolve();
      });

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 360;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setGeneratedPoster(dataUrl);
      }
      
      video.remove();
      canvas.remove();
    } catch {
      // Silent fail - video will load without poster
    }
  }, [src, poster]);

  // Try static poster first, fallback to generated poster
  useEffect(() => {
    if (poster) return; // Custom poster provided
    
    // Try to load static WebP poster
    if (staticPosterUrl) {
      const img = new Image();
      img.onload = () => {
        setStaticPosterLoaded(true);
      };
      img.onerror = () => {
        // Static poster not found, generate from video
        generatePosterFromVideo();
      };
      img.src = staticPosterUrl;
    } else {
      // No static poster URL, generate from video
      generatePosterFromVideo();
    }
  }, [poster, src, staticPosterUrl, generatePosterFromVideo]);

  // Intersection Observer for lazy loading (with aggressive rootMargin)
  useEffect(() => {
    if (eager) {
      setIsInView(true);
      return;
    }

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
        rootMargin, // Start loading well before entering viewport
        threshold: 0
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [eager, rootMargin]);

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Priority: custom poster > static WebP poster > generated poster
  const effectivePoster = poster || (staticPosterLoaded ? staticPosterUrl : null) || generatedPoster || undefined;

  return (
    <div 
      ref={containerRef} 
      className={`relative ${className}`}
      onClick={onClick}
    >
      {/* Poster/thumbnail shown immediately while video loads */}
      {effectivePoster && !isLoaded && !hasError && (
        <img 
          src={effectivePoster} 
          alt="Video thumbnail"
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
        />
      )}

      {/* Loading indicator (only if no poster) */}
      {!isLoaded && !hasError && !effectivePoster && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse rounded-xl">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      {/* Loading spinner overlay on poster */}
      {!isLoaded && !hasError && effectivePoster && isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-xl">
          <Play className="w-8 h-8 text-muted-foreground" />
        </div>
      )}

      {/* Video element - render when in view, preload aggressively */}
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
          poster={effectivePoster}
          preload="auto" // Aggressive preloading
          onLoadedData={handleLoadedData}
          onCanPlay={handleLoadedData}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default LazyVideo;

// Video Cache System using Browser Cache API
const CACHE_NAME = 'snuspedia-video-cache-v1';

export const videoCache = {
  // Check if Cache API is supported
  isSupported: () => 'caches' in window,

  // Preload multiple videos in background
  async preloadVideos(urls: string[]): Promise<void> {
    if (!this.isSupported()) return;
    
    try {
      const cache = await caches.open(CACHE_NAME);
      const validUrls = urls.filter(url => url && this.isVideoUrl(url));
      
      // Preload in parallel with low priority
      await Promise.allSettled(
        validUrls.map(async (url) => {
          const existing = await cache.match(url);
          if (!existing) {
            try {
              const response = await fetch(url, { 
                mode: 'cors',
                credentials: 'omit'
              });
              if (response.ok) {
                await cache.put(url, response);
              }
            } catch (e) {
              // Silent fail for individual videos
            }
          }
        })
      );
    } catch (e) {
      console.warn('Video cache preload failed:', e);
    }
  },

  // Get cached video
  async getCached(url: string): Promise<Response | undefined> {
    if (!this.isSupported()) return undefined;
    
    try {
      const cache = await caches.open(CACHE_NAME);
      return await cache.match(url);
    } catch {
      return undefined;
    }
  },

  // Check if URL is a video
  isVideoUrl(url: string): boolean {
    if (!url) return false;
    return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
  },

  // Extract video URLs from products
  extractVideoUrls(products: Array<{ images?: string[] }>): string[] {
    return products
      .flatMap(p => p.images || [])
      .filter(url => this.isVideoUrl(url));
  }
};

// Preload videos using link preload (for critical above-the-fold videos)
export const preloadCriticalVideo = (url: string): void => {
  if (!url || !videoCache.isVideoUrl(url)) return;
  
  // Check if already preloaded
  const existing = document.querySelector(`link[href="${url}"]`);
  if (existing) return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'video';
  link.href = url;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};

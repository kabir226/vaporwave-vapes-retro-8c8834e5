// Generate WebP poster from video file
export const generateVideoPoster = (videoFile: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    video.onloadeddata = () => {
      // Seek to 0.1s for first meaningful frame
      video.currentTime = 0.1;
    };

    video.onseeked = () => {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 360;

      // Draw the video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to WebP blob with good compression
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to generate poster'));
          }
          // Cleanup
          URL.revokeObjectURL(video.src);
          video.remove();
          canvas.remove();
        },
        'image/webp',
        0.85 // 85% quality - good balance between size and quality
      );
    };

    video.onerror = () => {
      reject(new Error('Failed to load video'));
      URL.revokeObjectURL(video.src);
    };

    // Load video from file
    video.src = URL.createObjectURL(videoFile);
  });
};

// Get poster URL from video URL (naming convention)
export const getPosterUrlFromVideo = (videoUrl: string): string | null => {
  if (!videoUrl) return null;
  
  // Check if it's a video URL
  const videoExtMatch = videoUrl.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i);
  if (!videoExtMatch) return null;
  
  // Replace video extension with _poster.webp
  const posterUrl = videoUrl.replace(
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i, 
    '_poster.webp$2'
  );
  
  return posterUrl;
};

// Check if URL is a video
export const isVideoUrl = (url: string): boolean => {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
};

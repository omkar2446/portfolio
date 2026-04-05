import { useEffect, useState, useRef } from 'react';

const BackgroundVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  const videos = [
    '/back1.mp4',
    '/back2.mp4', 
    '/back3.mp4'
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Ensure video plays
      video.play().catch(() => {
        // Autoplay prevented by browser
      });
    }
  }, [currentVideoIndex]);

  const handleVideoEnd = () => {
    // Move to next video when current one ends
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      {/* Cycling Background Videos */}
      <video
        key={currentVideoIndex} // Force re-render when video changes
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        onEnded={handleVideoEnd}
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>

      {/* Enhanced Dark Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 z-0" />

      {/* Animated gradient overlay with more effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 z-0 animate-pulse-slow" />

      {/* Additional animated overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/10 to-black/20 z-0 animate-pulse-reverse" />
    </div>
  );
};

export default BackgroundVideo;

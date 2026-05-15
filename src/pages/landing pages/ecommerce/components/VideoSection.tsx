import { useRef, useState } from "react";

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    void videoRef.current?.play(); // ✅ TS-safe
  };

  return (
    <section className="bg-black py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative w-full overflow-hidden rounded-3xl bg-neutral-900">

          {/* 16:9 wrapper */}
          <div className="relative w-full pt-[56.25%]">

            {/* Thumbnail + Play */}
            {!isPlaying && (
              <button
                type="button"
                onClick={handlePlay}
                className="absolute inset-0 z-10 flex items-center justify-center bg-black"
              >
                <img
                  src="/images/thumbnail-image.jpg"
                  alt="Play video"
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />

                <span className="relative z-20 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-black ml-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}

            {/* Video */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src="/videos/brilliant-brains-branding-video.mp4"
              controls={Boolean(isPlaying)}
              playsInline
              preload="metadata"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default VideoSection;

import React, { useEffect, useRef } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

const images = [
  "/images/gallery/1.jpg",
  "/images/gallery/2.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/4.jpg",
  "/images/gallery/5.jpg",
  "/images/gallery/6.jpg",
  "/images/gallery/7.jpg",
  "/images/gallery/8.jpg",
  "/images/gallery/9.jpg",
  "/images/gallery/10.jpg",
];

const AutoScrollingGallerySection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const cards = track.children;
    const SCROLL_SPEED = 1; // Pixels per frame
    const CARD_WIDTH = 260;
    const GAP = 24;
    const totalWidth = images.length * (CARD_WIDTH + GAP);

    // Parallax scroll handler
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollProgress = -rect.top / (rect.height + window.innerHeight);
      const parallaxY = scrollProgress * 100; // Adjust multiplier for more/less parallax
      
      section.style.transform = `translateY(${parallaxY}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      scrollPositionRef.current += SCROLL_SPEED;
      
      // Reset scroll position for infinite loop
      if (scrollPositionRef.current >= totalWidth) {
        scrollPositionRef.current = 0;
      }

      const centerX = window.innerWidth / 2;

      Array.from(cards).forEach((card, index) => {
        const cardElement = card as HTMLElement;
        
        // Calculate base position (wrapping for infinite scroll)
        const setIndex = Math.floor(index / images.length);
        const baseX = (index % images.length) * (CARD_WIDTH + GAP) + setIndex * totalWidth;
        const currentX = baseX - scrollPositionRef.current;

        // Wrap cards around
        let wrappedX = currentX;
        if (currentX < -CARD_WIDTH - GAP) {
          wrappedX = currentX + totalWidth * 2;
        }

        // Calculate card center position
        const cardCenterX = wrappedX + CARD_WIDTH / 2;
        const distanceFromCenter = Math.abs(centerX - cardCenterX);

        // Scale and opacity based on distance from center
        const maxDistance = 400;
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
        
        const scale = 1.25 - normalizedDistance * 0.5; // 1.25 at center, 0.75 at edges
        const opacity = 1 - normalizedDistance * 0.6; // 1 at center, 0.4 at edges
        const y = normalizedDistance * 30; // Slight vertical offset

        // Apply transforms
        cardElement.style.transform = `translate3d(${wrappedX}px, ${y}px, 0) scale(${scale})`;
        cardElement.style.opacity = opacity.toString();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <ParallaxProvider>  
        <Parallax speed={6}>
    <section ref={sectionRef} className="bg-black py-24 overflow-hidden transition-transform duration-100 ease-out">
      <div className="relative h-[430px] flex items-center justify-center">
        <div ref={trackRef} className="absolute inset-0 flex items-center">
          {/* Render images twice for seamless infinite scroll */}
          {[...images, ...images].map((src, i) => (
            <div
              key={i}
              className="absolute w-[260px] h-[420px] rounded-2xl overflow-hidden"
              style={{
                transformOrigin: "center center",
                willChange: "transform, opacity",
                top: "50%",
                marginTop: "-210px", // Half of card height (420px / 2)
              }}
            >
              <img
                src={src}
                alt={`Gallery image ${(i % images.length) + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
    </Parallax>
    </ParallaxProvider >
  );
};

export default AutoScrollingGallerySection;
import AutoScrollingGallerySection from './components/AutoScrollingGallerySection';
import AutoScrollLogoStrip from './components/AutoScrollLogoStrip';
import BrandGrowthParallaxSection from './components/BrandGrowthParallaxSection';
import Footer from './components/Footer';
import GetAudit from './components/GetAudit';
// import HeroSection from './components/HeroSection';
import HeroSectionV2 from './components/HeroSectionV2';
import MarketingSection from './components/MarketingSection';
import NavbarEcom from './components/NavbarEcom';
// import PerformanceHero from './components/PerformanceHero';
// import ServicesShowcaseSection from './components/ServicesShowcaseSection';
// import TestimonialsSection from './components/TestimonialsSection';
import VideoSection from './components/VideoSection';
import WhatElseWeDo from './components/WhatElseWeDo';
import WhatElseWeDoMobile from './components/WhatElseWeDoMobile';
import WhyBrilliantBrainsSection from './components/WhyBrilliantBrainsSection';

const EcommerceLandingPage = () => {
  return (
    <div className='bg-black w-full'>
        <NavbarEcom />
        {/* <HeroSection /> */} <HeroSectionV2 />
        <AutoScrollLogoStrip />
        <MarketingSection />
        <BrandGrowthParallaxSection />
        <WhyBrilliantBrainsSection />
        <AutoScrollingGallerySection />
        <VideoSection />
        <WhatElseWeDo />
        <WhatElseWeDoMobile />
        <GetAudit />
        <Footer />
    </div>
  )
}

export default EcommerceLandingPage
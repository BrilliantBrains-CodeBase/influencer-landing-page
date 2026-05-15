import NavbarInfluencer from "./components/NavbarInfluencer";
import HeroInfluencer from "./components/HeroInfluencer";
import BrandMarqueeInfluencer from "./components/BrandMarqueeInfluencer";
import WhyJoinSection from "./components/WhyJoinSection";
import StatsBar from "./components/StatsBar";
import TestimonialsInfluencer from "./components/TestimonialsInfluencer";
import WhyBrilliantBrainsInfluencer from "./components/WhyBrilliantBrainsInfluencer";
import TimelineInfluencer from "./components/TimelineInfluencer";
import ReelsGallerySection from "./components/ReelsGallerySection";
import RegistrationForm from "./components/RegistrationForm";
import FooterInfluencer from "./components/FooterInfluencer";
import WhatsAppButton from "./components/WhatsAppButton";

const InfluencerLandingPage = () => {
  return (
    <div className="bg-black w-full">
      <NavbarInfluencer />
      <HeroInfluencer />
      <BrandMarqueeInfluencer />
      <WhyJoinSection />
      <TimelineInfluencer />
      <StatsBar />
      <TestimonialsInfluencer />
      <ReelsGallerySection />
      <WhyBrilliantBrainsInfluencer />
      <RegistrationForm />
      <FooterInfluencer />
      <WhatsAppButton />
    </div>
  );
};

export default InfluencerLandingPage;

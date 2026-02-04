import FeatureCardsSection from "./components/FeatureCardsSection";
import FeatureIntroSection from "./components/FeatureIntroSection";
import HeroSection from "./components/HeroSection";
import MainFooter from "./components/MainFooter";
import MainHeader from "./components/MainHeader";
import PriorityIntroSection from "./components/PriorityIntroSection";

const Main = () => {
  return (
    <div className="min-h-screen bg-white">
      <MainHeader />
      <main>
      <HeroSection />
      <PriorityIntroSection />
      <FeatureIntroSection />
      <FeatureCardsSection />
      </main>
      <MainFooter />
    </div>
  );
};

export default Main;

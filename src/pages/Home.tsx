import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import TrendingSection from '../components/TrendingSection';
import LiveAuctionSection from '../components/LiveAuctionSection';
import MintingTechniques from '../components/MintingTechniques';
import MembershipSection from '../components/MembershipSection';
import WhyChooseUs from '../components/WhyChooseUs';
import CreativeCTA from '../components/CreativeCTA';
import FeaturedCollections from '../components/FeaturedCollections';
import FAQSection from '../components/FAQSection';
import AboutSection from '../components/AboutSection';
import EcosystemSection from '../components/EcosystemSection';

const Home = () => {
    return (
        <main className="bg-black min-h-screen">
            <HeroSection />
            <CategoriesSection />
            <TrendingSection />
            <LiveAuctionSection />
            <MintingTechniques />
            <FeaturedCollections />
            <AboutSection />
            <EcosystemSection />
            <MembershipSection />
            <WhyChooseUs />
            <FAQSection />
            <CreativeCTA />
        </main>
    );
};

export default Home;

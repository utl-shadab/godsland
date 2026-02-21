import ClubHero from "../components/Membership/ClubHero";
import HeroVision from "../components/Membership/HeroVision";
import MembershipTiers from "../components/Membership/MembershipTiers";
import ExploreFeatures from "../components/Membership/ExploreFeatures";
import WellnessBenefits from "../components/Membership/WellnessBenefits";
import TierBenefits from "../components/Membership/TierBenefits";

const MembershipClub = () => {
    return (
        <div className="bg-black min-h-screen">
            <ClubHero />
            <HeroVision />
            <MembershipTiers />
            <ExploreFeatures />
            <WellnessBenefits />
            <TierBenefits />
        </div>
    );
};

export default MembershipClub;

import Brand from '@/components/modules/home/Brand';
import Categories from '@/components/modules/home/Categories';
import ContactInfo from '@/components/modules/home/ContactInfo';
import FeaturedListings from '@/components/modules/home/FeaturedListings';
import HeroSection from '@/components/modules/home/HeroSection';
import Offers from '@/components/modules/home/Offers';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Categories />
      <FeaturedListings />
      <ContactInfo />
      <Brand />
      <Offers />
    </div>
  );
};

export default HomePage;

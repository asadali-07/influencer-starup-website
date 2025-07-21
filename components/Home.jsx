import Accordion from "./Accordian";
import HeroSection from "./HeroSection";
import ProductImages from "./ProductImages";
import ProductVideo from "./ProductVideo";

const Home = () => {
  return (
    <>
      <HeroSection />
      <ProductVideo />
      <ProductImages />
      <Accordion />
    </>
  );
};

export default Home;

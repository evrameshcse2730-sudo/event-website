import Hero from "../components/Hero";
import AboutPreview from "../components/AboutPreview";
import EventTypes from "../components/EventTypes";
import UpcomingEvents from "../components/UpcomingEvents";
import FeaturedEvent from "../components/FeaturedEvent";
import WhyChooseUs from "../components/WhyChooseUs";
import PastEvents from "../components/PastEvents";
import GalleryPreview from "../components/GalleryPreview";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Contact from "../components/Contact";

function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <EventTypes />
      <UpcomingEvents />
      <FeaturedEvent />
      <WhyChooseUs />
      {/*<PastEvents />/  MULTIPLE IMAGE GALLERY */}
      <GalleryPreview />
      <Testimonials />
      <CTA />
      <Contact />
    </>
  );
}

export default Home;
import AboutPage from "@/component/AboutUs";
import CitiesGallery from "@/component/CityGallery";
import CityMaps from "@/component/CityMaps";
import ContactUs from "@/component/ContactUs";
import Footer from "@/component/Footer";

import HeroSection from "@/component/HeroSection";
import LocalReview from "@/component/LocalReview";
import LocationPage from "@/component/LocationPage";
import Navbar from "@/component/Navbar";

import TourPackages from "@/component/TourPackages";
import VisitorTracker from "@/component/VisitorTrackers";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Navbar will be positioned absolutely over the hero */}
      
      {/* Hero section with background parallax */}
      <VisitorTracker />
      <Navbar />
      <HeroSection />
      <AboutPage />

      <CitiesGallery />
      
      <CityMaps />
      <TourPackages />
      {/* <LocalReview /> */}
      <ContactUs />
      <LocationPage />
      <Footer />

    </main>
  );
}

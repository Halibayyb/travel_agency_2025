import AboutPage from "@/component/AboutUs";
import CitiesGallery from "@/component/CityGallery";
import CityMaps from "@/component/CityMaps";
import HeroSection from "@/component/HeroSection";
import Navbar from "@/component/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Navbar will be positioned absolutely over the hero */}
      <Navbar />
      
      {/* Hero section with background parallax */}
      <HeroSection />
      <AboutPage />
      <CitiesGallery />
      <CityMaps />
    </main>
  );
}

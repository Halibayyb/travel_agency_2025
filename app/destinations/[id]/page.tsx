"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Thumbs } from "swiper/modules";
import { useParams } from 'next/navigation';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { 
  tabs, 
  destinationImages, 
  destinations,
  ImageData,
  ExperienceData 
} from "@/src/lib/lpbConfig";

interface ModalState {
  open: boolean;
  index: number;
  images: ImageData[];
  title: string;
}

interface ImageButtonProps {
  src: string | StaticImageData;
  alt: string;
  onClick: () => void;
  onDoubleClick?: () => void;
  className: string;
  children?: React.ReactNode;
}

// Map URL slugs to destination names
const DESTINATION_MAP: { [key: string]: string } = {
  'luang-prabang': 'LUANG PRABANG',
  'nong-khiaw': 'NONG KHIAW',
  'vang-vieng': 'VANG VIENG',
  'vientiane': 'VIENTIANE'
};

export default function DestinationPage() {
  const params = useParams();
  const destinationSlug = params.id as string;
  
  // Get destination name from slug
  const destinationName = DESTINATION_MAP[destinationSlug];
  
  // If invalid destination, redirect or show error
  if (!destinationName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-stone-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">Destination Not Found</h1>
          <p className="text-gray-600 mb-6">The destination "{destinationSlug}" does not exist.</p>
          <a href="/destinations" className="bg-amber-800 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors">
            View All Destinations
          </a>
        </div>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedExperienceImages, setSelectedExperienceImages] = useState<{ [key: number]: number }>({});
  const [modal, setModal] = useState<ModalState>({ open: false, index: 0, images: [], title: "" });
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  // Get current destination data
  const currentDestination = destinations.find(dest => dest.name === destinationName) || destinations[0];
  const currentExperiences = currentDestination.experiences;

  // Get destination info based on destination name
  const getCurrentDestinationInfo = () => {
    switch (destinationName) {
      case "LUANG PRABANG":
        return {
          title: "LUANG PRABANG",
          description: "Luang Prabang, the ancient capital of Luang Prabang Province in northern Laos, lies in a valley at the confluence of the Mekong and Nam Khan rivers. Inhabited for thousands of years, it was the royal capital of the country until 1975. It's known for its many Buddhist temples, including the gilded Wat Xieng Thong, dating to the 16th century, and Wat Mai, once the residence of the head of Laotian Buddhism."
        };
      case "NONG KHIAW":
        return {
          title: "NONG KHIAW",
          description: "Nong Khiaw is a stunning riverside town in northern Laos, nestled along the Nam Ou River and surrounded by dramatic limestone karsts and lush mountains. This peaceful destination offers breathtaking viewpoints, authentic village experiences, and some of the most spectacular natural scenery in Southeast Asia."
        };
      case "VANG VIENG":
        return {
          title: "VANG VIENG",
          description: "Vang Vieng is a picturesque town situated along the Nam Song River, famous for its dramatic limestone karst landscape, outdoor adventures, and stunning natural beauty. From hot air balloon rides to cave exploration and river activities, it's an adventure lover's paradise set against a backdrop of emerald rice paddies and towering cliffs."
        };
      case "VIENTIANE":
        return {
          title: "VIENTIANE",
          description: "Vientiane, the charming capital of Laos, is a laid-back city where French colonial architecture meets traditional Lao culture. Home to magnificent temples, historical monuments, and vibrant markets, it offers a perfect blend of spiritual heritage, cultural richness, and relaxed urban atmosphere along the Mekong River."
        };
      default:
        return {
          title: destinationName,
          description: "Discover the beauty and culture of this amazing destination in Laos."
        };
    }
  };

  const currentDestinationInfo = getCurrentDestinationInfo();

  const openModal = (imageSrc: string | StaticImageData, imageAlt: string, imageSet: ImageData[], title: string = ""): void => {
    const index = imageSet.findIndex((img: ImageData) => img.src === imageSrc && img.alt === imageAlt);
    setModal({ open: true, index: Math.max(0, index), images: imageSet, title });
  };

  const closeModal = (): void => setModal({ open: false, index: 0, images: [], title: "" });

  const getCurrentExperienceImage = (experience: ExperienceData, experienceIndex: number): ImageData => {
    const selectedIndex = selectedExperienceImages[experienceIndex] || 0;
    return [experience.images.main, ...experience.images.secondary][selectedIndex];
  };

  const setExperienceImage = (experienceIndex: number, imageIndex: number): void => {
    setSelectedExperienceImages(prev => ({ ...prev, [experienceIndex]: imageIndex }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") closeModal();
    };
    if (modal.open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [modal.open]);

  const ImageButton: React.FC<ImageButtonProps> = ({ src, alt, onClick, onDoubleClick, className, children }) => (
    <button onClick={onClick} onDoubleClick={onDoubleClick} className={className}>
      <Image src={src} alt={alt} className="w-full h-full object-cover" />
      {children}
    </button>
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100 pt-20">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-amber-800 tracking-widest mb-8">
            {currentDestinationInfo.title}
          </h1>
          
          {/* Navigation to other destinations */}
          <div className="flex justify-center flex-wrap gap-4 md:gap-8 mb-16">
            {tabs.map((tab) => {
              const slug = Object.keys(DESTINATION_MAP).find(key => DESTINATION_MAP[key] === tab);
              const isActive = tab === destinationName;
              
              return (
                <a
                  key={tab}
                  href={`/destinations/${slug}`}
                  className={`text-sm tracking-wider transition-colors duration-300 px-4 py-2 ${
                    isActive
                      ? "text-amber-800 border-b-2 border-amber-800 pb-1"
                      : "text-gray-500 hover:text-amber-700"
                  }`}
                >
                  {tab}
                </a>
              );
            })}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative">
              <ImageButton
                src={destinationImages[selectedImage]}
                alt={`${currentDestinationInfo.title} Main View`}
                onClick={() => {
                  const galleryImages = destinationImages.map((img, i) => ({
                    src: img,
                    alt: `${currentDestinationInfo.title} Experience ${i + 1}`,
                  }));
                  openModal(destinationImages[selectedImage], `${currentDestinationInfo.title} Experience ${selectedImage + 1}`, galleryImages, `${currentDestinationInfo.title} - Destination Gallery`);
                }}
                className="w-full block"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none"></div>
              </ImageButton>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-light text-amber-900 leading-tight">{currentDestinationInfo.title}</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{currentDestinationInfo.description}</p>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-8 py-3 border-2 border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white transition-colors duration-300 tracking-wider text-sm">
                    BOOK NOW
                  </button>
                  <button className="px-8 py-3 border-2 border-amber-800 bg-amber-800 text-white hover:text-amber-800 hover:bg-transparent transition-colors duration-300 tracking-wider text-sm">
                    CONTACT US
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Images with Built-in Navigation */}
          <div className="mb-16 relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={5}
              navigation={true}
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 12 },
                640: { slidesPerView: 3, spaceBetween: 14 },
                768: { slidesPerView: 4, spaceBetween: 16 },
                1024: { slidesPerView: 5, spaceBetween: 16 },
              }}
              className="destination-swiper"
            >
              {destinationImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <ImageButton
                    src={image}
                    alt={`Experience ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    onDoubleClick={() => {
                      const galleryImages = destinationImages.map((img, i) => ({
                        src: img,
                        alt: `${currentDestinationInfo.title} Experience ${i + 1}`,
                      }));
                      openModal(image, `${currentDestinationInfo.title} Experience ${index + 1}`, galleryImages, `${currentDestinationInfo.title} - Destination Gallery`);
                    }}
                    className={`group relative overflow-hidden rounded-md transition-all duration-300 w-full h-40 ${
                      selectedImage === index
                        ? "ring-2 ring-amber-800 scale-105"
                        : "hover:scale-105 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                  </ImageButton>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Experiences Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-amber-800 mb-4">Experiences in {currentDestinationInfo.title}</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>

          {/* Experiences */}
          {currentExperiences.map((experience, index) => {
            const isEven = index % 2 === 0;
            const experienceImages = [experience.images.main, ...experience.images.secondary];
            
            return (
              <div key={experience.id} className="mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className={`space-y-6 ${!isEven ? "order-1 lg:order-2" : ""}`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-amber-600 text-sm font-medium tracking-wider">
                        {currentDestinationInfo.title}
                      </span>
                    </div>
                    <h3 className="font-bold text-3xl text-amber-800">{experience.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{experience.description}</p>
                    <div className="space-y-3">
                      {experience.features.map((feature, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`space-y-4 ${!isEven ? "order-2 lg:order-1" : ""}`}>
                    <ImageButton
                      src={getCurrentExperienceImage(experience, index).src}
                      alt={getCurrentExperienceImage(experience, index).alt}
                      onClick={() => {
                        const currentImage = getCurrentExperienceImage(experience, index);
                        openModal(currentImage.src, currentImage.alt, experienceImages, `${experience.title} - Experience Gallery`);
                      }}
                      className="w-full block group relative overflow-hidden rounded-lg h-80 md:h-96"
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </div>
                    </ImageButton>

                    {/* Simplified Experience Swiper */}
                    <div className="relative">
                      <Swiper
                        modules={[Navigation]}
                        spaceBetween={12}
                        slidesPerView={3}
                        navigation={true}
                        className="destination-swiper"
                      >
                        {experienceImages.map((image, imgIndex) => (
                          <SwiperSlide key={imgIndex}>
                            <ImageButton
                              src={image.src}
                              alt={image.alt}
                              onClick={() => setExperienceImage(index, imgIndex)}
                              onDoubleClick={() => openModal(image.src, image.alt, experienceImages, `${experience.title} - Experience Gallery`)}
                              className={`group relative overflow-hidden rounded-lg transition-all duration-300 w-full h-24 ${
                                (selectedExperienceImages[index] || 0) === imgIndex
                                  ? "ring-2 ring-amber-800"
                                  : "hover:scale-105 opacity-70 hover:opacity-100"
                              }`}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* No experiences message for destinations without data */}
          {currentExperiences.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-amber-50 rounded-lg p-8 border border-amber-200">
                <svg className="w-16 h-16 text-amber-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="text-xl font-semibold text-amber-800 mb-2">Experiences Coming Soon</h3>
                <p className="text-amber-700">We're currently preparing amazing experiences for {currentDestinationInfo.title}. Check back soon!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal.open && modal.images.length > 0 && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex flex-col">
            <button onClick={closeModal} className="absolute top-6 right-6 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {modal.title && (
              <div className="absolute top-6 left-6 z-20">
                <div className="bg-black/70 px-4 py-2 rounded-lg">
                  <h3 className="text-white font-semibold text-lg">{modal.title}</h3>
                  <p className="text-amber-300 text-sm">{modal.images.length} images</p>
                </div>
              </div>
            )}

            <div className="flex-1 flex items-center justify-center p-8">
              <div className="w-full max-w-6xl h-full">
                <Swiper
                  modules={[Navigation, Pagination, Keyboard, Thumbs]}
                  spaceBetween={30}
                  navigation={true}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  keyboard={{ enabled: true }}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  initialSlide={modal.index}
                  className="h-full modal-swiper"
                  onSlideChange={(swiper: any) => setModal(prev => ({ ...prev, index: swiper.activeIndex }))}
                >
                  {modal.images.map((image, index) => (
                    <SwiperSlide key={index} className="flex items-center justify-center">
                      <div className="relative max-w-full max-h-full">
                        <Image src={image.src} alt={image.alt} className="max-w-full max-h-[70vh] object-contain rounded-lg" />
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                          <div className="bg-black/70 px-4 py-2 rounded-lg">
                            <p className="text-white text-sm mb-1">{index + 1} / {modal.images.length}</p>
                            <p className="text-white font-medium">{image.alt}</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="p-4">
              <div className="max-w-4xl mx-auto">
                <Swiper
                  modules={[Thumbs]}
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={Math.min(modal.images.length, 8)}
                  freeMode={true}
                  watchSlidesProgress={true}
                  breakpoints={{
                    320: { slidesPerView: Math.min(modal.images.length, 3) },
                    640: { slidesPerView: Math.min(modal.images.length, 5) },
                    1024: { slidesPerView: Math.min(modal.images.length, 8) },
                  }}
                >
                  {modal.images.map((image, index) => (
                    <SwiperSlide key={index} className="cursor-pointer">
                      <div className={`w-full h-16 rounded overflow-hidden transition-all duration-300 ${
                        index === modal.index ? "ring-2 ring-amber-400" : "opacity-70 hover:opacity-100"
                      }`}>
                        <Image src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Section */}
      <div className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 tracking-widest">
          {currentDestination.location.title}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {currentDestination.location.description}
        </p>
      </div>

      {/* Map iframe - Full Width */}
      <div className="w-full h-96 md:h-[500px] lg:h-[600px]">
        <iframe
          src={currentDestination.location.mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${currentDestination.location.title} Location Map`}
        />
      </div>
    </section>
  );
}
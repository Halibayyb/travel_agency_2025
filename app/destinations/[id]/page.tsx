"use client";
export const runtime = "edge";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import {
  tabs,
  destinationImagesMap,
  luangPrabangImages,
  destinations,
  ImageData,
  ExperienceData,
} from "@/src/lib/lpbConfig";
import { animations, stagger } from "@/src/lib/animations";
import { Maximize2, FileText } from "lucide-react";
import ContactUs from "@/component/ContactUs";
import ImageModal from "@/component/ImageModal";

interface ModalState {
  open: boolean;
  index: number;
  images: ImageData[];
  title: string;
}

const DESTINATION_MAP: { [key: string]: string } = {
  "luang-prabang": "LUANG PRABANG",
  "nong-khiaw": "NONG KHIAW",
  "vang-vieng": "VANG VIENG",
  vientiane: "VIENTIANE",
};

const DESTINATION_INFO = {
  "LUANG PRABANG": {
    title: "LUANG PRABANG",
    description: "Luang Prabang, the ancient capital of Luang Prabang Province in northern Laos, lies in a valley at the confluence of the Mekong and Nam Khan rivers. Inhabited for thousands of years, it was the royal capital of the country until 1975. It's known for its many Buddhist temples, including the gilded Wat Xieng Thong, dating to the 16th century, and Wat Mai, once the residence of the head of Laotian Buddhism.",
  },
  "NONG KHIAW": {
    title: "NONG KHIAW",
    description: "Nong Khiaw is a stunning riverside town in northern Laos, nestled along the Nam Ou River and surrounded by dramatic limestone karsts and lush mountains. This peaceful destination offers breathtaking viewpoints, authentic village experiences, and some of the most spectacular natural scenery in Southeast Asia.",
  },
  "VANG VIENG": {
    title: "VANG VIENG",
    description: "Vang Vieng is a picturesque town situated along the Nam Song River, famous for its dramatic limestone karst landscape, outdoor adventures, and stunning natural beauty. From hot air balloon rides to cave exploration and river activities, it's an adventure lover's paradise set against a backdrop of emerald rice paddies and towering cliffs.",
  },
  "VIENTIANE": {
    title: "VIENTIANE",
    description: "Vientiane, the charming capital of Laos, is a laid-back city where French colonial architecture meets traditional Lao culture. Home to magnificent temples, historical monuments, and vibrant markets, it offers a perfect blend of spiritual heritage, cultural richness, and relaxed urban atmosphere along the Mekong River.",
  },
};

export default function DestinationPage() {
  const params = useParams();
  const destinationSlug = params.id as string;
  const destinationName = DESTINATION_MAP[destinationSlug];
  const currentDestinationImages = destinationImagesMap[destinationName as keyof typeof destinationImagesMap] || luangPrabangImages;
  const currentDestination = destinations.find((dest) => dest.name === destinationName) || destinations[0];
  const currentDestinationInfo = DESTINATION_INFO[destinationName as keyof typeof DESTINATION_INFO] || { title: destinationName, description: "Discover the beauty and culture of this amazing destination in Laos." };

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedExperienceImages, setSelectedExperienceImages] = useState<{ [key: number]: number }>({});
  const [modal, setModal] = useState<ModalState>({ open: false, index: 0, images: [], title: "" });

  if (!destinationName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-stone-100">
        <motion.div className="text-center" {...animations.scaleUp}>
          <h1 className="font1 text-4xl font-bold text-amber-800 mb-4">Destination Not Found</h1>
          <p className="font2 text-gray-600 mb-6">The destination "{destinationSlug}" does not exist.</p>
          <a href="/destinations" className="font2 bg-amber-800 text-white px-6 py-3 hover:bg-amber-700 transition-colors">
            View All Destinations
          </a>
        </motion.div>
      </div>
    );
  }

  const openModal = (imageSrc: string | StaticImageData, imageAlt: string, imageSet: ImageData[], title: string = "") => {
    const index = imageSet.findIndex((img: ImageData) => img.src === imageSrc && img.alt === imageAlt);
    setModal({ open: true, index: Math.max(0, index), images: imageSet, title });
  };

  const closeModal = () => setModal({ open: false, index: 0, images: [], title: "" });

  const getCurrentExperienceImage = (experience: ExperienceData, experienceIndex: number) => {
    const selectedIndex = selectedExperienceImages[experienceIndex] || 0;
    return [experience.images.main, ...experience.images.secondary][selectedIndex];
  };

  const setExperienceImage = (experienceIndex: number, imageIndex: number) => {
    setSelectedExperienceImages((prev) => ({ ...prev, [experienceIndex]: imageIndex }));
  };

  const ImageButton = ({ src, alt, onClick, onDoubleClick, className, children }: {
    src: string | StaticImageData;
    alt: string;
    onClick: () => void;
    onDoubleClick?: () => void;
    className: string;
    children?: React.ReactNode;
  }) => (
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
          <h1 className="font1 text-4xl md:text-5xl font-light text-amber-800 tracking-widest mb-8">
            {currentDestinationInfo.title}
          </h1>
          <motion.div className="flex justify-center flex-wrap gap-4 md:gap-8 mb-5" {...animations.fadeIn}>
            {tabs.map((tab, index) => {
              const slug = Object.keys(DESTINATION_MAP).find((key) => DESTINATION_MAP[key] === tab);
              const isActive = tab === destinationName;
              return (
                <motion.a
                  key={tab}
                  href={`/destinations/${slug}`}
                  className={`font2 text-sm tracking-wider transition-colors duration-300 px-4 py-2 ${
                    isActive ? "text-amber-800 border-b-2 border-amber-800 pb-1" : "text-gray-500 hover:text-amber-700"
                  }`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                >
                  {tab}
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Image */}
          <motion.div className="relative" {...animations.scaleUp}>
            <ImageButton
              src={currentDestinationImages[selectedImage]}
              alt={`${currentDestinationInfo.title} Main View`}
              onClick={() => {
                const galleryImages = currentDestinationImages.map((img: any, i: number) => ({
                  src: img,
                  alt: `${currentDestinationInfo.title} Experience ${i + 1}`,
                }));
                openModal(
                  currentDestinationImages[selectedImage],
                  `${currentDestinationInfo.title} Experience ${selectedImage + 1}`,
                  galleryImages,
                  `${currentDestinationInfo.title} - Destination Gallery`
                );
              }}
              className="w-full h-115 block"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </ImageButton>
          </motion.div>

          {/* Thumbnails */}
          <motion.div className="relative" {...animations.fadeUp}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={5}
              navigation={true}
              breakpoints={{
                320: { slidesPerView: 3, spaceBetween: 12 },
                640: { slidesPerView: 5, spaceBetween: 14 },
                768: { slidesPerView: 8, spaceBetween: 16 },
                1024: { slidesPerView: 10, spaceBetween: 16 },
              }}
              className="destination-swiper"
            >
              {currentDestinationImages.map((image: any, index: number) => (
                <SwiperSlide key={index}>
                  <ImageButton
                    src={image}
                    alt={`Experience ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    onDoubleClick={() => {
                      const galleryImages = currentDestinationImages.map((img: any, i: number) => ({
                        src: img,
                        alt: `${currentDestinationInfo.title} Experience ${i + 1}`,
                      }));
                      openModal(image, `${currentDestinationInfo.title} Experience ${index + 1}`, galleryImages, `${currentDestinationInfo.title} - Destination Gallery`);
                    }}
                    className={`group relative overflow-hidden transition-all duration-300 w-full h-20 ${
                      selectedImage === index ? "ring-2 ring-amber-800 scale-105" : "hover:scale-105 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </ImageButton>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Description */}
          <motion.div className="space-y-6 mb-16 mt-5" {...animations.fadeUp}>
            <h2 className="font1 text-3xl font-light text-amber-900 leading-tight">{currentDestinationInfo.title}</h2>
            <p className="font2 text-gray-700 leading-relaxed text-lg">{currentDestinationInfo.description}</p>
            <motion.div className="flex flex-col sm:flex-row gap-3" initial="initial" whileInView="animate" variants={stagger.container} viewport={{ once: true }}>
              <Link href="/#service">
                <motion.button className="cursor-pointer font2 px-8 py-3 border-2 border-[#52392F] text-amber-800 hover:bg-[#4A322A] hover:text-white transition-colors duration-300 tracking-wider text-sm" variants={stagger.item}>
                  BOOK NOW
                </motion.button>
              </Link>
              <motion.button
                className="cursor-pointer font2 px-8 py-3 bg-[#52392F] text-white hover:text-white transition-colors duration-300 tracking-wider text-sm"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                variants={stagger.item}
              >
                ASK OUR EXPERT
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Experiences Header */}
          <div className="text-center mb-12 mt-20">
            <h2 className="font1 text-3xl font-light text-amber-800 mb-4">Experiences in {currentDestinationInfo.title}</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>

          {/* Experiences */}
          {currentDestination.experiences.map((experience, index) => {
            const isEven = index % 2 === 0;
            const experienceImages = [experience.images.main, ...experience.images.secondary];

            return (
              <motion.div key={experience.id} className="mb-16" {...animations.fadeUp}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className={`space-y-6 ${!isEven ? "order-1 lg:order-2" : ""}`}>
                    <motion.div className="flex items-center space-x-3 mb-4" {...animations.fadeIn}>
                      <span className="font2 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font2 text-amber-600 text-sm font-medium tracking-wider">{currentDestinationInfo.title}</span>
                    </motion.div>
                    <h3 className="font1 font-bold text-3xl text-amber-800">{experience.title}</h3>
                    <motion.p className="font2 text-gray-700 leading-relaxed" {...animations.fadeIn}>{experience.description}</motion.p>
                    <motion.div className="space-y-3" initial="initial" whileInView="animate" variants={stagger.container} viewport={{ once: true }}>
                      {experience.features.map((feature, i) => (
                        <motion.div key={i} className="flex items-start space-x-3" {...animations.fadeIn}>
                          <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="font2 text-gray-600">{feature}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  <div className={`space-y-4 ${!isEven ? "order-2 lg:order-1" : ""}`}>
                    <motion.div {...animations.scaleUp}>
                      <ImageButton
                        src={getCurrentExperienceImage(experience, index).src}
                        alt={getCurrentExperienceImage(experience, index).alt}
                        onClick={() => {
                          const currentImage = getCurrentExperienceImage(experience, index);
                          openModal(currentImage.src, currentImage.alt, experienceImages, `${experience.title} - Experience Gallery`);
                        }}
                        className="w-full block group relative overflow-hidden h-80 md:h-96"
                      >
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </ImageButton>
                    </motion.div>

                    <motion.div className="relative" {...animations.fadeUp}>
                      <Swiper modules={[Navigation]} spaceBetween={12} slidesPerView={3} navigation={true} className="destination-swiper">
                        {experienceImages.map((image, imgIndex) => (
                          <SwiperSlide key={imgIndex}>
                            <ImageButton
                              src={image.src}
                              alt={image.alt}
                              onClick={() => setExperienceImage(index, imgIndex)}
                              onDoubleClick={() => openModal(image.src, image.alt, experienceImages, `${experience.title} - Experience Gallery`)}
                              className={`group relative overflow-hidden transition-all duration-300 w-full h-24 ${
                                (selectedExperienceImages[index] || 0) === imgIndex ? "ring-2 ring-amber-800" : "hover:scale-105 opacity-70 hover:opacity-100"
                              }`}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* No experiences message */}
          {currentDestination.experiences.length === 0 && (
            <motion.div className="text-center py-16" {...animations.scaleUp}>
              <div className="bg-amber-50 p-8 border border-amber-200">
                <FileText className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                <h3 className="font1 text-xl font-semibold text-amber-800 mb-2">Experiences Coming Soon</h3>
                <p className="font2 text-amber-700">
                  We're currently preparing amazing experiences for {currentDestinationInfo.title}. Check back soon!
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal */}
      <ImageModal
        isOpen={modal.open}
        onClose={closeModal}
        images={modal.images}
        initialIndex={modal.index}
        title={modal.title}
      />

      {/* Location Section */}
      <div className="text-center py-16 px-4">
        <h1 className="font1 text-4xl md:text-5xl font-light text-gray-800 mb-6 tracking-widest">
          {currentDestination.location.title}
        </h1>
        <motion.p className="font2 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed" {...animations.fadeUp}>
          {currentDestination.location.description}
        </motion.p>
      </div>

      {/* Map */}
      <motion.div className="w-full h-96 md:h-[500px] lg:h-[600px]" {...animations.scaleUp}>
        <iframe
          src={currentDestination.location.mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${currentDestination.location.title} Location Map`}
        />
      </motion.div>

      {/* Contact */}
      <motion.div {...animations.fadeUp}>
        <ContactUs />
      </motion.div>
    </section>
  );
}
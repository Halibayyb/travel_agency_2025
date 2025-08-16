"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import animations
import { animations, staggerContainer, staggerChild } from '@/src/lib/animations';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import images
import aboutImage from "@/public/assets/hero_image.jpg";
import khamtravel from "@/public/assets/khamtravel_img.jpg";
import lpbStreet from "@/public/assets/lpb_street.jpg";

// Story timeline data - 5 phases
const storyTimeline = [
  {
    year: "2010",
    title: "THE BEGINNING",
    description: "What truly sets Kham apart is his unwavering commitment to authentic, enriching experiences. He believes that to truly know Luang Prabang is to delve beyond the visible, to unveil its unseen heart.",
    backgroundImage: aboutImage,
    altText: "Luang Prabang Temple - The Beginning",
    bgColor: "bg-[#8C614F]",
    tags: [
      { label: "Est. 2010" },
      { label: "Luang Prabang" }
    ]
  },
  {
    year: "2015",
    title: "EXPANSION",
    description: "Growing beyond traditional tours, KhamTravel began crafting unique cultural immersion experiences. We started partnering with local communities to offer authentic village stays and traditional craft workshops.",
    backgroundImage: aboutImage,
    altText: "Cultural Expansion - 2015",
    bgColor: "bg-[#A0725E]",
    tags: [
      { label: "Cultural Tours" },
      { label: "Village Stays" }
    ]
  },
  {
    year: "2018",
    title: "INNOVATION",
    description: "Embracing sustainable tourism practices, we introduced eco-friendly adventures and nature conservation programs. Our commitment to preserving Laos' natural beauty became our core mission.",
    backgroundImage: lpbStreet,
    altText: "Sustainable Innovation - 2018",
    bgColor: "bg-[#7A5A47]",
    tags: [
      { label: "Eco-Tourism" },
      { label: "Conservation" }
    ]
  },
  {
    year: "2020",
    title: "ADAPTATION",
    description: "During challenging times, we adapted by creating virtual experiences and supporting local communities. Our resilience strengthened our bonds with partners and deepened our commitment to responsible tourism.",
    backgroundImage: aboutImage,
    altText: "Adaptation & Resilience - 2020",
    bgColor: "bg-[#654238]",
    tags: [
      { label: "Virtual Tours" },
      { label: "Community Support" }
    ]
  },
  {
    year: "2025",
    title: "TODAY",
    description: "Today, KhamTravel stands as a beacon of authentic Lao hospitality, connecting travelers with the soul of Southeast Asia. We've guided thousands through ancient temples, pristine waterfalls, and vibrant local communities.",
    backgroundImage: lpbStreet,
    altText: "Luang Prabang Street - Today",
    bgColor: "bg-[#52392F]",
    tags: [
      { label: "Heritage Tours" },
      { label: "Digital Innovation" }
    ]
  }
];

const AboutPage = () => {
  return (
    <section id="about" className="min-h-screen bg-gray-50 px-4 sm:px-6 xl:px-30 pt-16 sm:pt-20">
      {/* Header Section */}
      <motion.div 
        {...animations.fadeInUp}
        className="text-center mb-10 px-4"
      >
        <motion.div 
          {...animations.scaleIn}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center mb-4 sm:mb-6"
        >
          <div className="w-8 sm:w-12 lg:w-16 h-px bg-[#8C614F]"></div>
          <div className="mx-2 sm:mx-4 w-2 h-2 bg-[#8C614F] rounded-full"></div>
          <div className="w-8 sm:w-12 lg:w-16 h-px bg-[#8C614F]"></div>
        </motion.div>
        <motion.h2 
          {...animations.fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#52392F] mb-4 tracking-wider"
        >
          OUR STORY
        </motion.h2>
        <motion.p 
          {...animations.fadeInUp}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
        >
          From humble beginnings to becoming Laos' most trusted travel companion
        </motion.p>
      </motion.div>
     
      <div className="container mx-auto py-8 sm:py-16">
        {/* Main Content Section */}
        <motion.div 
          {...animations.fadeInUp}
          className="mb-12 sm:mb-20"
        >
          {/* Content Over Image */}
          <div className="inset-0 flex items-center">
            <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center">
                {/* Owner Image Section */}
                <motion.div 
                  {...animations.slideInLeft}
                  className="flex flex-col items-center xl:items-center"
                >
                  <motion.div 
                    {...animations.scaleIn}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 xl:w-70 xl:h-70 mb-3 sm:mb-4 md:mb-6"
                  >
                    <Image
                      src={khamtravel}
                      alt="Kham Soulivong"
                      fill
                      className="object-cover rounded-full shadow-xl"
                      sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 192px, 280px"
                    />
                  </motion.div>
                  <motion.h3 
                    {...animations.fadeInUp}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-2xl xl:text-3xl font-bold text-black mb-2 text-center lg:text-left"
                  >
                    KHAM SOULIVONG
                  </motion.h3>
                </motion.div>

                {/* Text Content Section */}
                <motion.div 
                  {...animations.slideInRight}
                  className="text-center lg:text-left space-y-3 sm:space-y-4 md:space-y-6"
                >
                  <motion.h2 
                    {...animations.fadeInUp}
                    transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: false, amount: 0.2 }}

                    className="text-sm xl:text-5xl font-bold text-black leading-tight"
                  >
                    "DISCOVER YOUR JOURNEY TO LAOS"
                  </motion.h2>

                  <motion.p 
                    {...animations.fadeInUp}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-black leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg"
                  >
                    For over <strong>25 years</strong>, Kham Soulivong has
                    been more than a guide: he has been a bridge to the true
                    soul of Laos. His passion for his homeland, coupled with
                    an unparalleled understanding of its history, culture, and
                    nature, allows him to share Laos not just as a
                    destination, but as a living experience.
                  </motion.p>

                  <motion.div 
                    {...animations.fadeInUp}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="pt-2 sm:pt-3 md:pt-4"
                  >
                    <motion.button 
                      className="hidden text-black xl:block bg-white/20 backdrop-blur-sm border border-black px-4 sm:px-6 md:px-8 py-2 sm:py-2 md:py-3 hover:bg-white/30 transition-all duration-300 font-medium text-xs sm:text-sm md:text-base shadow-lg"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      Let's explore!
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Section */}
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center max-w-4xl mx-auto px-4 sm:px-6"
        >
          <motion.div 
            variants={staggerChild}
            className="space-y-2"
          >
            <motion.div 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-600"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              42+
            </motion.div>
            <p className="text-gray-600 text-xs sm:text-sm">Years Experience</p>
          </motion.div>

          <motion.div 
            variants={staggerChild}
            className="space-y-2"
          >
            <motion.div 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-600"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              122+
            </motion.div>
            <p className="text-gray-600 text-xs sm:text-sm">Stories nationwide</p>
          </motion.div>

          <motion.div 
            variants={staggerChild}
            className="space-y-2"
          >
            <motion.div 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-600"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              99%
            </motion.div>
            <p className="text-gray-600 text-xs sm:text-sm">Positive Reviews</p>
          </motion.div>
        </motion.div>

        {/* Quote Section */}
        <motion.div 
          {...animations.fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-12 sm:pt-20 text-center px-4"
        >
          <motion.p 
            {...animations.fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 italic text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed"
          >
            "Our Expertise, With Over Two Decades of Unveiling Laos"
          </motion.p>
        </motion.div>

        {/* Establishment & Story Section with Swiper */}
        <motion.div 
          {...animations.fadeInUp}
          className="pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-16"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.h3 
              {...animations.fadeInUp}
              className="text-2xl sm:text-3xl font-bold text-[#52392F] mb-4"
            >
              OUR JOURNEY
            </motion.h3>
            <motion.p 
              {...animations.fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}

              className="text-gray-600 max-w-2xl mx-auto"
            >
              From humble beginnings to industry leadership - discover how we've evolved over the years
            </motion.p>
          </div>

          {/* Story Timeline Swiper */}
          <div className="mx-auto px-4 sm:px-6">
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ 
                clickable: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="story-timeline-swiper !pb-16"
            >
              {storyTimeline.map((story, index) => (
                <SwiperSlide key={story.year}>
                  <motion.div 
                    {...animations.scaleIn}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="overflow-hidden transition-all duration-300"
                  >
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={story.backgroundImage}
                        alt={story.altText}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Year Badge */}
                      <div className="absolute top-4 left-4 flex">
                        <motion.div 
                          className={`w-12 h-12 ${story.bgColor} rounded-full flex items-center justify-center shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 15 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-white font-bold text-sm">
                            {story.year}
                          </span>
                        </motion.div>
                        <motion.h4 
                          {...animations.fadeInUp}
                          className="text-xl font-bold text-white mt-3 ml-3"
                        >
                          {story.title}
                        </motion.h4>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <motion.p 
                        {...animations.fadeInUp}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-gray-600 leading-relaxed text-sm mb-4"
                      >
                        {story.description}
                      </motion.p>
                      
                      {/* Tags */}
                      <motion.div 
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={staggerContainer}
                        className="flex flex-wrap gap-2"
                      >
                        {story.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tagIndex}
                            variants={staggerChild}
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#8C614F]/10 text-[#8C614F] border border-[#8C614F]/20"
                          >
                            <div className="w-1.5 h-1.5 bg-[#8C614F] rounded-full mr-2"></div>
                            {tag.label}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .story-timeline-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        
        .story-timeline-swiper .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          opacity: 0.3 !important;
          transition: all 0.3s ease !important;
        }
        
        .story-timeline-swiper .swiper-pagination-bullet-active {
          opacity: 1 !important;
          transform: scale(1.2) !important;
        }
        
        .story-timeline-swiper .swiper-button-next,
        .story-timeline-swiper .swiper-button-prev {
          color: #8C614F !important;
          width: 40px !important;
          height: 40px !important;
          background: white !important;
          border-radius: 50% !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
          transition: all 0.3s ease !important;
        }
        
        .story-timeline-swiper .swiper-button-next:hover,
        .story-timeline-swiper .swiper-button-prev:hover {
          background: #8C614F !important;
          color: white !important;
          transform: scale(1.1) !important;
        }
        
        .story-timeline-swiper .swiper-button-next:after,
        .story-timeline-swiper .swiper-button-prev:after {
          font-size: 16px !important;
          font-weight: bold !important;
        }
        
        @media (max-width: 640px) {
          .story-timeline-swiper .swiper-button-next,
          .story-timeline-swiper .swiper-button-prev {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutPage;
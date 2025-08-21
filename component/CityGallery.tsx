'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import your updated animations
import { animations, stagger } from '@/src/lib/animations';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import image
import royal_img from "@/public/assets/royal_palace_img.jpg"
import vv_img from "@/public/assets/vv_view.jpg";
import vte_img from "@/public/assets/thatluang.jpg"
import nk_img from "@/public/assets/nong_khiaw_river.jpg"

// Gallery data with destination links
const galleryItems = [
    {
        id: 1,
        title: "LUANG PRABANG",
        subtitle: "Natural Wonder",
        location: "Luang Prabang",
        destination: "luang-prabang", // Add destination slug
        description: "A stunning multi-tier waterfall with turquoise pools, perfect for swimming and relaxation in nature.",
        image: royal_img,
        placeholder: "bg-blue-200"
    },
    {
        id: 2,
        title: "VANG VIENG",
        subtitle: "Adventure Paradise",
        location: "Vang Vieng",
        destination: "vang-vieng", // Add destination slug
        description: "Experience outdoor adventures with stunning karst landscapes, blue lagoons, and thrilling activities in Vang Vieng.",
        image: vv_img,
        placeholder: "bg-amber-200"
    },
    {
        id: 3,
        title: "VIENTIANE",
        subtitle: "Golden Stupa",
        location: "Vientiane",
        destination: "vientiane", // Add destination slug
        description: "Visit the most important national monument of Laos, a magnificent golden stupa in the heart of Vientiane.",
        image: vte_img,
        placeholder: "bg-green-200"
    },
    {
        id: 4,
        title: "NONG KHIAW",
        subtitle: "Riverside Paradise",
        location: "Nong Khiaw",
        destination: "nong-khiaw", // Add destination slug
        description: "Discover dramatic limestone karsts and serene river views in the stunning mountain town of Nong Khiaw.",
        image: nk_img,
        placeholder: "bg-orange-200"
    }
];

const CitiesGallery = () => {
    // Create repeated data to ensure enough slides for loop
    const minSlides = 6;
    const repeatedGalleryItems = [...galleryItems];
    while (repeatedGalleryItems.length < minSlides) {
        repeatedGalleryItems.push(...galleryItems);
    }

    const [activeIndex, setActiveIndex] = useState(1);
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    const handleCardClick = (slideIndex: number) => {
        if (!swiperInstance) return;
        swiperInstance.slideToLoop(slideIndex);
    };

    return (
        <>
            {/* Add custom CSS for beautiful pagination */}
            <style jsx global>{`
                .gallery-swiper .swiper-pagination {
                    position: relative !important;
                    bottom: auto !important;
                    margin-top: 1rem !important;
                    padding-bottom: 2rem !important;
                }
                
                .gallery-swiper .swiper-pagination-bullet {
                    width: 5px !important;
                    height: 5px !important;
                    background: rgba(180, 83, 9, 0.3) !important;
                    border-radius: 50% !important;
                    opacity: 1 !important;
                    margin: 0 8px !important;
                    transition: all 0.3s ease !important;
                    cursor: pointer !important;
                    border: 2px solid transparent !important;
                }
                
                .gallery-swiper .swiper-pagination-bullet:hover {
                    transform: scale(1.2) !important;
                    background: rgba(180, 83, 9, 0.6) !important;
                }
                
                .gallery-swiper .swiper-pagination-bullet-active {
                    background: rgb(180, 83, 9) !important;
                    transform: scale(1.3) !important;
                    box-shadow: 0 0 20px rgba(180, 83, 9, 0.4) !important;
                    border: 2px solid rgba(180, 83, 9, 0.2) !important;
                }
                
                .gallery-swiper .swiper-pagination-bullet-active:hover {
                    transform: scale(1.4) !important;
                    box-shadow: 0 0 25px rgba(180, 83, 9, 0.6) !important;
                }

                /* Add smooth animation for pagination appearance */
                .gallery-swiper .swiper-pagination {
                    animation: fadeInUp 0.6s ease 0.8s both;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            <section id="gallery" className="min-h-screen bg-yellow-50 py-16 overflow-hidden">
                {/* Header Section */}
                <motion.div 
                    {...animations.fadeUp}
                    className="container mx-auto px-6 mb-16"
                >
                    <motion.div 

                        className="text-center"
                    >
                        <motion.p 
                            variants={stagger.item}
                            className="font2 text-gray-500 text-lg mb-4"
                        >
                            our gallery
                        </motion.p>
                        <motion.h1 

                            className="font1 text-3xl md:text-4xl font-bold text-gray-800 mb-2 tracking-wide"
                        >
                            RELAXATION AND LUXURY
                        </motion.h1>
                        <motion.h2 

                            className="font1 text-2xl md:text-3xl font-bold text-gray-800 tracking-wide"
                        >
                            DURING YOUR STAY
                        </motion.h2>
                    </motion.div>
                </motion.div>

                {/* Scaled Gallery Swiper with added padding top */}
                <motion.div 
                    {...animations.scaleUp}
                    className="relative pt-2 xl:pt-8" // Added padding-top here
                >
                    <Swiper
                        onSwiper={setSwiperInstance}
                        modules={[ Pagination, Autoplay]}
                        loop={true}
                        centeredSlides={true}
                        pagination={{ 
                            clickable: true,
                            dynamicBullets: false,
                            renderBullet: function (index, className) {
                                return `<span class="${className}"></span>`;
                            }
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        speed={1500}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 1},
                            1024: { slidesPerView: 2 },
                            1280: { slidesPerView: 2.1 },
                        }}
                        className="gallery-swiper"
                    >
                        {repeatedGalleryItems.map((item, index) => {
                            const isMiddle = activeIndex % galleryItems.length === index % galleryItems.length;

                            return (
                                <SwiperSlide key={`${item.id}-${index}`}>
                                    <motion.div
                                        className={`transition-all duration-500 cursor-pointer mx-2 ${
                                            isMiddle
                                                ? "scale-100 opacity-100"
                                                : "scale-75 opacity-60"
                                        }`}
                                        onClick={() => handleCardClick(index)}
                                        whileHover={{ 
                                            scale: isMiddle ? 1.02 : 0.77,
                                            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                                        }}
                                    >
                                        {/* Wrap the entire card with Link */}
                                        <Link href={`/destinations/${item.destination}`} className="block">
                                            {/* Image Container */}
                                            <motion.div 
                                                className="relative h-80 lg:h-96 overflow-hidden"
                                            >
                                                {/* Placeholder background */}
                                                <div className={`absolute inset-0 ${item.placeholder}`}></div>
                                                
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 hover:scale-110"
                                                />
                                                
                                                {/* Overlay */}
                                                <div className="absolute inset-0 transition-opacity duration-300 hover:bg-black/20"></div>
                                                
                                                {/* Text Overlay */}
                                                <motion.div 
                                                    {...animations.fadeUp}
                                                    className="absolute bottom-6 left-6 text-white"
                                                >
                                                    <motion.h3 
                                                        className={`font1 font-bold mb-1 transition-all duration-300 ${
                                                            isMiddle ? "text-xl md:text-2xl lg:text-3xl" : "text-lg md:text-xl"
                                                        }`}
                                                        whileHover={{ x: 5 }}
                                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                    >
                                                        {item.title}
                                                    </motion.h3>
                                                    <motion.p 
                                                        className={`font2 opacity-90 transition-all duration-300 ${
                                                            isMiddle ? "text-sm md:text-base lg:text-lg" : "text-xs md:text-sm"
                                                        }`}
                                                        whileHover={{ x: 3 }}
                                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                                    >
                                                        {item.subtitle}
                                                    </motion.p>
                                                    <motion.p 
                                                        className={`font2 opacity-75 mt-1 transition-all duration-300 ${
                                                            isMiddle ? "text-xs md:text-sm" : "text-xs"
                                                        }`}
                                                        whileHover={{ x: 2 }}
                                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                                    >
                                                        {item.location}
                                                    </motion.p>
                                                </motion.div>

                                                {/* Explore Button Overlay - Only visible on hover and when active */}
                                                {isMiddle && (
                                                    <div className="absolute inset-0 bg-white/10 bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                                                        <span className="font2 bg-white/30 text-white px-6 py-3 text-sm font-medium ">
                                                            Explore {item.location}
                                                        </span>
                                                    </div>
                                                )}
                                            </motion.div>
                                        </Link>
                                        
                                        {/* Content */}
                                        <motion.div 
                                            {...animations.fadeUp}
                                            className={`p-4 bg-transparent transition-all duration-300 ${
                                                isMiddle ? "opacity-100" : "opacity-0"
                                            }`}
                                        >
                                            <motion.p 
                                                className={`font2 leading-relaxed mb-4 transition-all duration-300 ${
                                                    isMiddle ? "text-gray-600 text-sm md:text-base" : "text-transparent text-xs md:text-sm"
                                                }`}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: isMiddle ? 1 : 0, y: 0 }}
                                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                            >
                                                {item.description}
                                            </motion.p>

                                            {/* Explore Button */}
                                            <motion.div
                                                className={`transition-all duration-300 ${
                                                    isMiddle ? "opacity-100" : "opacity-0"
                                                }`}
                                                initial={{ opacity: 0, y: 15 }}
                                                whileInView={{ opacity: isMiddle ? 1 : 0, y: 0 }}
                                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                                            >
                                                <Link href={`/destinations/${item.destination}`}>
                                                    <motion.button
                                                        className="font2 bg-[#52392F] hover:bg-[#4A322A] text-white px-6 py-2.5 text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-opacity-50"
                                                        whileHover={{ 
                                                            y: -2,
                                                            scale: 1.05,
                                                            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                                                        }}
                                                        whileTap={{ 
                                                            scale: 0.95,
                                                            transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
                                                        }}
                                                    >
                                                        Explore {item.location}
                                                    </motion.button>
                                                </Link>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </motion.div>
            </section>
        </>
    );
};

export default CitiesGallery;
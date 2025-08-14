'use client';

import Image from "next/image";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import image
import royal_img from "@/public/assets/royal_palace_img.jpg"


// Gallery data
const galleryItems = [
    {
        id: 1,
        title: "KUANG SI WATERFALL",
        subtitle: "Natural Wonder",
        location: "Luang Prabang",
        description: "A stunning multi-tier waterfall with turquoise pools, perfect for swimming and relaxation in nature.",
        image: royal_img,
        placeholder: "bg-blue-200"
    },
    {
        id: 2,
        title: "ROYAL PALACE MUSEUM",
        subtitle: "IN LUANG PRABANG",
        location: "Sofitel Luang Prabang",
        description: "An enjoyable stroll from Sofitel Luang Prabang brings you to a fascinating display of Laos history and culture, the Royal Palace and Museum.",
        image: royal_img,
        placeholder: "bg-amber-200"
    },
    {
        id: 3,
        title: "TRADITIONAL VILLAGE",
        subtitle: "Cultural Experience",
        location: "Luang Prabang",
        description: "Experience authentic Lao village life and traditional crafts in the countryside surrounding Luang Prabang.",
                image: royal_img,

        placeholder: "bg-green-200"
    },
    {
        id: 4,
        title: "WAT XIENG THONG",
        subtitle: "Sacred Temple",
        location: "Luang Prabang",
        description: "The most important monastery in Luang Prabang, showcasing classic Lao architecture and Buddhist art.",
                image: royal_img,

        placeholder: "bg-orange-200"
    },
    {
        id: 5,
        title: "NIGHT MARKET",
        subtitle: "Local Shopping",
        location: "Luang Prabang",
        description: "Browse handmade textiles, crafts, and local delicacies at the vibrant night market on Sisavangvong Road.",
                image: royal_img,

        placeholder: "bg-purple-200"
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
    const swiperRef = useRef(null);

    const handleCardClick = (slideIndex) => {
        if (!swiperRef.current) return;
        swiperRef.current.swiper.slideToLoop(slideIndex);
    };

    return (
        <section className="min-h-screen bg-yellow-50 py-16 overflow-hidden">
            {/* Header Section */}
            <div className="container mx-auto px-6 mb-16">
                <div className="text-center">
                    <p className="text-gray-500 text-sm mb-4">our gallery</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 tracking-wide">
                        RELAXATION AND LUXURY
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wide">
                        DURING YOUR STAY
                    </h2>
                </div>
            </div>

            {/* Scaled Gallery Swiper */}
            <div className="relative">
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Pagination, Autoplay]}
                    loop={true}
                    centeredSlides={true}
                    navigation={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
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
                                <div
                                    className={`transition-all duration-500 cursor-pointer mx-2 ${
                                        isMiddle
                                            ? "scale-100 opacity-100"
                                            : "scale-75 opacity-60"
                                    }`}
                                    onClick={() => handleCardClick(index)}
                                >
                                    {/* Image Container */}
                                    <div className="relative h-80 lg:h-96  overflow-hidden">
                                        {/* Placeholder background - replace with actual image */}
                                        <div className={`absolute inset-0 ${item.placeholder}`}></div>
                                        {/* Uncomment when you have images */}
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                        
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/40"></div>
                                        
                                        {/* Text Overlay */}
                                        <div className="absolute bottom-6 left-6 text-white">
                                            <h3 className={`font-bold mb-1 transition-all duration-300 ${
                                                isMiddle ? "text-xl md:text-2xl lg:text-3xl" : "text-lg md:text-xl"
                                            }`}>
                                                {item.title}
                                            </h3>
                                            <p className={`opacity-90 transition-all duration-300 ${
                                                isMiddle ? "text-sm md:text-base lg:text-lg" : "text-xs md:text-sm"
                                            }`}>
                                                {item.subtitle}
                                            </p>
                                            <p className={`opacity-75 mt-1 transition-all duration-300 ${
                                                isMiddle ? "text-xs md:text-sm" : "text-xs"
                                            }`}>
                                                {item.location}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className={`p-4 bg-transparent transition-all duration-300 ${
                                        isMiddle ? "opacity-100" : "opacity-0"
                                    }`}>
                                        <p className={`leading-relaxed mb-4 transition-all duration-300 ${
                                            isMiddle ? "text-gray-600 text-sm md:text-base" : "text-transparent text-xs md:text-sm"
                                        }`}>
                                            {item.description}
                                        </p>
                                        
                                        <button className={`font-medium border-b transition-all duration-300 ${
                                            isMiddle 
                                                ? "text-gray-800 border-gray-800 hover:text-gray-600 hover:border-gray-600 text-sm" 
                                                : "text-transparent border-transparent text-xs"
                                        }`}>
                                            Package More
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>

            {/* Custom Swiper Styles */}
            <style jsx global>{`
                .gallery-swiper {
                    width: 100%;
                    height: auto;
                    padding-bottom: 60px;
                    overflow: visible;
                }
                
                .gallery-swiper .swiper-wrapper {
                    align-items: center;
                }
                
                .gallery-swiper .swiper-slide {
                    height: auto;
                    user-select: none;
                    transition: all 0.5s ease;
                }
                
                .gallery-swiper .swiper-button-next,
                .gallery-swiper .swiper-button-prev {
                    color: #92400e;
                    font-weight: bold;
                    width: 40px;
                    height: 40px;
                    margin-top: -20px;
                    z-index: 10;
                }
                
                .gallery-swiper .swiper-button-next:after,
                .gallery-swiper .swiper-button-prev:after {
                    font-size: 20px;
                }
                
                .gallery-swiper .swiper-button-next {
                    right: 20px;
                }
                
                .gallery-swiper .swiper-button-prev {
                    left: 20px;
                }
                
                .gallery-swiper .swiper-pagination {
                    bottom: 20px;
                    text-align: center;
                }
                
                .gallery-swiper .swiper-pagination-bullet {
                    background: #d1d5db;
                    opacity: 1;
                    width: 10px;
                    height: 10px;
                    margin: 0 4px;
                    transition: all 0.3s ease;
                }
                
                .gallery-swiper .swiper-pagination-bullet-active {
                    background: #92400e;
                    transform: scale(1.2);
                }
                
                @media (max-width: 768px) {
                    .gallery-swiper .swiper-button-next {
                        right: 10px;
                    }
                    
                    .gallery-swiper .swiper-button-prev {
                        left: 10px;
                    }
                }
            `}</style>
        </section>
    );
};

export default CitiesGallery;
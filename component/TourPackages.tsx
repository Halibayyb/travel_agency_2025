'use client';
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building2, Mountain, Leaf, Star, Clock, Users, Camera } from "lucide-react";

// Import animations
import { animations } from '@/src/lib/animations';

// import image
import lpb_bg from "@/public/assets/lpb_view.jpg"

const packageData = [
    {
        id: 1,
        title: "BASIC",
        subtitle: "The Luang Prabang Immersion",
        label: "(Normal)",
        price: "$815",
        duration: "3-4 DAYS / 2-3 NIGHTS",
        description: "Ultimate introduction to Luang Prabang's culture and spirituality",
        features: [
            "Ultimate introduction to Luang Prabang's culture and spirituality",
            "Ideal for first-time visitors seeking tranquility", 
            "Includes: All guided activities, transfers, entrance fees"
        ],
        priceNote: "FOR 1-2 PEOPLE",
        bgColor: "bg-white/90",
        textColor: "text-gray-800",
        buttonStyle: "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
    },
    {
        id: 2,
        title: "STANDARD",
        subtitle: "Luang Prabang & Northern Whispers",
        label: "(Most Popular)",
        price: "$1,120",
        duration: "4-5 DAYS / 3-4 NIGHTS", 
        description: "Perfect balance of cultural immersion and natural splendor",
        features: [
            "Luang Prabang + Nong Khiaw's dramatic landscapes",
            "Village life along Nam Ou River + gentle trekking",
            "Includes: All guided activities, transfers, entrance fees"
        ],
        priceNote: "FOR 1-2 PEOPLE",
        bgColor: "bg-amber-900/95",
        textColor: "text-white",
        buttonStyle: "border-white text-white hover:bg-white hover:text-amber-900",
        isPopular: true
    },
    {
        id: 3,
        title: "PREMIUM",
        subtitle: "Laos Heart & Travel Soul",
        label: "(Comprehensive)",
        price: "$815",
        duration: "6-7 DAYS / 5-6 NIGHTS",
        description: "Complete overview of culture, nature, and city life",
        features: [
            "Three main highlights: Luang Prabang + Vang Vieng + Vientiane",
            "Complete overview of culture, nature, and city life",
            "Includes: All guided activities, transfers, entrance fees"
        ],
        priceNote: "FOR 1-2 PEOPLE",
        bgColor: "bg-white/90",
        textColor: "text-gray-800",
        buttonStyle: "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
    }
];

const additionalPackages = [
    {
        id: 4,
        title: "CULTURE & NATURE",
        subtitle: "KUANG SI WATERFALL + HMONG VILLAGE",
        description: "Perfect balance of cultural immersion and natural splendor. Explore Luang Prabang's iconic sites early in the morning, then venture to the spectacular turquoise pools of Kuang Si Waterfall.",
        features: [
            "Morning city tour (Royal Palace Museum, Wat Xieng Thong)",
            "Kuang Si Waterfall swimming & hiking",
            "Authentic Hmong village cultural experience",
            "Lao Buffalo Dairy farm visit"
        ],
        bgColor: "bg-white/90",
        textColor: "text-gray-800",
        buttonStyle: "bg-amber-900 text-white hover:bg-amber-800"
    },
    {
        id: 5,
        title: "RIVER & CAVES",
        subtitle: "PAK OU CAVES + MEKONG RIVER CRUISE",
        description: "Tranquil river-focused experience connecting spiritual heritage with serene Mekong life. A peaceful boat journey to ancient caves filled with thousands of Buddha statues.",
        features: [
            "Guided heritage city tour of key temples",
            "Private traditional slow-boat cruise",
            "Sacred Pak Ou Caves exploration",
            "Riverside village life observation"
        ],
        bgColor: "bg-amber-900/95",
        textColor: "text-white",
        buttonStyle: "bg-white text-amber-900 hover:bg-gray-100"
    }
];

const TourPackages = () => {
    const [activeTab, setActiveTab] = useState('quick-escape');

    return(
        <section id="service" className="relative min-h-screen py-12 md:py-20 px-4 overflow-hidden">
            {/* Enhanced Background */}
            <div className="absolute inset-0">
                <Image
                    src={lpb_bg} 
                    alt="Luang Prabang Background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/40 via-yellow-200/30 to-amber-100/40"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div 
                    {...animations.fadeInUp}
                    className="text-center mb-8 md:mb-12 lg:mb-16 px-4"
                >
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-amber-900 mb-4 tracking-[0.1em] md:tracking-[0.2em]">
                        PACKAGE TRAVEL
                    </h1>
                    <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                        the essence of Laos culture and nature in unforgettable day journeys
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div 
                    {...animations.fadeInUp}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center mb-8 md:mb-12 px-4"
                >
                    <div className="flex bg-white/20 backdrop-blur-sm rounded-none w-full max-w-md">
                        <button 
                            onClick={() => setActiveTab('quick-escape')}
                            className={`flex-1 px-4 md:px-8 py-3 font-light tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm transition-colors ${
                                activeTab === 'quick-escape' 
                                    ? 'bg-amber-900 text-white' 
                                    : 'bg-white/80 text-gray-700 hover:bg-white/90'
                            }`}
                        >
                            QUICK ESCAPE
                        </button>
                        <button 
                            onClick={() => setActiveTab('day-adventures')}
                            className={`flex-1 px-4 md:px-8 py-3 font-light tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm transition-colors ${
                                activeTab === 'day-adventures' 
                                    ? 'bg-amber-900 text-white' 
                                    : 'bg-white/80 text-gray-700 hover:bg-white/90'
                            }`}
                        >
                            DAY ADVENTURES
                        </button>
                    </div>
                </motion.div>

                {/* Package Content with Smooth Transitions */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        {/* Quick Escape Packages */}
                        {activeTab === 'quick-escape' && (
                            <motion.div
                                key="quick-escape"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}


                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 max-w-6xl mx-auto px-4 pt-5"
                            >
                                {packageData.map((pkg, index) => (
                                    <motion.div 
                                        key={pkg.id}
                                        {...animations.fadeInUp}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}

                                        className={`${pkg.bgColor} ${pkg.textColor} p-6 md:p-8 shadow-2xl backdrop-blur-sm border border-white/20 relative overflow-hidden transition-all duration-300 hover:shadow-3xl transform hover:scale-105 h-[450px] xl:h-[600px] flex flex-col ${
                                            pkg.isPopular ? 'md:scale-105 md:-translate-y-4' : ''
                                        }`}
                                    >
                                        {/* Package Header */}
                                        <div className="text-center mb-6 md:mb-8">
                                            <h3 className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.2em] md:tracking-[0.3em] mb-2">
                                                {pkg.title}
                                            </h3>
                                            <p className="text-xs md:text-sm font-medium mb-1">
                                                {pkg.subtitle}
                                            </p>
                                            <p className="text-xs opacity-80 mb-4 md:mb-6">
                                                {pkg.label}
                                            </p>
                                            <div className="text-xs md:text-sm font-light tracking-wider">
                                                DURATION: {pkg.duration}
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div className="mb-6 md:mb-8 space-y-2 md:space-y-3 flex-grow">
                                            {pkg.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start">
                                                    <div className="w-2 h-2 bg-current rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                    <span className="text-xs md:text-sm leading-relaxed font-light">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Price */}
                                        <div className="text-center mb-6 md:mb-8 mt-auto">
                                            <div className="text-3xl md:text-4xl font-light mb-2">{pkg.price}</div>
                                            <div className="text-xs opacity-80 tracking-wider">{pkg.priceNote}</div>
                                        </div>

                                        {/* Book Now Button */}
                                        <button className={`w-full py-3 md:py-4 px-4 md:px-6 border-2 transition-all duration-300 tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm font-light mt-auto ${pkg.buttonStyle}`}>
                                            BOOK NOW
                                        </button>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* Day Adventures Packages */}
                        {activeTab === 'day-adventures' && (
                            <motion.div
                                key="day-adventures"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 max-w-5xl mx-auto px-4"
                            >
                                {additionalPackages.map((pkg, index) => (
                                    <motion.div 
                                        key={pkg.id}
                                        {...animations.fadeInUp}
                                        
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}

                                        className={`${pkg.bgColor} ${pkg.textColor} p-6 md:p-8 shadow-2xl backdrop-blur-sm border border-white/20 relative overflow-hidden transition-all duration-300 hover:shadow-3xl transform hover:scale-105 h-[480px] xl:h-[600px] flex flex-col`}
                                    >
                                        {/* Package Header */}
                                        <div className="mb-4 md:mb-6">
                                            <h3 className="text-xl md:text-2xl font-light tracking-[0.15em] md:tracking-[0.2em] mb-2">
                                                {pkg.title}
                                            </h3>
                                            <p className="text-xs md:text-sm font-medium mb-3 md:mb-4 opacity-90">
                                                {pkg.subtitle}
                                            </p>
                                            <p className="text-xs md:text-sm leading-relaxed font-light mb-4 md:mb-6">
                                                {pkg.description}
                                            </p>
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-2 md:space-y-3 flex-grow">
                                            {pkg.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start">
                                                    <div className="w-2 h-2 bg-current rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                    <span className="text-xs md:text-sm leading-relaxed font-light">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Book Now Button */}
                                        <div className="mt-auto pt-4">
                                            <button className={`w-full py-3 md:py-4 px-4 md:px-6 transition-all duration-300 tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm font-light ${pkg.buttonStyle}`}>
                                                BOOK NOW
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Not Sure? Ask Expert Button */}
                <motion.div 
                    {...animations.fadeInUp}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center"
                >
                    <p className="text-gray-600 text-lg mb-6 font-light">
                        Not sure which package is right for you?
                    </p>
                    <button className="px-12 py-4 bg-amber-600 text-white hover:bg-transparent border-2 border-amber-600 hover:text-amber-600 transition-all duration-300 tracking-[0.15em] text-sm font-light hover:shadow-lg rounded-none">
                        ASK OUR EXPERT
                    </button>
                </motion.div>
            </div>
        </section>
    )
}

export default TourPackages;
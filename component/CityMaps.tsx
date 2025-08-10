'use client';

import Image from "next/image";

// You'll import these images yourself
// import palaceImage from "@/public/assets/palace.jpg";
// import templeImage from "@/public/assets/temple.jpg";
// import waterfallImage from "@/public/assets/waterfall.jpg";
// import marketImage from "@/public/assets/market.jpg";
import palaceImg from "@/public/assets/royal_palace_img.jpg"
import mapBackground from "@/public/assets/city_map.png"  // Add your map image here

const mapLocations = [
    {
        id: 1,
        title: "Luang Prabang\nRoyal Palace",
        description: "An enjoyable stroll from Sofitel Luang\nPrabang brings you to a fascinating",
        image: palaceImg,
        placeholder: "bg-amber-200",
        side: "left"
    },
    {
        id: 2,
        title: "Wat Xieng Thong",
        description: "An enjoyable stroll from Sofitel Luang\nPrabang brings you to",
        image: palaceImg,
        placeholder: "bg-orange-200",
        side: "right"
    },
    {
        id: 3,
        title: "Kuang Si Falls",
        description: "An enjoyable stroll from Sofitel Luang\nPrabang brings you to",
        image: palaceImg,
        placeholder: "bg-blue-200",
        side: "left"
    },
    {
        id: 4,
        title: "Night Market",
        description: "An enjoyable stroll from Sofitel Luang\nPrabang brings you to",
        image: palaceImg,
        placeholder: "bg-purple-200",
        side: "right"
    }
];

const CityMaps = () => {
    return (
        <section className="min-h-screen py-16 relative overflow-hidden">
            {/* Background Map */}
            <div className="absolute inset-0">
                <Image
                    src={mapBackground}
                    alt="Luang Prabang Map"
                    fill
                    priority
                    className="object-cover"
                />
                {/* Semi-transparent overlay for better text readability */}
                <div className="absolute inset-0 b bg-opacity-20"></div>
            </div>

            {/* Header */}
            <div className="text-center mb-16 relative z-10">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 tracking-wider">
                    RELAXATION AND LUXURY
                </h1>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-wider">
                    DURING YOUR STAY
                </h2>
            </div>

            {/* Vertical Timeline */}
            <div className="relative max-w-2xl mx-auto px-6 z-10">
                {/* Central vertical line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-amber-600 transform -translate-x-1/2"></div>

                {/* Timeline items */}
                <div className="space-y-3">
                    {mapLocations.map((location, index) => (
                        <div key={location.id} className="relative">
                            {/* Central dot */}
                            <div className="absolute left-1/2 w-3 h-3 bg-amber-600 rounded-full transform -translate-x-1/2 z-10"></div>

                            {location.side === "left" ? (
                                // Left side layout
                                <div className="flex justify-center">
                                    <div className="w-1/2 pr-8">
                                        {/* Empty space on left */}
                                    </div>
                                    
                                    <div className="w-1/2 pl-16">
                                        {/* Polaroid on right side of center */}
                                        <div className="inline-block cursor-pointer transform rotate-3 hover:rotate-0 transition-all duration-300 hover:scale-105">
                                            <div className="bg-white p-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                                 style={{ width: '150px' }}>
                                                
                                                {/* Photo */}
                                                <div className={`relative w-full h-28 ${location.placeholder} mb-3 overflow-hidden`}>
                                                    <Image
                                                        src={location.image}
                                                        alt={location.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    
                                                    {/* Tape effect */}
                                                    <div className="absolute -top-1 left-3 w-6 h-3 bg-yellow-200/70 transform -rotate-12"></div>
                                                    <div className="absolute -top-1 right-4 w-5 h-3 bg-yellow-200/70 transform rotate-12"></div>
                                                </div>
                                                
                                                {/* Handwritten Title */}
                                                <div className="text-center">
                                                    <p className="text-xs font-handwriting text-gray-700 leading-tight whitespace-pre-line">
                                                        {location.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Content below polaroid */}
                                        <div className="mt-6 max-w-xs">
                                            <h3 className="text-lg font-bold text-gray-800 mb-3 tracking-wide">
                                                RELAXATION
                                            </h3>
                                            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                                {location.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Right side layout
                                <div className="flex justify-center">
                                    <div className="w-1/2 pr-16">
                                        {/* Polaroid on left side of center */}
                                        <div className="inline-block cursor-pointer transform -rotate-2 hover:rotate-0 transition-all duration-300 hover:scale-105 float-right">
                                            <div className="bg-white p-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                                 style={{ width: '200px' }}>
                                                
                                                {/* Photo */}
                                                <div className={`relative w-full h-28 ${location.placeholder} mb-3 overflow-hidden`}>
                                                    <Image
                                                        src={location.image}
                                                        alt={location.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    
                                                    {/* Tape effect */}
                                                    <div className="absolute -top-1 left-3 w-6 h-3 bg-yellow-200/70 transform -rotate-12"></div>
                                                    <div className="absolute -top-1 right-4 w-5 h-3 bg-yellow-200/70 transform rotate-12"></div>
                                                </div>
                                                
                                                {/* Handwritten Title */}
                                                <div className="text-center">
                                                    <p className="text-xs font-handwriting text-gray-700 leading-tight whitespace-pre-line">
                                                        {location.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Content below polaroid */}
                                        <div className="mt-6 max-w-xs float-right text-right">
                                            <h3 className="text-lg font-bold text-gray-800 mb-3 tracking-wide">
                                                RELAXATION
                                            </h3>
                                            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                                {location.description}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="w-1/2 pl-8">
                                        {/* Empty space on right */}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx global>{`
                .font-handwriting {
                    font-family: 'Kalam', 'Comic Sans MS', cursive;
                    font-weight: 400;
                }
                
                @media (max-width: 768px) {
                    .space-y-24 > * + * {
                        margin-top: 4rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default CityMaps;
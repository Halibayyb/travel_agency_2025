'use client';
import Image from "next/image";
import { MapPin, Building2, Mountain } from "lucide-react";

// import image
import lpb_bg from "@/public/assets/lpb_view.jpg"

const packageData = [
    {
        id: 1,
        title: "LUANG PRABANG",
        price: "$20",
        duration: "1-2 DAY",
        description: "Luang Prabang brings you to a fascinating display of Laos",
        features: [
            "Perfect for growing businesses",
            "Perfect for growing businesses", 
            "Perfect for growing businesses",
            "Perfect for growing businesses"
        ],
        isPopular: false,
        bgColor: "bg-white",
        textColor: "text-gray-800",
        icon: MapPin
    },
    {
        id: 2,
        title: "VIENTIANE",
        price: "$50",
        duration: "1-2 DAY", 
        description: "Luang Prabang brings you to a fascinating display of Laos",
        features: [
            "Perfect for growing businesses",
            "Perfect for growing businesses",
            "Perfect for growing businesses", 
            "Perfect for growing businesses"
        ],
        isPopular: true,
        bgColor: "bg-amber-900",
        textColor: "text-white",
        icon: Building2
    },
    {
        id: 3,
        title: "VANG VIENG",
        price: "$20",
        duration: "1-2 DAY",
        description: "Luang Prabang brings you to a fascinating display of Laos", 
        features: [
            "Perfect for growing businesses",
            "Perfect for growing businesses",
            "Perfect for growing businesses",
            "Perfect for growing businesses"
        ],
        isPopular: false,
        bgColor: "bg-white",
        textColor: "text-gray-800",
        icon: Mountain
    }
];

const TourPackages = () => {
    return(
        <section className="relative min-h-screen py-8 md:py-16 px-4">
            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src={lpb_bg} 
                    alt="Luang Prabang Background"
                    fill
                    className="object-cover"
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-yellow-200/20 md:bg-yellow-200/20"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 md:mb-16">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-amber-800 mb-4 md:mb-6 tracking-widest px-2">
                        TRAVEL RECOMMENDATION
                    </h1>
                    <p className="text-sm md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed px-4">
                        An enjoyable stroll from Sofitel Luang Prabang brings you to a fascinating display of Laos
                    </p>
                </div>

                {/* Package Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {packageData.map((pkg) => {
                        const IconComponent = pkg.icon;
                        return (
                            <div 
                                key={pkg.id}
                                className={`${pkg.bgColor} ${pkg.textColor} p-10 md:p-6 lg:p-8 shadow-xl transition-transform duration-300 hover:scale-105 ${
                                    pkg.isPopular ? 'md:transform md:scale-105' : ''
                                } mx-2 md:mx-0`}
                            >
                                {/* Package Title with Icon */}
                                <div className="mb-4 md:mb-6">
                                    <div className="flex items-center mb-3 md:mb-4">
                                        <IconComponent 
                                            size={24} 
                                            className={`mr-2 md:mr-3 ${pkg.textColor} sm:w-6 sm:h-6 md:w-7 md:h-7`}
                                        />
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-light tracking-widest">
                                            {pkg.title}
                                        </h3>
                                    </div>
                                    <p className="text-xs md:text-sm opacity-90 leading-relaxed">
                                        {pkg.description}
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="mb-6 md:mb-8 space-y-2 md:space-y-4">
                                    {pkg.features.map((feature, index) => (
                                        <div key={index} className="flex items-start">
                                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-current rounded-full mt-1.5 md:mt-2 mr-3 md:mr-4 flex-shrink-0"></div>
                                            <span className="text-xs md:text-sm leading-relaxed">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Price */}
                                <div className="mb-6 md:mb-8">
                                    <div className="flex items-baseline">
                                        <span className="text-lg md:text-xl font-light">{pkg.price}</span>
                                        <span className="ml-3 md:ml-4 text-xs md:text-sm opacity-80 tracking-wider">
                                            {pkg.duration}
                                        </span>
                                    </div>
                                </div>

                                {/* Book Now Button */}
                                <button className={`w-full py-3 md:py-4 px-4 md:px-6 border-2 transition-colors duration-300 tracking-widest text-xs md:text-sm font-light ${
                                    pkg.isPopular 
                                        ? 'border-white text-white bg-transparent hover:bg-white hover:text-amber-900' 
                                        : 'border-gray-800 text-gray-800 bg-transparent hover:bg-gray-800 hover:text-white'
                                }`}>
                                    BOOK NOW
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default TourPackages;
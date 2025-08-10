'use client';

import Image from "next/image";

// You'll import these images yourself
import aboutImage from "@/public/assets/lpb_temple_1.jpg";
// import aboutImage2 from "@/public/assets/lpb_temple_2.jpg";
// import ownerImage from "@/public/assets/owner-kham.jpg";

const AboutPage = () => {
    return (
        <section className="min-h-screen bg-gray-50 px:6 xl:px-30">
            {/* Header Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-wider">
                        KHAMTRAVEL
                    </h1>
                </div>

                {/* Main Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                    {/* Left Side - Decorative Rectangles */}
                    <div className="relative h-80">
                        {/* Top cream/beige rectangle */}
                        <div className="absolute top-0 left-0 w-50 h-48 bg-yellow-100 rounded-lg"></div>
                        
                        {/* Bottom brown rectangle */}
                        <div className="absolute bottom-0 left-0 w-32 h-24 bg-amber-800 rounded-lg"></div>
                    </div>

                    {/* Right Side - Image with Content Overlay */}
                    <div className="relative h-80">
                        {/* Background Image */}
                        <div className="relative h-full w-full">
                            <Image
                                src={aboutImage}
                                alt="Laos landscape"
                                fill
                                className="object-cover rounded-lg"
                            />
                            
                            {/* Overlay for better text readability */}
                            <div className="absolute inset-0 bg-black/20"></div>
                            
                            {/* Content Over Image */}
                            <div className="absolute inset-0 flex items-center justify-center p-6">
                                <div className="text-start space-y-4">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                        "DISCOVER YOUR JOURNEY TO LAOS"
                                    </h2>
                                    
                                    <p className="text-white/90 leading-relaxed text-sm md:text-base">
                                        For over <strong>25 years</strong>, Kham Soulivong has been more than a guide: he has 
                                        been a bridge to the true soul of Laos. His passion for his homeland, coupled 
                                        with an unparalleled understanding of its history, culture, and nature, allows 
                                        him to share Laos not just as a destination, but as a living experience.
                                    </p>

                                    <button className="bg-white/20 border border-white/30 text-white px-6 py-2 hover:bg-white/30 font-medium text-sm">
                                        More About
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Owner Section */}
                <div className="text-center mb-16">
                    <div className="relative inline-block mb-8">
                        {/* Decorative line */}
                        <div className="absolute right-0 top-1/2 w-20 h-px bg-amber-600"></div>
                        <div className="absolute right-0 top-1/2 w-2 h-2 bg-amber-600 rounded-full"></div>
                        
                        <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">OWNER</p>
                        
                        {/* Owner Image */}
                        <div className="relative w-48 h-48 mx-auto mb-6">
                            <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                            {/* Replace with your actual owner image */}
                            {/* <Image
                                src={ownerImage}
                                alt="Kham Soulivong"
                                fill
                                className="object-cover rounded-full"
                            /> */}
                        </div>

                        {/* Decorative line */}
                        <div className="absolute left-0 bottom-20 w-20 h-px bg-amber-600"></div>
                        <div className="absolute left-0 bottom-20 w-2 h-2 bg-amber-600 rounded-full"></div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        KHAM SOULIVONG
                    </h3>
                    <p className="text-gray-600 italic">
                        "Our Expertise, With Over Two Decades of Unveiling Laos"
                    </p>
                </div>

                {/* Statistics Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-2">
                        <div className="text-4xl md:text-5xl font-bold text-amber-600">42+</div>
                        <p className="text-gray-600 text-sm">Years Experience</p>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="text-4xl md:text-5xl font-bold text-amber-600">122+</div>
                        <p className="text-gray-600 text-sm">Stories nationwide</p>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="text-4xl md:text-5xl font-bold text-amber-600">99%</div>
                        <p className="text-gray-600 text-sm">Positive Reviews</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;
'use client';

const HeroSection = () => {
    return (
        <section id="home" className="relative min-h-screen">
            {/* Background Video with parallax effect */}
            <div className="absolute inset-0">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    {/* Fallback for browsers that don't support the video format */}
                    <source src="video/lpb_video_2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="text-center px-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl fcolor2 mb-4 tracking-wider font-light">
                        TRAVEL AT LUANG PRABANG
                    </h1>
                </div>
            </div>

            {/* Animated Scroll indicator - Simple Tailwind Version */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex flex-col items-center text-white/70 animate-bounce">
                    <span className="text-sm mb-2 tracking-wider">SCROLL</span>
                    {/* Arrow pointing down */}
                    <div className="mt-2">
                        <svg 
                            className="w-4 h-4 text-white/70" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
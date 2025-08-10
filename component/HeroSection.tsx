'use client';




const HeroSection = () => {


    return (
        <section className="relative min-h-screen">
            {/* Background Video with parallax effect */}
            <div 
                className="absolute inset-0"
        
            >
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    {/* Fallback for browsers that don't support the video format */}
                    <source src="video/lpb_video_1.mp4" type="video/mp4" />

                    Your browser does not support the video tag.
                </video>
                
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="text-center px-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-wider">
                        TRAVEL AT LUANG PRABANG
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                        Discover the ancient beauty and cultural heritage of Luang Prabang
                    </p>
                    
                    {/* Optional CTA Button */}
                    <button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full hover:bg-white/20 transition-all duration-300 text-lg font-medium">
                        Explore Now
                    </button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex flex-col items-center text-white/70">
                    <span className="text-sm mb-2 tracking-wider">SCROLL</span>
                    <div className="w-px h-8 bg-white/50"></div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// You'll import these images yourself
import aboutImage from "@/public/assets/lpb_temple_1.jpg";
import khamtravel from "@/public/assets/khamtravel_img.jpg";
// import aboutImage2 from "@/public/assets/lpb_temple_2.jpg";
// import ownerImage from "@/public/assets/owner-kham.jpg";

const AboutPage = () => {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2
      }
    }
  };

  const staggerChild = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 sm:px-6 xl:px-30 pt-16 sm:pt-20">
      {/* Header Section */}
      <motion.div 
        className="text-center mb-10 px-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <motion.div 
          className="flex items-center justify-center mb-4 sm:mb-6"
          variants={scaleIn}
        >
          <div className="w-8 sm:w-12 lg:w-16 h-px bg-[#8C614F]"></div>
          <div className="mx-2 sm:mx-4 w-2 h-2 bg-[#8C614F] rounded-full"></div>
          <div className="w-8 sm:w-12 lg:w-16 h-px bg-[#8C614F]"></div>
        </motion.div>
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#52392F] mb-4 tracking-wider"
          variants={fadeInUp}
        >
          OUR STORY
        </motion.h2>
        <motion.p 
          className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
          variants={fadeInUp}
        >
          From humble beginnings to becoming Laos' most trusted travel companion
        </motion.p>
      </motion.div>
     
      <div className="container mx-auto py-8 sm:py-16">
        {/* Main Content Section */}
        <motion.div 
          className="mb-12 sm:mb-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          {/* Content Section - Full Width */}
          <div className="relative h-80 sm:h-96 md:h-[500px] xl:overflow-hidden xl:shadow-2xl">
            {/* Background Image */}

            {/* Custom Gradient Overlay with Brand Colors */}
            <div className="hidden xl:block absolute inset-0 bg-gradient-to-br from-[#52392F]/80 via-[#8C614F]/60 to-[#1A1820]/70"></div>

            {/* Content Over Image */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center">
                  {/* Owner Image Section */}
                  <motion.div 
                    className="flex flex-col items-center xl:items-center"
                    variants={fadeInLeft}
                  >
                    <motion.div 
                      className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 xl:w-70 xl:h-70 mb-3 sm:mb-4 md:mb-6"
                      variants={scaleIn}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <Image
                        src={khamtravel}
                        alt="Kham Soulivong"
                        fill
                        className="object-cover rounded-full shadow-xl"
                      />
                    </motion.div>
                    <motion.h3 
                      className="text-2xl xl:text-3xl font-bold text-black xl:text-white mb-2 text-center lg:text-left"
                      variants={fadeInUp}
                    >
                      KHAM SOULIVONG
                    </motion.h3>
                  </motion.div>

                  {/* Text Content Section */}
                  <motion.div 
                    className="text-center lg:text-left space-y-3 sm:space-y-4 md:space-y-6"
                    variants={fadeInRight}
                  >
                    <motion.h2 
                      className="text-sm xl:text-5xl font-bold text-black xl:text-white leading-tight"
                      variants={fadeInUp}
                    >
                      "DISCOVER YOUR JOURNEY TO LAOS"
                    </motion.h2>

                    <motion.p 
                      className="text-black xl:text-white leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg"
                      variants={fadeInUp}
                    >
                      For over <strong>25 years</strong>, Kham Soulivong has
                      been more than a guide: he has been a bridge to the true
                      soul of Laos. His passion for his homeland, coupled with
                      an unparalleled understanding of its history, culture, and
                      nature, allows him to share Laos not just as a
                      destination, but as a living experience.
                    </motion.p>

                    <motion.div 
                      className="pt-2 sm:pt-3 md:pt-4"
                      variants={fadeInUp}
                    >
                      <motion.button 
                        className="hidden xl:block bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2 md:py-3 hover:bg-white/30 transition-all duration-300 font-medium text-xs sm:text-sm md:text-base shadow-lg"
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
          </div>
        </motion.div>

        {/* Statistics Section */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center max-w-4xl mx-auto px-4 sm:px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div className="space-y-2" variants={staggerChild}>
            <motion.div 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-600"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              42+
            </motion.div>
            <p className="text-gray-600 text-xs sm:text-sm">Years Experience</p>
          </motion.div>

          <motion.div className="space-y-2" variants={staggerChild}>
            <motion.div 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-600"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              122+
            </motion.div>
            <p className="text-gray-600 text-xs sm:text-sm">Stories nationwide</p>
          </motion.div>

          <motion.div className="space-y-2" variants={staggerChild}>
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
          className="pt-12 sm:pt-20 text-center px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <motion.p 
            className="text-gray-600 italic text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            "Our Expertise, With Over Two Decades of Unveiling Laos"
          </motion.p>
        </motion.div>

        {/* Establishment & Story Section */}
        <motion.div 
          className="pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Story Timeline */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center mb-8 sm:mb-16">
              {/* Left - Establishment */}
              <motion.div 
                className="space-y-4 sm:space-y-6"
                variants={fadeInLeft}
              >
                <motion.div 
                  className="flex flex-col sm:flex-row sm:items-center mb-4"
                  variants={scaleIn}
                >
                  <motion.div 
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-[#8C614F] rounded-full flex items-center justify-center mb-2 sm:mb-0 sm:mr-4 mx-auto sm:mx-0"
                    whileHover={{ scale: 1.05, rotate: 15 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <span className="text-white font-bold text-sm sm:text-base">
                      2010
                    </span>
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#52392F] text-center sm:text-left">
                    THE BEGINNING
                  </h3>
                </motion.div>
                <motion.p 
                  className="text-gray-700 leading-relaxed text-sm sm:text-base text-center sm:text-left"
                  variants={fadeInUp}
                >
                  What truly sets Kham apart is his unwavering commitment to
                  authentic, enriching experiences. He believes that to truly
                  know Luang Prabang is to delve beyond the visible, to unveil
                  its unseen heart.
                </motion.p>
                <motion.div 
                  className="flex justify-center items-center space-x-6 text-xs sm:text-sm text-gray-600"
                  variants={staggerContainer}
                >
                  <motion.div className="flex items-center" variants={staggerChild}>
                    <div className="w-2 h-2 bg-[#8C614F] rounded-full mr-2"></div>
                    <span>Est. 2010</span>
                  </motion.div>
                  <motion.div className="flex items-center" variants={staggerChild}>
                    <div className="w-2 h-2 bg-[#8C614F] rounded-full mr-2"></div>
                    <span>Luang Prabang</span>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right - Mission */}
              <motion.div 
                className="space-y-4 sm:space-y-6"
                variants={fadeInRight}
              >
                {/* Icon + Title */}
                <motion.div 
                  className="flex flex-col sm:flex-row sm:items-center mb-4"
                  variants={scaleIn}
                >
                  <motion.div 
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-[#52392F] rounded-full flex items-center justify-center mb-2 sm:mb-0 sm:mr-4 mx-auto sm:mx-0"
                    whileHover={{ scale: 1.05, rotate: -15 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <span className="text-white font-bold text-sm sm:text-base">
                      2025
                    </span>
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#52392F] text-center sm:text-left">
                    TODAY
                  </h3>
                </motion.div>

                {/* Paragraph */}
                <motion.p 
                  className="text-gray-700 leading-relaxed text-sm sm:text-base text-center sm:text-left"
                  variants={fadeInUp}
                >
                  Today, KhamTravel stands as a beacon of authentic Lao
                  hospitality, connecting travelers with the soul of Southeast
                  Asia. We've guided thousands through ancient temples, pristine
                  waterfalls, and vibrant local communities.
                </motion.p>

                {/* Tags */}
                <motion.div 
                  className="flex justify-center sm:justify-start items-center space-x-6 text-xs sm:text-sm text-gray-600"
                  variants={staggerContainer}
                >
                  <motion.div className="flex items-center" variants={staggerChild}>
                    <div className="w-2 h-2 bg-[#52392F] rounded-full mr-2"></div>
                    <span>Heritage Tours</span>
                  </motion.div>
                  <motion.div className="flex items-center" variants={staggerChild}>
                    <div className="w-2 h-2 bg-[#52392F] rounded-full mr-2"></div>
                    <span>Eco-Tourism</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPage;
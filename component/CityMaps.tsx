"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

// You'll import these images yourself
// import palaceImage from "@/public/assets/palace.jpg";
// import templeImage from "@/public/assets/temple.jpg";
// import waterfallImage from "@/public/assets/waterfall.jpg";
// import marketImage from "@/public/assets/market.jpg";
import mapBackground from "@/public/assets/city_map.png"; // Add your map image here
// import marketImage from "@/public/assets/market.jpg";
import lpbImg from "@/public/assets/royal_palace_img.jpg";
import nkImg from "@/public/assets/nong_khiaw.jpg";
import vvImg from "@/public/assets/vang_vieng.jpg";
import vteImg from "@/public/assets/vientiane.jpg";

const mapLocations = [
  {
    id: 1,
    title: "Luang Prabang\nRoyal Palace",
    destination: "luang-prabang",
    description:
      "An enjoyable stroll from Sofitel Luang\nPrabang brings you to a fascinating",
    image: lpbImg,
    placeholder: "bg-amber-200",
    side: "left",
  },
  {
    id: 2,
    title: "Nong Khiaw\nLocal village",
    destination: "nong-khiaw",
    description:
      "An enjoyable stroll from Sofitel Luang\nPrabang brings you to",
    image: nkImg,
    placeholder: "bg-orange-200",
    side: "right",
  },
  {
    id: 3,
    title: "Vang vieng\ncity of nature",
    destination: "vang-vieng",
    description:
      "An enjoyable stroll from Sofitel Luang\nPrabang brings you to",
    image: vvImg,
    placeholder: "bg-blue-200",
    side: "left",
  },
  {
    id: 4,
    title: "Vientiane\nheart of Laos",
    destination: "vientiane",
    description:
      "An enjoyable stroll from Sofitel Luang\nPrabang brings you to",
    image: vteImg,
    placeholder: "bg-purple-200",
    side: "right",
  },
];

const CityMaps = () => {
  // Slower, more gentle animation variants for polaroids
  const fadeInUp = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { 
      duration: 3.2, // Increased from 1.8
      type: "tween",
      ease: "easeOut"
    },
  };

  const slideInLeft = {
    initial: { opacity: 0, x: -15 },
    animate: { opacity: 1, x: 0 },
    transition: { 
      duration: 2.8, // Increased from 1.6
      type: "tween", 
      ease: "easeOut"
    },
  };

  const slideInRight = {
    initial: { opacity: 0, x: 15 },
    animate: { opacity: 1, x: 0 },
    transition: { 
      duration: 2.8, // Increased from 1.6
      type: "tween",
      ease: "easeOut"
    },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.4, // Increased from 0.2 for slower stagger
      },
    },
  };

  // Gentle hover animations
  const gentleHover = {
    scale: 1.02
  };

  const subtleRotateHover = {
    rotate: 0,
    scale: 1.02
  };

  return (
    <section
      id="city"
      className="min-h-screen py-8 md:py-16 relative overflow-hidden"
    >
      {/* Background Map */}
      <div className="absolute inset-0 bg-white">
        <Image
          src={mapBackground}
          alt="Luang Prabang Map"
          fill
          priority
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 "></div>
      </div>

      {/* Header */}
      <motion.div
        className="text-center mb-8 md:mb-16 relative z-10 px-4"

      >
        <motion.p
          className="font2 text-gray-500 text-lg mb-4"

        >
          our cities
        </motion.p>
        <motion.h1
          className="font1 text-3xl md:text-4xl font-bold text-gray-800 mb-2 tracking-wide"

        >
          FULL OF AMBITION
        </motion.h1>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto px-4 md:px-6 z-10">
        {/* Mobile Timeline */}
        <motion.div
          className="block md:hidden relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Mobile vertical line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px bg-[#8C614F] transform -translate-x-1/2"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 2.5, type: "tween", ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          ></motion.div>

          <div className="space-y-12">
            {mapLocations.map((location, index) => (
              <motion.div
                key={location.id}
                className="relative"
                variants={fadeInUp}
                custom={index}
              >
                {/* Mobile Central dot */}
                <motion.div
                  className="absolute left-1/2 w-3 h-3 bg-[#8C614F] transform -translate-x-1/2 z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 2.4, // Increased from 1.2
                    delay: index * 0.6, // Increased from 0.3
                    type: "tween",
                    ease: "easeOut"
                  }}
                ></motion.div>

                {/* Mobile Polaroid */}
                <div className="flex">
                  {location.side === "left" ? (
                    <>
                      <motion.div
                        className="w-1/2 pr-4 flex justify-end items-start"
                        variants={fadeInUp}
                      >
                        <div className="w-32 text-right">
                          <p className="font2 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            {location.description}
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        className="w-1/2 pl-4"
                        variants={fadeInUp}
                      >
                        <Link
                          href={`/destinations/${location.destination}`}
                          className="inline-block"
                        >
                          <motion.div
                            className="cursor-pointer transform -rotate-8"
                            whileHover={subtleRotateHover}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 1.2, type: "tween", ease: "easeOut" }} // Increased from 0.8
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            animate={{ 
                              transition: { 
                                duration: 3.5, // Slower polaroid fade
                                delay: index * 0.7,
                                type: "tween", 
                                ease: "easeOut" 
                              }
                            }}
                          >
                            <div className="relative w-40 h-48 bg-orange-50 shadow-xl p-3 pb-8 rounded-sm hover:shadow-2xl transition-shadow duration-500">
                              {/* Photo area */}
                              <div className="relative w-full h-28 bg-gray-100 overflow-hidden border border-gray-200 shadow-inner">
                                <Image
                                  src={location.image}
                                  alt={location.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              {/* Tape pieces for left cards */}
                              <div className="absolute -top-1 left-5 w-8 h-3 bg-amber-200 transform -rotate-6 z-10 rounded-sm shadow-md opacity-85"></div>
                              <div className="absolute -top-1 right-4 w-6 h-4 bg-amber-200 transform rotate-12 z-10 rounded-sm shadow-md opacity-90"></div>
                              <div className="absolute top-12 -left-1 w-4 h-6 bg-amber-200 transform rotate-6 z-10 rounded-sm shadow-md opacity-80"></div>

                              {/* Handwritten title */}
                              <div className="absolute bottom-3 left-2 right-2 text-center">
                                <p className="font1 text-sm font-medium text-gray-800 leading-tight transform rotate-1">
                                  {location.title}
                                </p>
                              </div>

                              {/* Aging spots */}
                              <div className="absolute top-6 right-4 w-2 h-2 rounded-full bg-yellow-100 opacity-60"></div>
                              <div className="absolute top-8 left-5 w-1 h-1 rounded-full bg-amber-100 opacity-40"></div>
                              <div className="absolute bottom-10 right-2 w-1 h-1 rounded-full bg-gray-300 opacity-50"></div>

                              {/* Additional aging effects */}
                              <div className="absolute bottom-0 left-0 w-4 h-4 bg-gray-100 transform rotate-45 -translate-y-1 -translate-x-1 opacity-80"></div>
                              <div className="absolute top-6 right-3 w-6 h-3 rounded-full bg-yellow-100 opacity-20 transform rotate-45"></div>
                              <div className="absolute bottom-16 left-6 w-1 h-3 bg-gray-200 opacity-40"></div>
                              <div className="absolute bottom-8 right-3 w-12 h-px bg-gray-200 opacity-40 transform -rotate-12"></div>

                              {/* Hover overlay */}
                              <div className="absolute inset-0 bg-black/10 bg-opacity-0 hover:bg-opacity-100 transition-all duration-500 flex items-center justify-center opacity-0 hover:opacity-100 rounded-sm">
                                <span className="font2 bg-white/30 text-white px-3 py-1 text-xs font-medium">
                                  Explore
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div className="w-1/2 pr-4" variants={fadeInUp}>
                        <Link
                          href={`/destinations/${location.destination}`}
                          className="inline-block float-right"
                        >
                          <motion.div
                            className="cursor-pointer transform rotate-5"
                            whileHover={subtleRotateHover}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 1.2, type: "tween", ease: "easeOut" }} // Increased from 0.8
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            animate={{ 
                              transition: { 
                                duration: 3.5, // Slower polaroid fade
                                delay: index * 0.7,
                                type: "tween", 
                                ease: "easeOut" 
                              }
                            }}
                          >
                            <div className="relative w-40 h-48 bg-yellow-50 shadow-xl p-3 pb-8 rounded-sm hover:shadow-2xl transition-shadow duration-500">
                              {/* Photo area */}
                              <div className="relative w-full h-28 bg-gray-100 overflow-hidden border border-gray-200 shadow-inner">
                                <Image
                                  src={location.image}
                                  alt={location.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              {/* Tape pieces for right cards */}
                              <div className="absolute -top-2 left-4 w-8 h-4 bg-yellow-200 transform -rotate-12 z-10 rounded-sm shadow-md opacity-90"></div>
                              <div className="absolute -top-1 right-5 w-6 h-3 bg-yellow-200 transform rotate-12 z-10 rounded-sm shadow-md opacity-90"></div>

                              {/* Handwritten title */}
                              <div className="absolute bottom-3 left-2 right-2 text-center">
                                <p className="font1 text-sm font-medium text-gray-800 leading-tight transform -rotate-1">
                                  {location.title}
                                </p>
                              </div>

                              {/* Aging spots */}
                              <div className="absolute top-6 right-4 w-2 h-2 rounded-full bg-yellow-100 opacity-60"></div>
                              <div className="absolute top-8 left-5 w-1 h-1 rounded-full bg-amber-100 opacity-40"></div>
                              <div className="absolute bottom-10 right-2 w-1 h-1 rounded-full bg-gray-300 opacity-50"></div>

                              {/* Additional aging effects for right cards */}
                              <div className="absolute top-0 right-0 w-3 h-3 bg-white transform rotate-45 -translate-y-1 translate-x-1 opacity-90"></div>
                              <div className="absolute top-3 left-1 w-10 h-px bg-gray-200 opacity-30 transform rotate-12"></div>
                              <div className="absolute top-4 left-2 w-16 h-px bg-gray-200 opacity-30 transform rotate-12"></div>

                              {/* Hover overlay */}
                              <div className="absolute inset-0 bg-black/10 bg-opacity-0 hover:bg-opacity-100 transition-all duration-500 flex items-center justify-center opacity-0 hover:opacity-100 rounded-sm">
                                <span className="font2  bg-white/30 text-white px-3 py-1  text-xs font-medium">
                                  Explore
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      </motion.div>
                      <motion.div
                        className="w-1/2 pl-4 flex justify-start items-start"
                        variants={fadeInUp}
                      >
                        <div className="w-32 text-left">
                          <p className="font2 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            {location.description}
                          </p>
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Desktop Timeline */}
        <motion.div
          className="hidden md:block"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Central vertical line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px bg-[#8C614F] transform -translate-x-1/2"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 3, type: "tween", ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          ></motion.div>

          {/* Timeline items */}
          <div className="space-y-16 lg:space-y-20">
            {mapLocations.map((location, index) => (
              <motion.div
                key={location.id}
                className="relative"
                variants={fadeInUp}
                custom={index}
              >
                {/* Central dot */}
                <motion.div
                  className="absolute left-1/2 w-3 h-3 bg-[#8C614F] rounded-full transform -translate-x-1/2 z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 2.8, // Increased from 1.5
                    delay: index * 0.8, // Increased from 0.4
                    type: "tween",
                    ease: "easeOut"
                  }}
                ></motion.div>

                {location.side === "right" ? (
                  // Right side layout
                  <div className="flex">
                    <div className="w-1/2 pr-8 lg:pr-12">
                      {/* Empty space on left */}
                    </div>

                    <motion.div
                      className="w-1/2 pl-8 lg:pl-16"
                      variants={fadeInUp}
                    >
                      {/* Polaroid on right side */}
                      <Link
                        href={`/destinations/${location.destination}`}
                        className="inline-block"
                      >
                        <motion.div
                          className="cursor-pointer transform rotate-3 mb-6"
                          whileHover={subtleRotateHover}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 1.2, type: "tween", ease: "easeOut" }} // Increased from 0.8
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          animate={{ 
                            transition: { 
                              duration: 4.0, // Slower polaroid fade for desktop
                              delay: index * 0.8,
                              type: "tween", 
                              ease: "easeOut" 
                            }
                          }}
                        >
                          <div className="relative w-44 lg:w-52 h-52 lg:h-60 bg-yellow-50 shadow-2xl p-3 lg:p-4 pb-8 lg:pb-10 rounded-sm hover:shadow-3xl transition-shadow duration-600">
                            {/* Photo area */}
                            <div className="relative w-full h-32 lg:h-36 bg-gray-100 overflow-hidden border border-gray-200 shadow-inner">
                              <Image
                                src={location.image}
                                alt={location.title}
                                fill
                                className="object-cover"
                              />
                            </div>

                            {/* Tape pieces */}
                            <div className="absolute -top-3 left-4 lg:left-6 w-10 lg:w-12 h-5 lg:h-6 bg-yellow-200 transform -rotate-12 z-10 rounded-sm shadow-md opacity-90"></div>
                            <div className="absolute -top-2 right-6 lg:right-8 w-8 lg:w-10 h-4 lg:h-5 bg-yellow-200 transform rotate-12 z-10 rounded-sm shadow-md opacity-90"></div>

                            {/* Handwritten title */}
                            <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 right-3 lg:right-4 text-center">
                              <p className="font1 text-sm lg:text-base font-medium text-gray-800 leading-tight transform -rotate-1">
                                {location.title}
                              </p>
                            </div>

                            {/* Aging spots */}
                            <div className="absolute top-6 lg:top-8 right-5 lg:right-6 w-2 lg:w-3 h-2 lg:h-3 rounded-full bg-yellow-100 opacity-60"></div>
                            <div className="absolute top-10 lg:top-12 left-6 lg:left-8 w-1 lg:w-2 h-1 lg:h-2 rounded-full bg-amber-100 opacity-40"></div>

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/10 bg-opacity-0 hover:bg-opacity-100 transition-all duration-600 flex items-center justify-center opacity-0 hover:opacity-100 rounded-sm">
                              <span className="font2  bg-white/30 text-white px-4 py-2  text-sm font-medium">
                                Explore
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </Link>

                      {/* Content below polaroid */}
                      <motion.div
                        className="max-w-xs"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.5, delay: 0.6, type: "tween", ease: "easeOut" }} // Increased from 1.5/0.3
                      >
                        <p className="font2 text-xs lg:text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                          {location.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                ) : (
                  // Left side layout
                  <div className="flex">
                    <motion.div
                      className="w-1/2 pr-8 lg:pr-16"
                      variants={fadeInUp}
                    >
                      {/* Polaroid on left side */}
                      <Link
                        href={`/destinations/${location.destination}`}
                        className="inline-block float-right"
                      >
                        <motion.div
                          className="cursor-pointer transform -rotate-2 mb-6"
                          whileHover={subtleRotateHover}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 1.2, type: "tween", ease: "easeOut" }} // Increased from 0.8
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          animate={{ 
                            transition: { 
                              duration: 4.0, // Slower polaroid fade for desktop
                              delay: index * 0.8,
                              type: "tween", 
                              ease: "easeOut" 
                            }
                          }}
                        >
                          <div className="relative w-40 lg:w-48 h-48 lg:h-56 bg-orange-50 shadow-xl p-3 lg:p-5 pb-7 lg:pb-9 rounded-sm hover:shadow-2xl transition-shadow duration-600">
                            {/* Photo area */}
                            <div className="relative w-full h-32 lg:h-36 bg-gray-50 overflow-hidden border border-gray-300 shadow-inner">
                              <Image
                                src={location.image}
                                alt={location.title}
                                fill
                                className="object-cover"
                              />
                            </div>

                            {/* Different tape arrangement */}
                            <div className="absolute -top-2 left-6 lg:left-8 w-12 lg:w-14 h-4 lg:h-5 bg-amber-200 transform -rotate-6 z-10 rounded-sm shadow-md opacity-85"></div>
                            <div className="absolute -top-1 right-4 lg:right-6 w-7 lg:w-9 h-5 lg:h-6 bg-amber-200 transform rotate-12 z-10 rounded-sm shadow-md opacity-90"></div>

                            {/* Handwritten title */}
                            <div className="absolute bottom-2 lg:bottom-3 left-2 lg:left-3 right-2 lg:right-3 text-center">
                              <p className="font1 text-xs lg:text-sm font-semibold text-gray-700 leading-tight transform rotate-1">
                                {location.title}
                              </p>
                            </div>

                            {/* Different aging pattern */}
                            <div className="absolute top-5 lg:top-6 left-3 lg:left-4 w-1 lg:w-2 h-1 lg:h-2 rounded-full bg-amber-200 opacity-50"></div>
                            <div className="absolute top-16 lg:top-20 right-6 lg:right-8 w-3 lg:w-4 h-1 lg:h-2 rounded-full bg-yellow-50 opacity-70"></div>

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/10 bg-opacity-0 hover:bg-opacity-100 transition-all duration-600 flex items-center justify-center opacity-0 hover:opacity-100 rounded-sm">
                              <span className="font2  bg-white/30 text-white px-4 py-2 text-sm font-medium">
                                Explore
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </Link>

                      {/* Content below polaroid */}
                      <motion.div
                        className="max-w-xs float-right text-right clear-right"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.5, delay: 0.6, type: "tween", ease: "easeOut" }} // Increased from 1.5/0.3
                      >
                        <p className="font2 text-xs lg:text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                          {location.description}
                        </p>
                      </motion.div>
                    </motion.div>

                    <div className="w-1/2 pl-8 lg:pl-12">
                      {/* Empty space on right */}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CityMaps;
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Thumbs } from "swiper/modules";
import { X } from "lucide-react";
import { ImageData } from "@/src/lib/lpbConfig";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageData[];
  initialIndex: number;
  title?: string;
}

export default function ImageModal({ isOpen, onClose, images, initialIndex, title }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-30 p-4 md:p-6">
          <div className="flex justify-between items-start">
            {title && (
              <div className="bg-black/70 px-4 py-2 rounded max-w-xs sm:max-w-md md:max-w-lg">
                <h3 className="font1 text-white font-semibold text-base md:text-lg">{title}</h3>
                <p className="font2 text-amber-300 text-sm">{images.length} images</p>
              </div>
            )}
            <button
              onClick={onClose}
              className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3 transition-colors duration-300 flex-shrink-0 ml-4"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Main Image Swiper */}
        <div className="flex-1 flex items-center justify-center p-8 pt-20 md:pt-24">
          <div className="w-full max-w-6xl h-full">
            <Swiper
              modules={[Navigation, Pagination, Keyboard, Thumbs]}
              spaceBetween={30}
              navigation={true}
              pagination={{ clickable: true, dynamicBullets: true }}
              keyboard={{ enabled: true }}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              initialSlide={currentIndex}
              className="h-full modal-swiper destination-swiper"
              onSlideChange={(swiper: any) => setCurrentIndex(swiper.activeIndex)}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                  <div className="relative">
                    <Image src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                    <div className="relative xl:absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="bg-black/70 px-4 py-2 mt-5 xl:mt-0">
                        <p className="font2 text-white text-sm mb-1">{index + 1} / {images.length}</p>
                        <p className="font2 text-white font-medium">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Thumbnail Swiper */}
        <div className="p-4">
          <div className="max-w-4xl mx-auto">
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={Math.min(images.length, 8)}
              freeMode={true}
              watchSlidesProgress={true}
              breakpoints={{
                320: { slidesPerView: Math.min(images.length, 3) },
                640: { slidesPerView: Math.min(images.length, 5) },
                1024: { slidesPerView: Math.min(images.length, 8) },
              }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className="cursor-pointer">
                  <div
                    className={`w-full h-16 rounded overflow-hidden transition-all duration-300 ${
                      index === currentIndex ? "ring-2 ring-amber-400" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import image
import lpb_street from "@/public/assets/lpb_street.jpg";

const reviewsData = [
    {
        id: 1,
        text: "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        name: "Emily Johnson",
        title: "Sales Manager",
        rating: 5,
        image: lpb_street
    },
    {
        id: 2, 
        text: "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        name: "Emily Johnson",
        title: "Sales Manager", 
        rating: 5,
        image: lpb_street
    },
    {
        id: 3,
        text: "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        name: "Emily Johnson", 
        title: "Sales Manager",
        rating: 5,
        image: lpb_street
    },
    {
        id: 4,
        text: "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        name: "Emily Johnson", 
        title: "Sales Manager",
        rating: 5,
        image: lpb_street
    }
];

const LocalReview = () => {
    return(
        <section className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="text-center py-16 px-10">
                <h1 className="text-lg text-gray-600 mb-2 font-light tracking-wider">
                    Review
                </h1>
                <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 tracking-widest">
                    LOCAL REVIEW
                </h2>
                <p className="text-sm xl:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    An enjoyable stroll from Sofitel Luang Prabang brings you to a fascinating display of Laos
                </p>
            </div>

            {/* Image Swiper */}
            <div className="relative w-full h-80 md:h-96 mb-16">
                <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
            prevEl: '.image-swiper-button-prev',
            nextEl: '.image-swiper-button-next',
        }}
        pagination={{
            clickable: true,
            el: '.image-swiper-pagination',
            bulletClass: 'custom-bullet',
            bulletActiveClass: 'custom-bullet-active',
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        }}
        autoplay={{
            delay: 5000,
            disableOnInteraction: false,
        }}
        className="w-full h-full"
    >
        {reviewsData.map((item, index) => (
            <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                    <Image
                        src={item.image}
                        alt={`Luang Prabang street ${index + 1}`}
                        fill
                        className="object-cover"
                    />
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
                
                {/* Custom Navigation Buttons */}
                <button className="image-swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 transition-all duration-300 z-10">
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="image-swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 transition-all duration-300 z-10">
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Custom Pagination */}
                <div className="image-swiper-pagination absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10"></div>
            </div>

            {/* Main Review Text */}
            <div className="text-center px-10  mb-16 max-w-4xl mx-auto">
                <p className="text-gray-700 leading-relaxed text-xs xl:text-lg">
                    simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
                </p>
            </div>

            {/* Review Cards Swiper Section */}
            <div className="bg-white py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="relative">
                        {/* Review Cards Swiper */}
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={32}
                            slidesPerView={1}
                            navigation={{
                                prevEl: '.review-swiper-button-prev',
                                nextEl: '.review-swiper-button-next',
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 24,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 32,
                                },
                            }}
                            className="mb-8"
                        >
                            {reviewsData.map((review) => (
                                <SwiperSlide key={review.id}>
                                    <div className="bg-gray-50 p-6 rounded-lg h-full">
                                        <p className="text-gray-700 text-sm leading-relaxed mb-6">
                                            {review.text}
                                        </p>
                                        
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                                                <Image
                                                    src={review.image}
                                                    alt={review.name}
                                                    width={48}
                                                    height={48}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-800 text-sm">
                                                    {review.name}
                                                </h4>
                                                <p className="text-gray-600 text-xs">
                                                    {review.title}
                                                </p>
                                            </div>
                                            <div className="flex text-yellow-400">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <span key={i} className="text-lg">★</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Review Navigation */}
                        <div className="flex justify-end space-x-2">
                            <button className="review-swiper-button-prev p-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-300">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button className="review-swiper-button-next p-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-300">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Swiper Styles */}
            <style jsx global>{`
                .image-swiper-pagination .swiper-pagination-bullet {
                    width: 12px;
                    height: 12px;
                    background: rgba(255, 255, 255, 0.5);
                    opacity: 1;
                }
                
                .image-swiper-pagination .swiper-pagination-bullet-active {
                    background: white;
                }
                
                .swiper-button-disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>
        </section>
    )
}

export default LocalReview;
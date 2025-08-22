'use client';
import { useState } from "react";
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building2, Mountain, Leaf, Star, Clock, Users, Camera, Phone, Mail, ChevronDown, X } from "lucide-react";
import { countries } from "countries-list";
import { packageData, additionalPackages, Package } from "@/src/lib/tourPackageData";

// Import animation
import { animations, stagger } from '@/src/lib/animations';

// import image
import lpb_bg from "@/public/assets/lpb_view.jpg";

// Types
interface ContactFormProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPackage: string;
}

interface FormData {
    name: string;
    country: string;
    email: string;
    packageInterest: string;
    message: string;
}

interface CountryOption {
    code: string;
    name: string;
}

// Contact Form Component
const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose, selectedPackage }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        country: '',
        email: '',
        packageInterest: '',
        message: ''
    });

    const [isCountryOpen, setIsCountryOpen] = useState<boolean>(false);

    // Update packageInterest when selectedPackage changes
    React.useEffect(() => {
        if (selectedPackage) {
            setFormData(prev => ({
                ...prev,
                packageInterest: selectedPackage
            }));
        }
    }, [selectedPackage]);

    // Convert countries object to array for dropdown
    const countryOptions: CountryOption[] = [
        { code: 'prefer-not', name: 'Prefer not to say' },
        ...Object.entries(countries).map(([code, country]) => ({
            code,
            name: country.name
        })).sort((a, b) => a.name.localeCompare(b.name))
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCountrySelect = (countryName: string) => {
        setFormData(prev => ({
            ...prev,
            country: countryName
        }));
        setIsCountryOpen(false);
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gray-50 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Header */}
                <div className="text-center py-8 px-8">
                    <h1 className="text-xl xl:text-3xl font-light text-gray-800 tracking-widest font1">
                        BOOK YOUR PACKAGE
                    </h1>
                </div>

                <div className="px-8">
                    <div className="space-y-8">
                        {/* Name */}
                        <div>
                            <label className="block text-gray-600 text-sm font2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#52392F] transition-colors duration-300 font2"
                                placeholder=""
                                required
                            />
                        </div>

                        {/* Country Dropdown */}
                        <div className="relative">
                            <label className="block text-gray-600 text-sm font2">
                                Country
                            </label>
                            <div 
                                className="w-full border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-gray-800 cursor-pointer focus-within:border-[#52392F] transition-colors duration-300 flex items-center justify-between font2"
                                onClick={() => setIsCountryOpen(!isCountryOpen)}
                            >
                                <span className={formData.country ? "text-gray-800" : "text-gray-500"}>
                                    {formData.country || "Select a country"}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isCountryOpen ? 'rotate-180' : ''}`} />
                            </div>
                            
                            {isCountryOpen && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                    {countryOptions.map((country) => (
                                        <div
                                            key={country.code}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-800 text-sm font2"
                                            onClick={() => handleCountrySelect(country.name)}
                                        >
                                            {country.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-600 text-sm font2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#52392F] transition-colors duration-300 font2"
                                placeholder=""
                                required
                            />
                        </div>

                        {/* Package Interest */}
                        <div>
                            <label className="block text-gray-600 text-sm font2">
                                Package of Interest
                            </label>
                            <input
                                type="text"
                                name="packageInterest"
                                value={formData.packageInterest}
                                onChange={handleInputChange}
                                className="w-full border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#52392F] transition-colors duration-300 font2"
                                placeholder=""
                                readOnly
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-gray-600 text-sm mb-3 font2">
                                Your Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#52392F] transition-colors duration-300 resize-none font2"
                                placeholder="Tell us about your travel preferences, special requirements, or any questions you have..."
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pb-5">
                            <button
                                onClick={handleSubmit}
                                className="bg-[#52392F] hover:bg-[#4A322A] text-white px-12 py-4 tracking-widest text-sm font-light transition-colors duration-300 font2"
                            >
                                SEND INQUIRY
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const TourPackages: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('quick-escape');
    const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
    const [selectedPackage, setSelectedPackage] = useState<string>('');
    


    const handleBookNow = (packageTitle: string, packageSubtitle: string) => {
        setSelectedPackage(`${packageTitle} - ${packageSubtitle}`);
        setIsContactOpen(true);
    };

    return(
        <section id="service" className="relative min-h-screen py-12 md:py-20 px-4 overflow-hidden">
            {/* Enhanced Background */}
            <div className="absolute inset-0">
                <Image
                    src={lpb_bg} 
                    alt="Luang Prabang Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/40 via-yellow-200/30 to-amber-100/40"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div 
                    {...animations.fadeIn}
                    className="text-center mb-8 md:mb-12 lg:mb-16 px-4"
                >
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-[#52392F] mb-4 tracking-[0.1em] md:tracking-[0.2em] font1">
                        PACKAGE TRAVEL
                    </h1>
                    <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-light font2">
                        the essence of Laos culture and nature in unforgettable day journeys
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div 
                    {...animations.fadeIn}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center mb-8 md:mb-12 px-4"
                >
                    <div className="flex bg-white/20 backdrop-blur-sm rounded-none w-full max-w-md">
                        <button 
                            onClick={() => setActiveTab('quick-escape')}
                            className={`flex-1 px-4 md:px-8 py-3 font-light tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm transition-colors font2 ${
                                activeTab === 'quick-escape' 
                                    ? 'bg-[#52392F] text-white' 
                                    : 'bg-white/80 text-gray-700 hover:bg-white/90'
                            }`}
                        >
                            QUICK ESCAPE
                        </button>
                        <button 
                            onClick={() => setActiveTab('day-adventures')}
                            className={`flex-1 px-4 md:px-8 py-3 font-light tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm transition-colors font2 ${
                                activeTab === 'day-adventures' 
                                    ? 'bg-[#52392F] text-white' 
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
                                        {...animations.fadeIn}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className={`${pkg.bgColor} ${pkg.textColor} p-6 md:p-8 shadow-2xl backdrop-blur-sm border border-white/20 relative overflow-hidden transition-all duration-300 hover:shadow-3xl transform hover:scale-105 h-[500px] xl:h-[600px] flex flex-col ${
                                            pkg.isPopular ? 'md:scale-105 md:-translate-y-4' : ''
                                        }`}
                                    >
                                        {/* Package Header */}
                                        <div className="text-center mb-6 md:mb-8">
                                            <h3 className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.2em] md:tracking-[0.3em] mb-2 font1">
                                                {pkg.title}
                                            </h3>
                                            <p className="text-xs md:text-sm font-medium mb-1 font2">
                                                {pkg.subtitle}
                                            </p>
                                            <p className="text-xs opacity-80 mb-4 md:mb-6 font2">
                                                {pkg.label}
                                            </p>
                                            <div className="text-xs md:text-sm font-light tracking-wider font2">
                                                DURATION: {pkg.duration}
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div className="mb-6 md:mb-8 space-y-2 md:space-y-3 flex-grow">
                                            {pkg.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start">
                                                    <div className="w-2 h-2 bg-current rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                    <span className="text-xs md:text-sm leading-relaxed font-light font2">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Price */}
                                        <div className="text-center mb-6 md:mb-8 mt-auto">
                                            <div className="text-xl xl:text-2xl font-light mb-2 font2">{pkg.price}</div>
                                            <div className="text-xs opacity-80 tracking-wider font2">{pkg.priceNote}</div>
                                        </div>

                                        {/* Book Now Button */}
                                        <button 
                                            onClick={() => handleBookNow(pkg.title, pkg.subtitle)}
                                            className={`w-full py-3 md:py-4 px-4 md:px-6 border-2 transition-all duration-300 tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm font-light mt-auto font2 ${pkg.buttonStyle}`}
                                        >
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
                                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 max-w-5xl mx-auto px-4"
                            >
                                {additionalPackages.map((pkg, index) => (
                                    <motion.div 
                                        key={pkg.id}
                                        {...animations.fadeIn}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className={`${pkg.bgColor} ${pkg.textColor} p-6 md:p-8 shadow-2xl backdrop-blur-sm border border-white/20 relative overflow-hidden transition-all duration-300 hover:shadow-3xl transform hover:scale-105 flex flex-col min-h-[500px] xl:min-h-[600px]`}
                                    >
                                        {/* Package Header */}
                                        <div className="mb-4">
                                            <h3 className="text-lg md:text-xl xl:text-2xl font-light tracking-[0.15em] md:tracking-[0.2em] mb-2 font1">
                                                {pkg.title}
                                            </h3>
                                            <p className="text-xs md:text-sm font-medium mb-2 md:mb-3 opacity-90 font2">
                                                {pkg.subtitle}
                                            </p>
                                            <p className="text-xs leading-relaxed font-light mb-3 md:mb-4 font2 opacity-80">
                                                {pkg.description}
                                            </p>
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-2 flex-grow">
                                            {pkg.features.map((feature, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className="flex items-start"
                                                >
                                                    <div className="w-1.5 h-1.5 bg-current rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                    <span className="text-xs leading-relaxed font-light font2">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Book Now Button */}
                                        <div className="mt-4 pt-3 border-t border-current/10">
                                            <motion.button 
                                                onClick={() => handleBookNow(pkg.title, pkg.subtitle)}
                                                className={`w-full py-3 px-4 md:px-6 transition-all duration-300 tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm font-light font2 ${pkg.buttonStyle}`}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                BOOK NOW
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Not Sure? Ask Expert Button */}
                <motion.div 
                    {...animations.fadeIn}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center"
                >
                    <p className="text-gray-600 text-lg mb-6 font-light font2">
                        Not sure which package is right for you?
                    </p>
                    <button 
                        onClick={() => {
                            const contactSection = document.getElementById('contact');
                            if (contactSection) {
                                contactSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="px-12 py-4 bg-[#52392F] text-white hover:bg-transparent border-2 border-[#52392F] hover:text-[#52392F] transition-all duration-300 tracking-[0.15em] text-sm font-light hover:shadow-lg rounded-none font2"
                    >
                        ASK OUR EXPERT
                    </button>
                </motion.div>
            </div>

            {/* Contact Form Popup */}
            <AnimatePresence>
                <ContactForm 
                    isOpen={isContactOpen}
                    onClose={() => setIsContactOpen(false)}
                    selectedPackage={selectedPackage}
                />
            </AnimatePresence>
        </section>
    )
}

export default TourPackages;
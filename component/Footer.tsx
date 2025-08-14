'use client';
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-amber-900 text-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-12">
                    <h1 className="text-2xl md:text-3xl font-light tracking-widest mb-4">
                        KHAMTRAVEL
                    </h1>
                    <p className="text-sm text-amber-100 max-w-md leading-relaxed">
                        An enjoyable stroll from Sofitel Luang Prabang brings you to a fascinating display of Laos
                    </p>
                </div>

                {/* Divider Line */}
                <div className="w-full h-px bg-amber-700 mb-16"></div>

                {/* Footer Content Grid - Contact Info (hidden on small screens, shown on xl+) */}
                <div className="hidden xl:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Call Us */}
                    <div>
                        <h3 className="text-sm font-medium mb-4 tracking-wide">
                            Call us
                        </h3>
                        <p className="text-amber-100 text-sm">
                            +856 20 xx xxx xxx
                        </p>
                    </div>

                    {/* Email */}
                    <div>
                        <h3 className="text-sm font-medium mb-4 tracking-wide">
                            Email
                        </h3>
                        <p className="text-amber-100 text-sm">
                            Laungprabang@gmail.com
                        </p>
                    </div>

                    {/* Address */}
                    <div>
                        <h3 className="text-sm font-medium mb-4 tracking-wide">
                            Address
                        </h3>
                        <p className="text-amber-100 text-sm leading-relaxed">
                            An enjoyable stroll from Sofitel Luang Prabang brings you to a
                        </p>
                    </div>

                    {/* Follow - Desktop version */}
                    <div>
                        <h3 className="text-sm font-medium mb-4 tracking-wide">
                            Follow
                        </h3>
                        <div className="flex space-x-4">
                            <a 
                                href="#" 
                                className="w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5 text-white" />
                            </a>
                            <a 
                                href="#" 
                                className="w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5 text-white" />
                            </a>
                            <a 
                                href="#" 
                                className="w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5 text-white" />
                            </a>
                            <a 
                                href="#" 
                                className="w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="YouTube"
                            >
                                <Youtube className="w-5 h-5 text-white" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Follow Section - Mobile/Tablet version (visible on small screens, hidden on xl+) */}
                <div className="xl:hidden mb-12">
                    <h3 className="text-sm font-medium mb-4 tracking-wide text-center">
                        Follow
                    </h3>
                    <div className="flex justify-center space-x-4">
                        <a 
                            href="#" 
                            className="w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            aria-label="Facebook"
                        >
                            <Facebook className="w-5 h-5 text-white" />
                        </a>
                        <a 
                            href="#" 
                            className="w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            aria-label="Twitter"
                        >
                            <Twitter className="w-5 h-5 text-white" />
                        </a>
                        <a 
                            href="#" 
                            className="w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-5 h-5 text-white" />
                        </a>
                        <a 
                            href="#" 
                            className="w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            aria-label="YouTube"
                        >
                            <Youtube className="w-5 h-5 text-white" />
                        </a>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-amber-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Copyright Text */}
                        <div className="text-center md:text-left">
                            <p className="text-amber-100 text-sm">
                                © {currentYear} KhamTravel. All rights reserved.
                            </p>
                        </div>

                        {/* Legal Links */}
                        <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                            <a 
                                href="#" 
                                className="text-amber-100 hover:text-white transition-colors duration-300"
                            >
                                Privacy Policy
                            </a>
                            <a 
                                href="#" 
                                className="text-amber-100 hover:text-white transition-colors duration-300"
                            >
                                Terms of Service
                            </a>
                            <a 
                                href="#" 
                                className="text-amber-100 hover:text-white transition-colors duration-300"
                            >
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
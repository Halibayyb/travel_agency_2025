'use client';

import { useEffect, useState } from "react";

// Navigation items constant
const NAV_ITEMS = [
    { label: 'HOME', href: '#' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SERVICE', href: '#service' },
    { label: 'CONTACT', href: '#contact' }
] as const;

// Custom hook for scroll position
const useScrollPosition = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollY;
};

const Navbar = () => {
    const scrollY = useScrollPosition();
    
    // Check if user has scrolled past the initial viewport
    const isScrolled = scrollY > 50;

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ease-out ${
                isScrolled 
                    ? 'bg-transparent' 
                    : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-30 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo/Brand */}
                    <div>
                        <h1 className={`text-xl font-bold tracking-wider transition-colors duration-300 ${
                            isScrolled ? 'text-white' : 'text-white'
                        }`}>
                            KHAMTRAVEL
                        </h1>
                    </div>
                    
                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        {NAV_ITEMS.map((item) => (
                            <a 
                                key={item.label}
                                href={item.href} 
                                className={`transition-colors duration-300 ${
                                    isScrolled 
                                        ? 'text-gray-700 hover:text-gray-900' 
                                        : 'text-white hover:text-gray-300'
                                }`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button className={`transition-colors duration-300 ${
                            isScrolled ? 'text-gray-800' : 'text-white'
                        }`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
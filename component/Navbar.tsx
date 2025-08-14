'use client';

import React, { useEffect, useState, useRef } from "react";

// Navigation items constant
const NAV_ITEMS = [
    { id: 'home', label: 'HOME', href: '#', sectionId: null },
    { id: 'about', label: 'ABOUT', href: '#about', sectionId: 'about' },
    { id: 'service', label: 'SERVICE', href: '#service', sectionId: 'service' },
    { id: 'contact', label: 'CONTACT', href: '#contact', sectionId: 'contact' }
] as const;

type NavItem = typeof NAV_ITEMS[number];

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const navbarRef = useRef<HTMLDivElement>(null);
    
    // Check if user has scrolled past the initial viewport
    const isScrolled = scrollY > 700;

    // Function to detect which section is currently visible
    const detectActiveSection = () => {
        const scrollPosition = window.scrollY + 200; // Offset for navbar height

        // Check if we're at the very top (home section)
        if (window.scrollY < 100) {
            setActiveSection('home');
            return;
        }

        // Check each section from bottom to top
        for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
            const navItem = NAV_ITEMS[i];
            if (navItem.sectionId) {
                const element = document.getElementById(navItem.sectionId);
                if (element) {
                    const elementTop = element.offsetTop;
                    const elementBottom = elementTop + element.offsetHeight;

                    // Check if the scroll position is within this section
                    if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                        setActiveSection(navItem.id);
                        return;
                    }
                }
            }
        }
    };

    // Handle scroll events
    useEffect(() => {
        const handleScroll = () => {
            // Close mobile menu when scrolling
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }

            // Detect active section
            detectActiveSection();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial detection
        detectActiveSection();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMenuOpen]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (
                isMenuOpen &&
                navbarRef.current &&
                !navbarRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Close menu when pressing Escape key
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isMenuOpen]);

    // Handle navigation
    const handleNavigation = (navItem: NavItem) => {
        setActiveSection(navItem.id);
        setIsMenuOpen(false); // Always close menu when navigating

        if (navItem.id === 'home') {
            // Scroll to top for home
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (navItem.sectionId) {
            // Scroll to section
            const element = document.getElementById(navItem.sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div
            ref={navbarRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
                isMenuOpen || isScrolled 
                    ? 'bg-white shadow-sm' 
                    : 'bg-transparent'
            }`}
        >
            <div className={`container mx-auto transition-all duration-300 ${
                isMenuOpen ? 'border-b border-gray-200 py-4 mx-4' : 'px-6 md:px-30 py-4'
            } ${isScrolled ? ' py-4 mx-4' : ''}`}>
                <div className="flex items-center justify-between">
                    {/* Logo/Brand */}
                    <div>
                        <button
                            onClick={() => handleNavigation(NAV_ITEMS[0])}
                            className={`text-xl font-bold tracking-wider transition-colors duration-300 cursor-pointer ${
                                isMenuOpen || isScrolled ? 'text-gray-800' : 'text-white'
                            }`}
                        >
                            KHAMTRAVEL
                        </button>
                    </div>
                    
                    {/* Navigation Links - Desktop */}
                    <nav className="hidden md:flex space-x-8">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item)}
                                className={`relative transition-colors duration-300 ${
                                    isMenuOpen || isScrolled 
                                        ? 'text-gray-700 hover:text-gray-900' 
                                        : 'text-white hover:text-gray-300'
                                } ${
                                    activeSection === item.id 
                                        ? 'font-bold ' 
                                        : ''
                                }`}
                            >
                                {item.label}
                                {/* Active underline animation */}
                                <span 
                                    className={`absolute bottom-0 left-0 w-full h-[1px] bg-current transform transition-transform duration-300 ${
                                        activeSection === item.id 
                                            ? 'scale-x-100' 
                                            : 'scale-x-0'
                                    }`}
                                />
                            </button>
                        ))}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`transition-colors duration-300 p-2 ${
                                isMenuOpen || isScrolled ? 'text-gray-800' : 'text-white'
                            }`}
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMenuOpen}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <ul className="space-y-4">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleNavigation(item)}
                                        className={`block w-full text-left py-2 px-4 rounded-md transition-colors duration-200 ${
                                            activeSection === item.id
                                                ? 'text-gray-900 bg-gray-100 font-semibold text-xl'
                                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 text-lg'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
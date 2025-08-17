'use client';

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';

// Types for navigation items
interface SubItem {
    id: string;
    label: string;
    destination: string;
}

interface NavItem {
    id: string;
    label: string;
    href: string;
    sectionId: string | null;
    hasDropdown?: boolean;
    subItems?: SubItem[];
}

// Navigation items constant
const NAV_ITEMS: NavItem[] = [
    { id: 'home', label: 'HOME', href: '#', sectionId: null },
    { id: 'about', label: 'ABOUT', href: '#about', sectionId: 'about' },
    { id: 'gallery', label: 'GALLERY', href: '#gallery', sectionId: 'gallery' },
    { 
        id: 'city', 
        label: 'CITY', 
        href: '#city', 
        sectionId: 'city',
        hasDropdown: true,
        subItems: [
            { id: 'luang-prabang', label: 'LUANG PRABANG', destination: 'luang-prabang' },
            { id: 'nong-khiaw', label: 'NONG KHIAW', destination: 'nong-khiaw' },
            { id: 'vang-vieng', label: 'VANG VIENG', destination: 'vang-vieng' },
            { id: 'vientiane', label: 'VIENTIANE', destination: 'vientiane' }
        ]
    },
    { id: 'service', label: 'SERVICE', href: '#service', sectionId: 'service' },
    { id: 'contact', label: 'CONTACT', href: '#contact', sectionId: 'contact' }
];

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
    const router = useRouter();
    const scrollY = useScrollPosition();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const navbarRef = useRef<HTMLDivElement>(null);
    
    const [isLandingPage, setIsLandingPage] = useState(false);
    
    useEffect(() => {
        const checkPath = () => {
            const path = window.location.pathname;
            // If "/" use white colors, if not use dark colors
            setIsLandingPage(path === '/');
            
            // Set active section based on current path
            if (path === '/') {
                // On landing page, detect section by scroll
                detectActiveSection();
            } else if (path.startsWith('/destinations/')) {
                // On destination pages, set city as active
                setActiveSection('city');
            } else {
                // On other pages, set home as active
                setActiveSection('home');
            }
        };

        // Check initial path
        checkPath();

        // Listen for route changes (for client-side navigation)
        const handlePopState = () => {
            checkPath();
        };

        window.addEventListener('popstate', handlePopState);

        // For SPA navigation, you might also need to check periodically
        // or use your router's navigation events if available
        const intervalId = setInterval(checkPath, 100);

        return () => {
            window.removeEventListener('popstate', handlePopState);
            clearInterval(intervalId);
        };
    }, []);

    // Modify your existing isScrolled logic
    const isScrolled = scrollY > 700 || !isLandingPage;

    // Function to detect which section is currently visible
    const detectActiveSection = () => {
        const scrollPosition = window.scrollY + 100; // Reduced offset for better detection

        // Check if we're at the very top (home section)
        if (window.scrollY < 50) {
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

            // Only detect active section on landing page
            if (window.location.pathname === '/') {
                detectActiveSection();
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

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
        setIsCityDropdownOpen(false); // Close city dropdown
        // Clear any pending timeout
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }

        if (navItem.id === 'home') {
            // Navigate to home page
            if (window.location.pathname !== '/') {
                router.push('/');
            } else {
                // If already on home page, scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else if (navItem.sectionId) {
            // If not on home page, navigate to home first
            if (window.location.pathname !== '/') {
                router.push('/#' + navItem.sectionId);
            } else {
                // If on home page, scroll to section with navbar offset
                const element = document.getElementById(navItem.sectionId);
                if (element) {
                    const navbarHeight = 80; // Approximate navbar height
                    const elementPosition = element.offsetTop - navbarHeight;
                    window.scrollTo({ 
                        top: elementPosition, 
                        behavior: 'smooth' 
                    });
                }
            }
        }
    };

    // Handle city dropdown navigation
    const handleCityNavigation = (destination: string) => {
        setIsMenuOpen(false);
        setIsCityDropdownOpen(false);
        // Clear any pending timeout
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        router.push(`/destinations/${destination}`);
    };

    // Handle dropdown hover
    const handleDropdownEnter = () => {
        // Clear any pending timeout
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setIsCityDropdownOpen(true);
    };

    const handleDropdownLeave = () => {
        // Set timeout to close dropdown after 1 second
        dropdownTimeoutRef.current = setTimeout(() => {
            setIsCityDropdownOpen(false);
        }, 1000);
    };

    return (
        <div
            ref={navbarRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
                isMenuOpen || isScrolled 
                    ? 'bg-white shadow-lg backdrop-blur-lg' 
                    : 'bg-transparent'
            }`}
        >
            <div className={`container mx-auto transition-all duration-300 ${
                isMenuOpen ? 'border-b border-gray-200 py-4 mx-4' : ' py-4'
            } ${isScrolled ? ' py-4 px-0 xl:px-20' : ''}`}>
                <div className="flex items-center justify-between px-10 xl:px-5">
                    {/* Logo/Brand */}
                    <div>
                        <button
                            onClick={() => handleNavigation(NAV_ITEMS[0])}
                            className={`text-xl font-bold tracking-wider transition-colors duration-300 cursor-pointer ${
                                isMenuOpen || isScrolled 
                                    ? 'text-gray-800' 
                                    : isLandingPage 
                                        ? 'text-white' 
                                        : 'text-gray-800'
                            }`}
                        >
                            LOGO
                        </button>
                    </div>
                    
                    {/* Navigation Links - Desktop */}
                    <nav className="hidden md:flex space-x-8 s">
                        {NAV_ITEMS.map((item) => (
                            <div key={item.id} className="relative">
                                {item.hasDropdown ? (
                                    // City dropdown
                                    <div
                                        className="relative"
                                        onMouseEnter={handleDropdownEnter}
                                        onMouseLeave={handleDropdownLeave}
                                    >
                                        <button
                                            onClick={() => handleNavigation(item)}
                                            className={`relative text-sm transition-colors duration-300 ${
                                                isMenuOpen || isScrolled 
                                                    ? 'text-gray-700 hover:text-gray-900' 
                                                    : isLandingPage
                                                        ? 'text-white hover:text-gray-300'
                                                        : 'text-gray-700 hover:text-gray-900'
                                            } ${
                                                activeSection === item.id 
                                                    ? 'font-bold text-[#52392F]' 
                                                    : ''
                                            }`}
                                        >
                                            <span className="flex items-center">
    {item.label} 
    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
        isCityDropdownOpen ? 'rotate-180' : ''
    }`} />
</span>
                                            {/* Active underline animation */}
                                            <span 
                                                className={`absolute bottom-0 left-0 h-[1px] w-[30%] bg-current transform transition-transform duration-300 ${
                                                    activeSection === item.id 
                                                        ? 'scale-x-100' 
                                                        : 'scale-x-0'
                                                }`}
                                            />
                                        </button>
                                        
                                        {/* Dropdown menu */}
                                        {isCityDropdownOpen && (
                                            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                                                {item.subItems?.map((subItem) => (
                                                    <button
                                                        key={subItem.id}
                                                        onClick={() => handleCityNavigation(subItem.destination)}
                                                        className="block w-full text-left py-3 px-4 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                                                    >
                                                        {subItem.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    // Regular nav item
                                    <button
                                        onClick={() => handleNavigation(item)}
                                        className={`relative text-sm transition-colors duration-300 ${
                                            isMenuOpen || isScrolled 
                                                ? 'text-gray-700 hover:text-gray-900' 
                                                : isLandingPage
                                                    ? 'text-white hover:text-gray-300'
                                                    : 'text-gray-700 hover:text-gray-900'
                                        } ${
                                            activeSection === item.id 
                                                ? 'font-bold text-[#52392F]' 
                                                : ''
                                        }`}
                                    >
                                        {item.label}
                                        {/* Active underline animation */}
                                        <span 
                                            className={`absolute bottom-0 left-0 h-[1px] w-[30%] bg-current transform transition-transform duration-300 ${
                                                activeSection === item.id 
                                                    ? 'scale-x-100' 
                                                    : 'scale-x-0'
                                            }`}
                                        />
                                    </button>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`transition-colors duration-300 p-2 ${
                                isMenuOpen || isScrolled 
                                    ? 'text-gray-800' 
                                    : isLandingPage
                                        ? 'text-white'
                                        : 'text-gray-800'
                            }`}
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 px-10 ">
                        <ul className="space-y-4">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.id}>
                                    {item.hasDropdown ? (
                                        // City dropdown for mobile
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <button
                                                    onClick={() => handleNavigation(item)}
                                                    className={`relative flex-1 text-left py-2  px-4 rounded-md transition-colors duration-200 text-sm ${
                                                        activeSection === item.id
                                                            ? 'text-[#52392F] font-bold'
                                                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {item.label}
                                                    {/* Active underline animation for mobile */}
                                                    <span 
                                                        className={`absolute bottom-0 left-4 h-[1px] w-[30%] bg-current transform transition-transform duration-300 ${
                                                            activeSection === item.id 
                                                                ? 'scale-x-100' 
                                                                : 'scale-x-0'
                                                        }`}
                                                    />
                                                </button>
                                                
                                                {/* Separate dropdown button */}
                                                <button
                                                    onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                                                    className="p-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 text-base"
                                                >
                                                    <ChevronDown 
                                                        className={`w-4 h-4 transition-transform duration-200 ${
                                                            isCityDropdownOpen ? 'rotate-180' : ''
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                            
                                            {/* Mobile city submenu */}
                                            {isCityDropdownOpen && (
                                                <div className="ml-4 mt-2 space-y-2">
                                                    {item.subItems?.map((subItem) => (
                                                        <button
                                                            key={subItem.id}
                                                            onClick={() => handleCityNavigation(subItem.destination)}
                                                            className="block w-full text-left py-2 px-4 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 text-sm"
                                                        >
                                                            {subItem.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        // Regular mobile nav item
                                        <button
                                            onClick={() => handleNavigation(item)}
                                            className={`relative block w-full text-left py-2 px-4 rounded-md transition-colors duration-200 text-sm ${
                                                activeSection === item.id
                                                    ? 'text-[#52392F] font-bold'
                                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                            }`}
                                        >
                                            {item.label}
                                            {/* Active underline animation for mobile */}
                                            <span 
                                                className={`absolute bottom-0 left-4 h-[1px] w-[30%] bg-current transform transition-transform duration-300 ${
                                                    activeSection === item.id 
                                                        ? 'scale-x-100' 
                                                        : 'scale-x-0'
                                                }`}
                                            />
                                        </button>
                                    )}
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
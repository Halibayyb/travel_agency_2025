// src/lib/tourPackageData.ts

export interface Package {
    id: number;
    title: string;
    subtitle: string;
    label?: string;
    price?: string;
    duration?: string;
    description: string;
    features: string[];
    priceNote?: string;
    bgColor: string;
    textColor: string;
    buttonStyle: string;
    isPopular?: boolean;
}

export const packageData: Package[] = [
    {
        id: 1,
        title: "BASIC",
        subtitle: "The Luang Prabang Immersion",
        label: "(Normal)",
        price: "$815",
        duration: "3-4 DAYS / 2-3 NIGHTS",
        description: "Ultimate introduction to Luang Prabang's culture and spirituality",
        features: [
            "Ultimate introduction to Luang Prabang's culture and spirituality",
            "Ideal for first-time visitors seeking tranquility", 
            "Includes: All guided activities, transfers, entrance fees"
        ],
        priceNote: "FOR 1-2 PEOPLE",
        bgColor: "bg-white/90",
        textColor: "text-gray-800",
        buttonStyle: "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
    },
    {
        id: 2,
        title: "STANDARD",
        subtitle: "Luang Prabang & Northern Whispers",
        label: "(Most Popular)",
        price: "$1,120",
        duration: "4-5 DAYS / 3-4 NIGHTS", 
        description: "Perfect balance of cultural immersion and natural splendor",
        features: [
            "Luang Prabang + Nong Khiaw's dramatic landscapes",
            "Village life along Nam Ou River + gentle trekking",
            "Includes: All guided activities, transfers, entrance fees"
        ],
        priceNote: "FOR 1-2 PEOPLE",
        bgColor: "bg-amber-900/95",
        textColor: "text-white",
        buttonStyle: "border-white text-white hover:bg-white hover:text-amber-900",
        isPopular: true
    },
    {
        id: 3,
        title: "PREMIUM",
        subtitle: "Laos Heart & Travel Soul",
        label: "(Comprehensive)",
        price: "$815",
        duration: "6-7 DAYS / 5-6 NIGHTS",
        description: "Complete overview of culture, nature, and city life",
        features: [
            "Three main highlights: Luang Prabang + Vang Vieng + Vientiane",
            "Complete overview of culture, nature, and city life",
            "Includes: All guided activities, transfers, entrance fees"
        ],
        priceNote: "FOR 1-2 PEOPLE",
        bgColor: "bg-white/90",
        textColor: "text-gray-800",
        buttonStyle: "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
    }
];

export const additionalPackages: Package[] = [
    {
        id: 4,
        title: "CULTURE & NATURE",
        subtitle: "KUANG SI WATERFALL + HMONG VILLAGE",
        description: "Perfect balance of cultural immersion and natural splendor. Explore Luang Prabang's iconic sites early in the morning, then venture to the spectacular turquoise pools of Kuang Si Waterfall.",
        features: [
            "Morning city tour (Royal Palace Museum, Wat Xieng Thong)",
            "Kuang Si Waterfall swimming & hiking",
            "Authentic Hmong village cultural experience",
            "Lao Buffalo Dairy farm visit"
        ],
        bgColor: "bg-white/90",
        textColor: "text-gray-800",
        buttonStyle: "bg-amber-900 text-white hover:bg-amber-800"
    },
    {
        id: 5,
        title: "RIVER & CAVES",
        subtitle: "PAK OU CAVES + MEKONG RIVER CRUISE",
        description: "Tranquil river-focused experience connecting spiritual heritage with serene Mekong life. A peaceful boat journey to ancient caves filled with thousands of Buddha statues.",
        features: [
            "Guided heritage city tour of key temples",
            "Private traditional slow-boat cruise",
            "Sacred Pak Ou Caves exploration",
            "Riverside village life observation"
        ],
        bgColor: "bg-amber-900/95",
        textColor: "text-white",
        buttonStyle: "bg-white text-amber-900 hover:bg-gray-100"
    }
];
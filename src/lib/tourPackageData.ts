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
        label: "(Most Picked - Core Experience)",
        price: "$815",
        duration: "3-4 DAYS / 2-3 NIGHTS",
        description: "Ultimate introduction to Luang Prabang's serene beauty and rich heritage",
        features: [
            "Ultimate introduction to Luang Prabang's culture and spirituality",
            "Ideal for first-time visitors seeking tranquility without extensive travel", 
            "Flagship Luang Prabang experience at a relaxed pace",
            "Includes: All guided activities, private transfers, entrance fees"
        ],
        priceNote: "FOR 1-2 PEOPLE",
        bgColor: "bg-[#52392F]",
        textColor: "text-white",
        buttonStyle: "border-white text-white hover:bg-white hover:text-[#52392F]",
        isPopular: true
    },
    {
        id: 2,
        title: "STANDARD",
        subtitle: "Luang Prabang & Northern Whispers",
        label: "(Nature & Culture)",
        price: "$1,120",
        duration: "4-5 DAYS / 3-4 NIGHTS", 
        description: "Blend Luang Prabang's charm with untouched northern landscapes",
        features: [
            "Luang Prabang + Nong Khiaw's dramatic landscapes",
            "Authentic village life along Nam Ou River",
            "Gentle trekking and serene natural beauty",
            "Includes: All guided activities, private transfers, entrance fees"
        ],
        priceNote: "FOR 1-2 PEOPLE",
        bgColor: "bg-white/90",
        textColor: "text-gray-800",
        buttonStyle: "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
    },
    {
        id: 3,
        title: "PREMIUM",
        subtitle: "Laos Heart & Soul",
        label: "(Comprehensive)",
        price: "$1,355",
        duration: "6-7 DAYS / 5-6 NIGHTS",
        description: "Complete journey through Laos's three main highlights",
        features: [
            "Three destinations: Luang Prabang + Vang Vieng + Vientiane",
            "Perfect blend of culture, nature, and city life",
            "Comprehensive overview for visitors with more time",
            "Includes: All guided activities, private transfers, entrance fees"
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
        title: "RIVER & RITUALS",
        subtitle: "MEKONG CRUISE + PAK OU CAVES + BACI CEREMONY",
        description: "A serene journey exploring Luang Prabang's sacred heritage and connection to the mighty Mekong River. Visit historic royal sites before embarking on a peaceful river cruise to ancient caves and authentic village ceremonies.",
        features: [
            "National Museum (former Royal Palace) & Wat Xieng Thong tour",
            "Private traditional slow-boat cruise on Mekong River",
            "Sacred Pak Ou Caves with thousands of Buddha images",
            "Authentic Baci welcome ceremony in local village",
            "Beautiful sunset cruise back to Luang Prabang"
        ],
        bgColor: "bg-white/90",
        textColor: "text-gray-800",
        buttonStyle: "bg-[#52392F] text-white hover:bg-[#4A322A]"
    },
    {
        id: 5,
        title: "HERITAGE & CASCADE",
        subtitle: "CITY TOUR + KUANG SI WATERFALL",
        description: "Perfect blend of Luang Prabang's cultural treasures with its most spectacular natural wonder. Explore the city's royal and spiritual history before venturing to majestic waterfalls for a refreshing afternoon in nature.",
        features: [
            "Wat Xieng Thong & Royal Palace Museum guided tour",
            "Local art museum showcasing Laos's diverse ethnic groups",
            "Spectacular Kuang Si Waterfall with turquoise pools",
            "Swimming opportunity in famous waterfall pools",
            "Delightful stop at Lao Buffalo Dairy farm"
        ],
        bgColor: "bg-[#52392F]/95",
        textColor: "text-white",
        buttonStyle: "bg-white text-[#52392F] hover:bg-gray-100"
    },
    {
        id: 6,
        title: "COMPLETE EXPERIENCE",
        subtitle: "SUNRISE TO SUNSET LUANG PRABANG",
        description: "The most comprehensive single-day experience revealing the heart and soul of Luang Prabang from spiritual dawn to vibrant cultural life. Perfect for those wanting the full essence of the city in one unforgettable day.",
        features: [
            "Early morning Alms Giving ceremony with 150+ monks",
            "Visit to lively local fresh market with villagers",
            "Wat Xieng Thong & Royal Palace Museum exploration",
            "Heritage house & art museum dedicated to Lao minorities",
            "Ock Pop Tok weaving center visit",
            "Mount Phousi sunset with breathtaking panoramic views"
        ],
        bgColor: "bg-white/90",
        textColor: "text-gray-800",
        buttonStyle: "bg-[#52392F] text-white hover:bg-[#4A322A]"
    }
];

// Day experience pricing (separate from packages above)
export const dayExperiencePricing = {
    "River & Rituals": "$200 USD",
    "Heritage & Cascade": "$175 USD", 
    "Complete Experience": "$180 USD"
};
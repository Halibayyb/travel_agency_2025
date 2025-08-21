// laos-tourism-config.ts

// Import images (you'll add these)
import lpbTemple from "@/public/assets/royal_palace_img.jpg"
import lpbLocal from "@/public/assets/lpb_street.jpg"
import nkImg from "@/public/assets/nong_khiaw_river.jpg";
import vvImg from "@/public/assets/vang_vieng.jpg";
import vteImg from "@/public/assets/vientiane.jpg";

// lpb images
import lpb1 from "@/public/assets/lpb/lpbStreet1.webp"
import lpb2 from "@/public/assets/lpb/lpbStreet2.jpg"
import lpb3 from "@/public/assets/lpb/lpbStreet3.jpg"
import lpb4 from "@/public/assets/lpb/lpbStreet4.jpg"
import lpb5 from "@/public/assets/lpb/lpbStreet5.jpg"
import lpb6 from "@/public/assets/lpb/lpbStreet6.jpg"

// nk images
import nk1 from "@/public/assets/nk/nk1.jpg"
import nk2 from "@/public/assets/nk/nk2.jpg"
import nk3 from "@/public/assets/nk/nk3.jpg"
import nk4 from "@/public/assets/nk/nk4.jpg"

// vv images
import vv1 from "@/public/assets/vv/vv1.jpg"
import vv2 from "@/public/assets/vv/vv2.jpg"
import vv3 from "@/public/assets/vv/vv3.jpg"
import vv4 from "@/public/assets/vv/vv4.jpg"
import vv5 from "@/public/assets/vv/vv5.jpg"
import vv6 from "@/public/assets/vv/vv6.jpg"
import vv7 from "@/public/assets/vv/vv7.jpg"

// vte images
import vte1 from "@/public/assets/vte/vte1.jpg"
import vte2 from "@/public/assets/vte/vte2.jpg"
import vte3 from "@/public/assets/vte/vte3.jpg"
import vte4 from "@/public/assets/vte/vte4.jpg"
import vte5 from "@/public/assets/vte/vte5.jpg"
import vte6 from "@/public/assets/vte/vte6.jpg"

export interface ImageData {
    src: any;
    alt: string;
}

export interface ExperienceData {
    id: number;
    title: string;
    description: string;
    features: string[];
    images: {
        main: ImageData;
        secondary: ImageData[];
    };
}

export interface DestinationData {
    id: string;
    name: string;
    experiences: ExperienceData[];
    location: {
        title: string;
        description: string;
        mapSrc: string;
    };
}

export const tabs: string[] = ['LUANG PRABANG', 'NONG KHIAW', 'VANG VIENG', 'VIENTIANE'];

// Updated image arrays with proper distribution
export const luangPrabangImages = [
    lpbTemple,
    lpbLocal,
    lpb1,
    lpb2,
    lpb3,
    lpb4,
    lpb5,
    lpb6,
    lpbTemple,
    lpbLocal,
];

export const nongKhiawImages = [
    nkImg,
    nk1,
    nk2,
    nk3,
    nk4,
    nkImg,
    nk1,
    nk2,
    nk3,
    nk4,
];

export const vangViengImages = [
    vvImg,
    vv1,
    vv2,
    vv3,
    vv4,
    vv5,
    vv6,
    vv7,
    vvImg,
    vv1,
];

export const vientianeImages = [
    vteImg,
    vte1,
    vte2,
    vte3,
    vte4,
    vte5,
    vte6,
    vteImg,
    vte1,
    vte2,
];

interface DestinationImagesMap {
  [key: string]: any[];
}

// Create a map for easy access
export const destinationImagesMap = {
    'LUANG PRABANG': luangPrabangImages,
    'NONG KHIAW': nongKhiawImages,
    'VANG VIENG': vangViengImages,
    'VIENTIANE': vientianeImages
};

export const destinationInfo = {
    title: "LUANG PRABANG",
    description: "Luang Prabang, the ancient capital of Luang Prabang Province in northern Laos, lies in a valley at the confluence of the Mekong and Nam Khan rivers. Inhabited for thousands of years, it was the royal capital of the country until 1975. It's known for its many Buddhist temples, including the gilded Wat Xieng Thong, dating to the 16th century, and Wat Mai, once the residence of the head of Laotian Buddhism."
};

export const destinationImages = luangPrabangImages;

// Luang Prabang Experiences - Updated with proper LPB images
export const luangPrabangExperiences: ExperienceData[] = [
    {
        id: 1,
        title: "Mekong Cruise to Caves and Baci ceremony with local Villages",
        description: "A serene slow-boat cruise up the Mekong River, where you'll make a stop to taste traditional Lao rice whiskey and visit a local village for a heartwarming Baci ceremony before arriving at the sacred Pak Ou Caves, a pilgrimage site filled with thousands of Buddha images. The return trip includes a beautiful sunset cruise back to Luang Prabang, offering a perfect conclusion to a day of spiritual and cultural discovery.",
        features: [
            "Serene slow-boat cruise up the Mekong River",
            "Traditional Lao rice whiskey tasting experience",
            "Heartwarming Baci ceremony in local village",
            "Sacred Pak Ou Caves pilgrimage site with thousands of Buddha images",
            "Beautiful sunset cruise back to Luang Prabang"
        ],
        images: {
            main: { src: lpb1, alt: "Mekong River Cruise" },
            secondary: [
                { src: lpbTemple, alt: "Pak Ou Caves" },
                { src: lpbLocal, alt: "Baci Ceremony" },
                { src: lpb2, alt: "Rice Whiskey Tasting" }
            ]
        }
    },
    {
        id: 2,
        title: "Visit Kuang Si Waterfall",
        description: "A picturesque drive through the countryside leads to the spectacular Kuang Si Waterfall, a cascade of multi-tiered turquoise pools perfect for a refreshing swim. We'll also make a delightful stop at the Lao Buffalo Dairy and Hmong village on the way, making for a perfect day of natural beauty and tranquility.",
        features: [
            "Picturesque countryside drive",
            "Multi-tiered turquoise pools perfect for swimming",
            "Visit to Lao Buffalo Dairy",
            "Stop at traditional Hmong village",
            "Perfect day of natural beauty and tranquility"
        ],
        images: {
            main: { src: lpb3, alt: "Kuang Si Waterfall" },
            secondary: [
                { src: lpb4, alt: "Lao Buffalo Dairy" },
                { src: lpb5, alt: "Hmong Village" },
                { src: lpb6, alt: "Swimming Pools" }
            ]
        }
    },
    {
        id: 3,
        title: "Morning Alms Giving",
        description: "As the sun rises, you can respectfully witness or participate in the ritual of Morning Alms Giving, where hundreds of barefoot monks walk in a silent procession to receive food offerings from locals. It's a peaceful and humbling experience that offers a profound glimpse into the local Buddhist faith and a beautiful start to your day.",
        features: [
            "Dawn Buddhist monk procession experience",
            "Respectful witnessing or participation opportunity",
            "Hundreds of barefoot monks in silent procession",
            "Profound glimpse into local Buddhist faith",
            "Peaceful and humbling spiritual experience"
        ],
        images: {
            main: { src: lpbTemple, alt: "Morning Alms Giving" },
            secondary: [
                { src: lpbLocal, alt: "Buddhist Monks" },
                { src: lpb1, alt: "Dawn Buddhist Procession" },
                { src: lpb2, alt: "Alms Offering" }
            ]
        }
    },
    {
        id: 4,
        title: "City Tour",
        description: "This tour offers a rich immersion into Luang Prabang's UNESCO-listed heritage. You will explore the former Royal Palace, now a national museum showcasing Laos's history, and wander through the town to discover its many beautiful and historic temples. As the day draws to a close, we will ascend Mount Phousi for a breathtaking panoramic sunset view, before finishing the evening with a stroll through the bustling and colorful night market, filled with local handicrafts and delicious street food.",
        features: [
            "UNESCO-listed heritage exploration",
            "Former Royal Palace museum showcasing Laos's history",
            "Beautiful and historic temples throughout the town",
            "Mount Phousi panoramic sunset views",
            "Colorful night market with local handicrafts and street food"
        ],
        images: {
            main: { src: lpbTemple, alt: "Royal Palace Museum" },
            secondary: [
                { src: lpb3, alt: "Mount Phousi Sunset" },
                { src: lpbLocal, alt: "Night Market" },
                { src: lpb4, alt: "Historic Temples" }
            ]
        }
    },
    {
        id: 5,
        title: "Bamboo Weaving & Cooking Classes Join-in",
        description: "This hands-on experience offers a creative and authentic dive into Laotian culture. You'll begin by learning the traditional art of bamboo weaving, transforming a simple natural material into a beautiful handcrafted item. The day continues with a visit to a local market to gather fresh ingredients, followed by a cooking class where you'll master the art of preparing delicious, traditional Lao dishes.",
        features: [
            "Traditional bamboo weaving art instruction",
            "Hands-on creative cultural experience",
            "Local market visit for fresh ingredients",
            "Traditional Lao cooking class",
            "Master authentic Laotian culinary techniques"
        ],
        images: {
            main: { src: lpb5, alt: "Bamboo Weaving" },
            secondary: [
                { src: lpb6, alt: "Cooking Class" },
                { src: lpbLocal, alt: "Local Market Visit" },
                { src: lpb1, alt: "Traditional Crafts" }
            ]
        }
    },
    {
        id: 6,
        title: "A Journey into Lao Arts & Traditions",
        description: "We begin at the Traditional Arts and Ethnology Centre (TAEC), an insightful museum that showcases the diverse cultures and lifestyles of Laos' many ethnic groups. From there, we continue to Ock Pop Tok, a renowned textile gallery and social enterprise situated along the Mekong River. Here, you'll learn about the intricate art of traditional Lao weaving, admire beautiful handmade products, and connect with the country's rich cultural heritage in a serene and inspiring setting.",
        features: [
            "TAEC museum showcasing diverse ethnic cultures",
            "Insight into lifestyles of Laos' ethnic groups",
            "Ock Pop Tok textile gallery and social enterprise",
            "Traditional Lao weaving art exploration",
            "Connection with rich cultural heritage along Mekong River"
        ],
        images: {
            main: { src: lpb2, alt: "TAEC Museum" },
            secondary: [
                { src: lpb3, alt: "Ock Pop Tok Textile Gallery" },
                { src: lpb4, alt: "Traditional Lao Weaving" },
                { src: lpbTemple, alt: "Cultural Heritage" }
            ]
        }
    }
];

// Nong Khiaw Experiences - Updated with NK images
export const nongKhiawExperiences: ExperienceData[] = [
    {
        id: 7,
        title: "Hiking to the View Point",
        description: "The moderately challenging trek takes you through the lush landscapes and dramatic limestone karsts that define Muang Ngoi's scenery. The trek culminates in a breathtaking viewpoint high above the village, offering an unparalleled panoramic vista of the Nam Ou River, the surrounding rice paddies, and the majestic mountains.",
        features: [
            "Moderately challenging trek through lush landscapes",
            "Dramatic limestone karsts scenery",
            "Breathtaking viewpoint high above the village",
            "Panoramic vista of Nam Ou River",
            "Views of surrounding rice paddies and majestic mountains"
        ],
        images: {
            main: { src: nkImg, alt: "Nong Khiaw Viewpoint" },
            secondary: [
                { src: nk1, alt: "Nam Ou River Vista" },
                { src: nk2, alt: "Limestone Karsts" },
                { src: nk3, alt: "Rice Paddies View" }
            ]
        }
    },
    {
        id: 8,
        title: "Explore Local Villages",
        description: "Following the ritual, we will embark on a gentle trek to nearby local villages, where you can immerse yourself in the authentic daily life and observe the traditional customs of the friendly inhabitants.",
        features: [
            "Gentle trek to nearby local villages",
            "Immersion in authentic daily life",
            "Observation of traditional customs",
            "Interaction with friendly local inhabitants",
            "Cultural authenticity experience"
        ],
        images: {
            main: { src: nk4, alt: "Local Village Exploration" },
            secondary: [
                { src: nk1, alt: "Village Daily Life" },
                { src: nk2, alt: "Traditional Customs" },
                { src: nk3, alt: "Local Inhabitants" }
            ]
        }
    }
];

// Vang Vieng Experiences - Updated with VV images
export const vangViengExperiences: ExperienceData[] = [
    {
        id: 9,
        title: "Hot Air Balloon Ride",
        description: "Witness the magic of Vang Vieng from a unique vantage point on an early morning or late afternoon hot air balloon flight. As you ascend, the majestic landscape unfolds below, revealing a spectacular tapestry of towering limestone karsts, verdant rice paddies, and the winding Nam Song River.",
        features: [
            "Early morning or late afternoon balloon flight",
            "Unique aerial vantage point experience",
            "Spectacular tapestry of towering limestone karsts",
            "Verdant rice paddies views",
            "Winding Nam Song River from above"
        ],
        images: {
            main: { src: vvImg, alt: "Hot Air Balloon Ride" },
            secondary: [
                { src: vv1, alt: "Aerial Limestone Karsts" },
                { src: vv2, alt: "Rice Paddies from Above" },
                { src: vv3, alt: "Nam Song River View" }
            ]
        }
    },
    {
        id: 10,
        title: "Vang Vieng's Turquoise Oasis & Adventure",
        description: "Begin your day at one of the famous Blue Lagoons, where you can take a refreshing swim in its beautiful turquoise waters. Next, you'll soar above the jungle canopy on a thrilling zipline adventure, offering a unique bird's-eye view of the dramatic karst landscape. The exploration culminates with a venture into one of the region's mysterious limestone caves, where you can uncover its hidden depths.",
        features: [
            "Famous Blue Lagoons with turquoise waters",
            "Refreshing swimming experience",
            "Thrilling zipline adventure above jungle canopy",
            "Bird's-eye view of dramatic karst landscape",
            "Mysterious limestone caves exploration"
        ],
        images: {
            main: { src: vv4, alt: "Blue Lagoon" },
            secondary: [
                { src: vv5, alt: "Zipline Adventure" },
                { src: vv6, alt: "Limestone Caves" },
                { src: vv7, alt: "Karst Landscape" }
            ]
        }
    },
    {
        id: 11,
        title: "Tubing and Kayaking",
        description: "You can opt for a peaceful tubing experience, floating gently down the Nam Song River on a large inner tube, allowing you to relax and soak in the magnificent scenery of limestone karsts and lush fields. Alternatively, you can choose to go kayaking, paddling at your own pace to explore the river and its serene surroundings in a more active and engaging way.",
        features: [
            "Peaceful tubing down Nam Song River",
            "Relaxing float on large inner tubes",
            "Magnificent limestone karsts scenery",
            "Alternative kayaking option available",
            "Active exploration at your own pace"
        ],
        images: {
            main: { src: vv1, alt: "Tubing on Nam Song River" },
            secondary: [
                { src: vv2, alt: "Kayaking Experience" },
                { src: vv3, alt: "River Scenery" },
                { src: vvImg, alt: "Lush Fields View" }
            ]
        }
    }
];

// Vientiane Experiences - Updated with VTE images
export const vientianeExperiences: ExperienceData[] = [
    {
        id: 12,
        title: "Pha That Luang",
        description: "A magnificent and revered national monument, Pha That Luang stands as a powerful symbol of Laos's Buddhist faith and sovereignty. Its soaring golden stupa dominates the skyline, radiating a sense of peace and historical grandeur that has made it the most important spiritual site in the country.",
        features: [
            "Magnificent revered national monument",
            "Powerful symbol of Laos's Buddhist faith and sovereignty",
            "Soaring golden stupa dominating skyline",
            "Most important spiritual site in the country",
            "Sense of peace and historical grandeur"
        ],
        images: {
            main: { src: vteImg, alt: "Pha That Luang" },
            secondary: [
                { src: vte1, alt: "Golden Stupa" },
                { src: vte2, alt: "National Monument" },
                { src: vte3, alt: "Buddhist Symbol" }
            ]
        }
    },
    {
        id: 13,
        title: "Patuxai (Victory Monument)",
        description: "Often referred to as Vientiane's own Arc de Triomphe, Patuxai is a beautiful fusion of French colonial influence and traditional Lao design. Its intricate motifs and elegant arches invite you to ascend to the top, where a stunning panoramic view of the laid-back capital and its urban landscape awaits.",
        features: [
            "Vientiane's Arc de Triomphe",
            "Fusion of French colonial and traditional Lao design",
            "Intricate motifs and elegant arches",
            "Ascend to the top for panoramic views",
            "Stunning views of the laid-back capital"
        ],
        images: {
            main: { src: vte4, alt: "Patuxai Victory Monument" },
            secondary: [
                { src: vte5, alt: "Arc de Triomphe Style" },
                { src: vte6, alt: "Panoramic City View" },
                { src: vte1, alt: "Colonial Architecture" }
            ]
        }
    },
    {
        id: 14,
        title: "Wat Sisaket",
        description: "Step into a spiritual sanctuary at Wat Sisaket, Vientiane's oldest temple, which has stood as a place of worship since the early 19th century. Within its peaceful cloister walls, you will discover a timeless collection of over 6,800 Buddha images, each telling a story of devotion and art across many centuries.",
        features: [
            "Vientiane's oldest temple since early 19th century",
            "Spiritual sanctuary with peaceful cloister walls",
            "Timeless collection of over 6,800 Buddha images",
            "Stories of devotion and art across centuries",
            "Place of continuous worship and reflection"
        ],
        images: {
            main: { src: vte2, alt: "Wat Sisaket Temple" },
            secondary: [
                { src: vte3, alt: "Buddha Images Collection" },
                { src: vte4, alt: "Cloister Walls" },
                { src: vte5, alt: "Ancient Temple Architecture" }
            ]
        }
    },
    {
        id: 15,
        title: "Haw Phra Kaew",
        description: "This ornate former royal temple now serves as a museum, preserving a treasury of sacred artifacts and magnificent Buddhist art. While it once housed the famed Emerald Buddha, its elegant architecture and tranquil grounds still carry an air of royal solemnity and offer a quiet space for reflection on Laos's rich cultural past.",
        features: [
            "Ornate former royal temple turned museum",
            "Treasury of sacred artifacts and Buddhist art",
            "Former home of the famed Emerald Buddha",
            "Elegant architecture with tranquil grounds",
            "Quiet space for reflection on Laos's cultural past"
        ],
        images: {
            main: { src: vte6, alt: "Haw Phra Kaew Museum" },
            secondary: [
                { src: vte1, alt: "Sacred Artifacts" },
                { src: vte2, alt: "Royal Temple Architecture" },
                { src: vte3, alt: "Buddhist Art Collection" }
            ]
        }
    },
    {
        id: 16,
        title: "Buddha Park (Xieng Khuan)",
        description: "A quirky and captivating artistic fusion, Buddha Park is an open-air sculpture garden located just outside the city. Here, hundreds of majestic Hindu and Buddhist statues, ranging from serene deities to fantastical creatures, create a whimsical and surreal landscape that is both a place of spiritual significance and a unique visual spectacle.",
        features: [
            "Quirky open-air sculpture garden outside the city",
            "Hundreds of majestic Hindu and Buddhist statues",
            "Serene deities to fantastical creatures",
            "Whimsical and surreal landscape",
            "Both spiritual significance and unique visual spectacle"
        ],
        images: {
            main: { src: vte4, alt: "Buddha Park Sculptures" },
            secondary: [
                { src: vte5, alt: "Hindu Statues" },
                { src: vte6, alt: "Buddhist Statues" },
                { src: vteImg, alt: "Sculpture Garden" }
            ]
        }
    }
];

// Combined destinations data
export const destinations: DestinationData[] = [
    {
        id: 'luang-prabang',
        name: 'LUANG PRABANG',
        experiences: luangPrabangExperiences,
        location: {
            title: "LUANG PRABANG",
            description: "An enjoyable stroll from Sofitel Luang Prabang brings you to a fascinating display of Laos",
            mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30015.357457926297!2d102.12504522631893!3d19.88561311552375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312f2a3f413d1ba3%3A0xac9749a9608e6a56!2sLuang%20Prabang!5e0!3m2!1sen!2sla!4v1755346839811!5m2!1sen!2sla"
        }
    },
    {
        id: 'nong-khiaw',
        name: 'NONG KHIAW',
        experiences: nongKhiawExperiences,
        location: {
            title: "NONG KHIAW",
            description: "Discover the breathtaking riverside town nestled along the Nam Ou River",
            mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7470.7841578471725!2d102.60626434573491!3d20.57203997386162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312e9cd0671edbc7%3A0xf6b6b95e9aa404f0!2sNong%20Khiaw!5e0!3m2!1sen!2sla!4v1755346908293!5m2!1sen!2sla"
        }
    },
    {
        id: 'vang-vieng',
        name: 'VANG VIENG',
        experiences: vangViengExperiences,
        location: {
            title: "VANG VIENG",
            description: "Experience the adventure capital with stunning karst landscapes along Nam Song River",
            mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30189.648441840614!2d102.42706042509646!3d18.94440071290983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3125ec34f03be713%3A0x1b35acb9d4d3e238!2sVang%20Vieng!5e0!3m2!1sen!2sla!4v1755346994733!5m2!1sen!2sla"
        }
    },
    {
        id: 'vientiane',
        name: 'VIENTIANE',
        experiences: vientianeExperiences,
        location: {
            title: "VIENTIANE",
            description: "Explore the charming capital where French colonial meets traditional Lao culture",
            mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121452.59082239568!2d102.52336474944914!3d17.960422219079728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3124688606ed7b21%3A0x1f93b18618c1eedf!2sVientiane!5e0!3m2!1sen!2sla!4v1755347043056!5m2!1sen!2sla"
        }
    }
];

// Legacy export for backward compatibility
export const experiences = luangPrabangExperiences;
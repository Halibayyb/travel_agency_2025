'use client';
import { motion } from "framer-motion";

// Import animations
import { staggerContainer, staggerChild } from '@/src/lib/animations';

const LocationPage = () => {
    return(
        <section className="bg-gray-50">
            {/* Header */}
            <motion.div 
                initial="initial"
                whileInView="animate"
                viewport={{ once: false, amount: 0.3 }}
                variants={staggerContainer}
                className="text-center py-16 px-4"
            >
                <motion.h1 
                    variants={staggerChild}
                    className="text-2xl xl:text-5xl font-light text-gray-800 mb-6 tracking-widest"
                >
                    LOCATION
                </motion.h1>
                <motion.p 
                    variants={staggerChild}
                    className="text-base xl:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
                >
                    An enjoyable stroll from Sofitel Luang Prabang brings you to a fascinating display of Laos
                </motion.p>
            </motion.div>

            {/* Map iframe - Full Width */}
            <div className="w-full h-96 md:h-[500px] lg:h-[600px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30015.35745792647!2d102.12504521834877!3d19.885613115522826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312f2a3f413d1ba3%3A0xac9749a9608e6a56!2sLuang%20Prabang!5e0!3m2!1sen!2sla!4v1755103843106!5m2!1sen!2sla"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vientiane Location Map"
                />
            </div>

            {/* Location Details */}
            
        </section>
    )
}

export default LocationPage;
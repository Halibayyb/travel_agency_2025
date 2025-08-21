'use client';
import React, { useState } from "react";
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { countries } from "countries-list";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        email: '',
        message: ''
    });

    const [isCountryOpen, setIsCountryOpen] = useState(false);

    // Convert countries object to array for dropdown
    const countryOptions = [
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    return(
        <section id="contact" className="min-h-screen bg-gray-50 py-16 px-10">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-2xl xl:text-5xl font-light text-gray-800 tracking-widest font1">
                    CONTACT US
                </h1>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Information Section - order-2 on small screens, order-1 on large screens */}
                    <div className="hidden xl:block space-y-12 order-2 lg:order-1">
                        {/* Call Us */}
                        <div>
                            <h2 className="text-2xl font-light text-gray-800 mb-2 xl:mb-6 tracking-wide font1">
                                Call Us
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed font2">
                                An enjoyable stroll from Sofitel Luang Prabang brings you to a
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12  rounded-full flex items-center justify-center mr-4">
                                    <Phone className="w-5 h-5 text-amber-700" />
                                </div>
                                <span className="text-gray-700 text-sm xl:text-lg font2">
                                    +856 20 xx xxx xxx
                                </span>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <h2 className="text-2xl font-light text-gray-800 mb-2 xl:mb-6 tracking-wide font1">
                                Email
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed font2">
                                An enjoyable stroll from Sofitel Luang Prabang brings you to a
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12  rounded-full flex items-center justify-center mr-4">
                                    <Mail className="w-5 h-5 text-amber-700" />
                                </div>
                                <span className="text-gray-700 text-sm xl:text-lg font2">
                                    LuangPrabang@gmail.com
                                </span>
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <h2 className="text-2xl font-light text-gray-800 mb-2 xl:mb-6 tracking-wide font1">
                                Address
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed font2">
                                An enjoyable stroll from Sofitel Luang Prabang brings you to a
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12  rounded-full flex items-center justify-center mr-4">
                                    <MapPin className="w-5 h-5 text-amber-700" />
                                </div>
                                <span className="text-gray-700 text-sm xl:text-lg font2">
                                    123, Luang Pra barng
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Message Form Section - order-1 on small screens, order-2 on large screens */}
                    <div className="order-1 lg:order-2">
                        <h2 className="text-lg xl:text-2xl font-light text-gray-800 mb-2 xl:mb-6 tracking-wide font1">
                            Send a Message
                        </h2>
                        <p className="text-md xl:text-xl text-gray-600 mb-8 leading-relaxed font2">
                            An enjoyable stroll from Sofitel Luang Prabang brings you to a fascinating display of Laos
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Name */}
                            <div>
                                <label className="block text-gray-600 text-sm mb-3 font2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-amber-600 transition-colors duration-300 font2"
                                    placeholder=""
                                />
                            </div>

                            {/* Country Dropdown */}
                            <div className="relative">
                                <label className="block text-gray-600 text-sm mb-3 font2">
                                    Country
                                </label>
                                <div 
                                    className="w-full border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-gray-800 cursor-pointer focus-within:border-amber-600 transition-colors duration-300 flex items-center justify-between font2"
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
                                <label className="block text-gray-600 text-sm mb-3 font2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-amber-600 transition-colors duration-300 font2"
                                    placeholder=""
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
                                    rows={6}
                                    className="w-full border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-amber-600 transition-colors duration-300 resize-none font2"
                                    placeholder=""
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-8">
                                <button
                                    type="submit"
                                    className="bg-[#52392F] hover:bg-[#4A322A] text-white px-12 py-4 tracking-widest text-sm font-light transition-colors duration-300 font2"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactUs;
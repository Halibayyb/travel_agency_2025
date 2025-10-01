'use client';
import React, { useState } from "react";
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { countries } from "countries-list";
import { submitContactInquiry } from '@/src/lib/firebase/formService';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        email: '',
        message: ''
    });

    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setIsSubmitting(true);
        setSubmitMessage(null);

        // Submit using the service
        const result = await submitContactInquiry(formData);

        if (result.success) {
            // Show success message
            setSubmitMessage({
                type: 'success',
                text: result.message
            });

            // Reset form
            setFormData({
                name: '',
                country: '',
                email: '',
                message: ''
            });

            // Clear success message after 5 seconds
            setTimeout(() => {
                setSubmitMessage(null);
            }, 5000);
        } else {
            // Show error message
            setSubmitMessage({
                type: 'error',
                text: result.message
            });
        }

        setIsSubmitting(false);
    };

    return(
        <section id="contact" className="min-h-screen bg-gray-50 py-16 px-10">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-2xl xl:text-5xl font-light text-gray-800 tracking-widest font1">
                    Connect with us
                </h1>
                <p 
                    className="font2 text-sm xl:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mt-5"
                >We would be delighted to hear from you and begin the journey of planning your perfect trip to Laos. Whether you have a specific itinerary in mind or are simply seeking inspiration, we are here to provide personal guidance and answer any questions you may have.</p>
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

                            <div className="flex items-center">
                                <div className="w-12 h-12  rounded-full flex items-center justify-center mr-4">
                                    <Phone className="w-5 h-5 text-amber-700" />
                                </div>
                                <span className="text-gray-700 text-sm xl:text-lg font2">
                                    +856 20 555 70891
                                </span>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <h2 className="text-2xl font-light text-gray-800 mb-2 xl:mb-6 tracking-wide font1">
                                Email
                            </h2>

                            <div className="flex items-center">
                                <div className="w-12 h-12  rounded-full flex items-center justify-center mr-4">
                                    <Mail className="w-5 h-5 text-amber-700" />
                                </div>
                                <span className="text-gray-700 text-sm xl:text-lg font2">
                                    soulivong.nattaline@gmail.com
                                </span>
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <h2 className="text-2xl font-light text-gray-800 mb-2 xl:mb-6 tracking-wide font1">
                                Address
                            </h2>

                            <div className="flex items-center">
                                <div className="w-12 h-12  rounded-full flex items-center justify-center mr-4">
                                    <MapPin className="w-5 h-5 text-amber-700" />
                                </div>
                                <span className="text-gray-700 text-sm xl:text-lg font2">
                                    01191, Luang Prabang, Laos
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
                            Please feel free to reach out to us, and let us help you craft an experience that is uniquely yours.
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
                                    required
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
                                    required
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
                                    required
                                />
                            </div>

                            {/* Success/Error Message */}
                            {submitMessage && (
                                <div className={`p-4 rounded-lg ${
                                    submitMessage.type === 'success' 
                                        ? 'bg-green-50 border border-green-200 text-green-800' 
                                        : 'bg-red-50 border border-red-200 text-red-800'
                                }`}>
                                    <p className="text-sm font2">{submitMessage.text}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-end pt-8">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#52392F] hover:bg-[#4A322A] text-white px-12 py-4 tracking-widest text-sm font-light transition-colors duration-300 font2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'SENDING...' : 'SUBMIT'}
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
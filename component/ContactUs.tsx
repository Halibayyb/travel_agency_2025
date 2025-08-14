'use client';
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    return(
        <section className="min-h-screen bg-gray-50 py-16 px-10">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-light text-gray-800 tracking-widest">
                    CONTACT US
                </h1>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Information Section - order-2 on small screens, order-1 on large screens */}
                    <div className="space-y-12 order-2 lg:order-1">
                        {/* Call Us */}
                        <div>
                            <h2 className="text-2xl font-light text-gray-800 mb-2 xl:mb-6 tracking-wide">
                                Call Us
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                An enjoyable stroll from Sofitel Luang Prabang brings you to a
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                                    <Phone className="w-5 h-5 text-amber-700" />
                                </div>
                                <span className="text-gray-700 text-sm xl:text-lg">
                                    +856 20 xx xxx xxx
                                </span>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <h2 className="text-2xl font-light text-gray-800 mb-2 xl:mb-6 tracking-wide">
                                Email
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                An enjoyable stroll from Sofitel Luang Prabang brings you to a
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                                    <Mail className="w-5 h-5 text-amber-700" />
                                </div>
                                <span className="text-gray-700 text-sm xl:text-lg">
                                    LuangPrabang@gmail.com
                                </span>
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <h2 className="text-2xl font-light text-gray-800 mb-2 xl:mb-6 tracking-wide">
                                Address
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                An enjoyable stroll from Sofitel Luang Prabang brings you to a
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                                    <MapPin className="w-5 h-5 text-amber-700" />
                                </div>
                                <span className="text-gray-700 text-sm xl:text-lg">
                                    123, Luang Pra barng
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Message Form Section - order-1 on small screens, order-2 on large screens */}
                    <div className="order-1 lg:order-2">
                        <h2 className="text-2xl font-light text-gray-800 mb-2 xl:mb-6 tracking-wide">
                            Send a Message
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            An enjoyable stroll from Sofitel Luang Prabang brings you to a fascinating display of Laos
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* First Name */}
                            <div>
                                <label className="block text-gray-600 text-sm mb-3">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-amber-600 transition-colors duration-300"
                                    placeholder=""
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-gray-600 text-sm mb-3">
                                    LastName
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-amber-600 transition-colors duration-300"
                                    placeholder=""
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-gray-600 text-sm mb-3">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-amber-600 transition-colors duration-300"
                                    placeholder=""
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-gray-600 text-sm mb-3">
                                    Your Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className="w-full border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-amber-600 transition-colors duration-300 resize-none"
                                    placeholder=""
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-8">
                                <button
                                    type="submit"
                                    className="bg-amber-800 hover:bg-amber-900 text-white px-12 py-4 tracking-widest text-sm font-light transition-colors duration-300"
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
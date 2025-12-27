
import Input from '@components/forms/Input';
import Textarea from '@components/forms/Textarea';
import { useState } from 'react';


export default function ContactForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        description: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    return (
        <section className="relative py-12">
            {/* Background Image */}
            <img
                src="/assets/herosection-Container.png"
                alt="Contact Background"
                className="absolute inset-0 w-full h-125 object-cover"
            />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl lg:text-[70px] font-bold text-gray-900 mb-4">Contact Us</h2>
                <div className="bg-white rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left side - Image */}
                        <div className="relative h-64 lg:h-auto">
                            <img
                                src="/assets/customer-care.png"
                                alt="Customer Care"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Right side - Form */}
                        <div className="p-8 lg:p-12">
                            <div className="mb-8">
                                <div className="mb-6">
                                    <div className="text-xl lg:text-[40px] font-semibold text-primary mb-2">
                                        Get in touch with us
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Have a question or need assistance? Get in touch and we're ready to help.
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input
                                    title="Full Name"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    required
                                />

                                <Input
                                    title="Email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    required
                                />

                                <Input
                                    title="Subject"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder="Enter your subject"
                                    required
                                />

                                <Textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter description"
                                    required
                                />
                                {/* Submit Button */}
                                <button className="bg-primary text-white px-8 py-1 rounded-full text-lg hover:bg-border">
                                    Get Started
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { useState } from 'react';
import { fakeDb } from '../fakeDB/fakeDb';

export default function FAQ() {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <section className="py-16">
            <div className="max-w-4xl mx-auto px-2 md:px-8">
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-3xl md:text-[40px] text-center font-bold text-secondary mb-4 animate-fade-in-up">
                        Frequently Asked Question
                    </h2>
                    <p className="max-w-125 text-center animate-fade-in-up animation-delay-200">
                        Here is a list of frequently asked questions. Simply tap on any question to reveal its answer
                        and gain more information.
                    </p>
                </div>

                <div className="space-y-4 bg-white border border-gray-200 rounded-lg p-2 md:p-8">
                    {fakeDb.faqs.map((faq: any, index: any) => (
                        <div
                            key={faq.id}
                            className={`rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform animate-fade-in-up`}
                        >
                            <div
                                className={`w-full p-3 cursor-pointer transition-all duration-300 ease-in-out text-left ${
                                    openFAQ === index ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
                                }`}
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium text-gray-900 text-left pr-4 transition-colors duration-200">
                                        {faq.question}
                                    </h3>
                                    <div
                                        className={`text-2xl transition-all duration-300 ease-in-out shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                            openFAQ === index
                                                ? 'transform rotate-45'
                                                : 'text-gray-400 hover:text-primary hover:bg-gray-100'
                                        }`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div
                                id={`faq-answer-${index}`}
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="p-4 pt-0 border-t border-gray-100 bg-gray-50">
                                    <div
                                        className={`transform transition-all duration-300 ease-in-out ${
                                            openFAQ === index ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                                        }`}
                                    >
                                        <p className="text-gray-600 leading-relaxed pt-3">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    title?: string;
    containerClassName?: string;
}

export default function Textarea({ title, containerClassName = '', className = '', ...props }: TextareaProps) {
    return (
        <div className={containerClassName}>
            {title && (
                <label htmlFor={props.id} className="block mb-1 text-secondary font-semibold text-[15px]">
                    {title}
                    {props.required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}
            <textarea
                className={`w-full px-4 py-3 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none transition-colors bg-[#F7F7FD] focus:bg-white resize-none text-[14px] placeholder-[#52525B] font-medium ${className}`}
                {...props}
            />
        </div>
    );
}

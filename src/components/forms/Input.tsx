import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    title?: string;
    containerClassName?: string;
}

export default function Input({ title, containerClassName = '', className = '', ...props }: InputProps) {
    return (
        <div className={containerClassName}>
            {title && (
                <label htmlFor={props.id} className="block mb-1 text-[#002E62] font-semibold text-[15px]">
                    {title}
                    {props.required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}
            <input
                className={`w-full px-4 py-3 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none transition-colors bg-[#F7F7FD] focus:bg-white placeholder-[#52525B] text-[14px] font-medium ${className}`}
                {...props}
            />
        </div>
    );
}

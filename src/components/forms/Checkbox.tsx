import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: React.ReactNode;
    helperText?: React.ReactNode;
    containerClassName?: string;
}

export default function Checkbox({
    label,
    helperText,
    containerClassName = '',
    className = '',
    ...inputProps
}: CheckboxProps) {
    return (
        <label
            htmlFor={inputProps.id}
            className={`group inline-flex w-full select-none items-start gap-3 text-[#3F3F46] ${containerClassName}`}
        >
            <span className="relative flex h-6 w-6 flex-none items-center justify-center">
                <input
                    {...inputProps}
                    type="checkbox"
                    className={`peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-md ${className}`}
                />
                <span
                    aria-hidden
                    className="pointer-events-none block h-full w-full rounded-md border border-[#C5CBD6] bg-white transition-all duration-200 group-hover:border-[#93A2B6] peer-checked:border-[#1F9D55] peer-checked:bg-[#1F9D55] peer-focus-visible:ring-2 peer-focus-visible:ring-[#1F9D55]/20 peer-focus-visible:ring-offset-2"
                />
                <svg
                    aria-hidden
                    className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 5.5L5 9.5L13 1.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
            <div className="flex-1 text-xs leading-relaxed text-gray-600 sm:text-sm">
                {label}
                {helperText && <span className="mt-1 block text-xs text-gray-500">{helperText}</span>}
            </div>
        </label>
    );
}

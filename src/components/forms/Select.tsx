import { useState, useRef, useEffect } from 'react';

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    title?: string;
    containerClassName?: string;
    className?: string;
    placeholder?: string;
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    name?: string;
}

export default function Select({
    title,
    containerClassName = '',
    className = '',
    placeholder = 'Select an option',
    options = [],
    value,
    onChange,
    required,
    disabled,
    id,
    name,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
        value ? options.find((opt) => opt.value === value) || null : null,
    );
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (value) {
            const option = options.find((opt) => opt.value === value);
            setSelectedOption(option || null);
        }
    }, [value, options]);

    const handleSelect = (option: SelectOption) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange?.(option.value);
    };

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };
    return (
        <div className={containerClassName}>
            {title && (
                <label htmlFor={id} className="block mb-1 text-secondary font-semibold text-[15px]">
                    {title}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}
            <div className="relative" ref={selectRef}>
                {/* Hidden input for form submission */}
                <input type="hidden" name={name} value={selectedOption?.value || ''} />

                {/* Custom select trigger */}
                <button
                    type="button"
                    onClick={toggleDropdown}
                    disabled={disabled}
                    className={`w-full px-4 py-3 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none transition-colors bg-[#F7F7FD] focus:bg-white text-[14px] font-medium flex items-center justify-between ${
                        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    } ${className}`}
                >
                    <span
                        className={`flex-1 text-left truncate ${selectedOption ? 'text-[#1a1a1a]' : 'text-[#52525B]'}`}
                    >
                        {selectedOption?.label || placeholder}
                    </span>
                    <svg
                        className={`h-4 w-4 text-[#64748B] transition-transform duration-200 shrink-0 ml-2 ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                </button>

                {/* Dropdown options */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E0DEF7] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleSelect(option)}
                                className="w-full px-4 py-3 cursor-pointer text-left text-[14px] font-medium text-[#374151] hover:bg-[#F7F7FD] focus:bg-[#F7F7FD] focus:outline-none transition-colors border-b border-[#F1F5F9] last:border-b-0 flex items-center justify-start"
                            >
                                <span className="text-left truncate">{option.label}</span>
                            </div>
                        ))}
                        {options.length === 0 && (
                            <div className="px-4 py-3 text-left text-[14px] text-[#64748B]">No options available</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

import { useState, useRef, useEffect } from 'react';
import Input from './Input';


interface Facility {
    label: string;
    value: string;
    units?: number;
}

interface FacilitiesMultiSelectProps {
    title?: string;
    containerClassName?: string;
    value?: Facility[];
    onChange?: (facilities: Facility[]) => void;
    required?: boolean;
}

const AVAILABLE_FACILITIES: Omit<Facility, 'units'>[] = [
    { label: 'Living Room', value: 'living_room' },
    { label: 'Bedroom', value: 'bedroom' },
    { label: 'Bathroom/ Toilet', value: 'bathroom' },
    { label: 'Kitchen', value: 'kitchen' },
    { label: 'Store', value: 'store' },
];

export default function FacilitiesMultiSelect({
    title,
    containerClassName = '',
    value = [],
    onChange,
    required,
}: FacilitiesMultiSelectProps) {
    const [selectedFacilities, setSelectedFacilities] = useState<Facility[]>(value);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setSelectedFacilities(value);
    }, [value]);

    const toggleFacility = (facility: Omit<Facility, 'units'>) => {
        const isSelected = selectedFacilities.some((f) => f.value === facility.value);

        let updatedFacilities: Facility[];

        if (isSelected) {
            // Remove facility if unchecked
            updatedFacilities = selectedFacilities.filter((f) => f.value !== facility.value);
        } else {
            // Add facility with default units of 1
            updatedFacilities = [...selectedFacilities, { ...facility, units: 1 }];
        }

        setSelectedFacilities(updatedFacilities);
        onChange?.(updatedFacilities);
    };

    const updateUnits = (facilityValue: string, units: number) => {
        const updatedFacilities = selectedFacilities.map((f) => (f.value === facilityValue ? { ...f, units } : f));

        setSelectedFacilities(updatedFacilities);
        onChange?.(updatedFacilities);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const getDisplayText = () => {
        if (selectedFacilities.length === 0) return 'Select facilities';
        if (selectedFacilities.length === 1) return selectedFacilities[0].label;
        return `${selectedFacilities.length} facilities selected`;
    };

    return (
        <div className={containerClassName}>
            {title && (
                <label className="block mb-1 text-secondary font-semibold text-[15px]">
                    {title}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}

            <div className="relative" ref={dropdownRef}>
                {/* Hidden input for form submission */}
                <input type="hidden" value={JSON.stringify(selectedFacilities)} />

                {/* Dropdown trigger */}
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="w-full px-4 py-3 border border-[#E0DEF7] rounded-lg focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none transition-colors bg-white focus:bg-white text-[14px] font-semibold flex items-center justify-between"
                >
                    <span className={selectedFacilities.length > 0 ? 'text-[#1a1a1a]' : 'text-[#52525B]'}>
                        {getDisplayText()}
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

                {/* Dropdown content */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E0DEF7] rounded-lg shadow-lg z-50">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E2E8F0]">
                                <span className="text-[14px] font-semibold text-[#374151]">Facilities</span>
                                <span className="text-[14px] font-semibold text-[#374151]">Unit</span>
                            </div>

                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                {AVAILABLE_FACILITIES.map((facility) => {
                                    const selectedFacility = selectedFacilities.find((f) => f.value === facility.value);
                                    const isSelected = !!selectedFacility;

                                    return (
                                        <div key={facility.value} className="flex items-center justify-between">
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggleFacility(facility)}
                                                        className="sr-only"
                                                    />
                                                    <div
                                                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                                            isSelected
                                                                ? 'bg-[#22C55E] border-[#22C55E]'
                                                                : 'bg-white border-[#D1D5DB]'
                                                        }`}
                                                    >
                                                        {isSelected && (
                                                            <svg
                                                                className="w-3 h-3 text-white"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                                <span
                                                    className={`text-[14px] font-medium ${
                                                        isSelected ? 'text-[#1F2937]' : 'text-[#6B7280]'
                                                    }`}
                                                >
                                                    {facility.label}
                                                </span>
                                            </label>

                                            <div className="w-16">
                                                {isSelected && (
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        value={selectedFacility?.units || 1}
                                                        onChange={(e: any) =>
                                                            updateUnits(facility.value, parseInt(e.target.value) || 0)
                                                        }
                                                        className="text-center text-[14px] px-2 py-1"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

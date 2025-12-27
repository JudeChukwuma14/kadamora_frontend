import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export interface PhoneNumberInputProps {
    id?: string;
    name?: string;
    title?: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
    defaultCountry?: string; // ISO2, e.g., 'ng'
}

export default function PhoneNumberInput({
    id = 'phone',
    name = 'phone',
    title,
    value,
    onChange,
    required,
    disabled,
    defaultCountry = 'ng',
}: PhoneNumberInputProps) {
    return (
        <div>
            {title ? (
                <label htmlFor={id} className="block mb-1 text-secondary font-semibold text-[15px]">
                    {title}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            ) : null}

            {/* Styled wrapper to match design */}
            <div className="relative rounded-lg border border-[#E0DEF7] bg-[#F7F7FD] px-2 py-1.5 focus-within:ring-2 focus-within:ring-[#002E62]/70 focus-within:border-transparent focus-within:bg-white transition-colors">
                {/* Divider after country button */}
                <span className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 h-6 border-l border-[#E6EAF2]" />

                <PhoneInput
                    defaultCountry={defaultCountry as any}
                    value={value}
                    onChange={onChange}
                    placeholder="Enter your phone number"
                    className="w-full"
                    inputClassName="!w-full !px-3 !py-2.5 !bg-transparent !border-0 !outline-none !ring-0 !shadow-none !text-[14px] !font-medium placeholder:!text-[#52525B]"
                    inputProps={{ id, name, required, disabled }}
                    countrySelectorStyleProps={{
                        buttonClassName:
                            '!h-9 !px-2 !bg-white !border !border-[#E6EAF2] !rounded-md !shadow-none !outline-none',
                        dropdownArrowClassName: '!text-gray-500',
                    }}
                />
            </div>
        </div>
    );
}

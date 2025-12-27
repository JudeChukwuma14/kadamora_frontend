export interface RadioOption<T extends string | number> {
    label: string;
    value: T;
}

interface RadioGroupProps<T extends string | number> {
    title?: string;
    name: string;
    value: T;
    onChange: (val: T) => void;
    options: RadioOption<T>[];
    inline?: boolean;
    /** If true (default), stack options vertically on small screens and switch to horizontal at md breakpoint when inline */
    stackMobile?: boolean;
    className?: string;
    optionClassName?: string;
}

export const RadioGroup = <T extends string | number>({
    title,
    name,
    value,
    onChange,
    options,
    inline = true,
    stackMobile = true,
    className = '',
    optionClassName = '',
}: RadioGroupProps<T>) => {
    const containerClasses = inline
        ? stackMobile
            ? 'flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-8'
            : 'flex flex-wrap gap-8'
        : 'space-y-3';

    return (
        <div className={className}>
            {title && <p className="block mb-2 text-secondary font-semibold text-[15px]">{title}</p>}
            <div className={containerClasses}>
                {options.map((opt) => {
                    const checked = opt.value === value;
                    return (
                        <label
                            key={String(opt.value)}
                            className={`inline-flex items-center gap-2 cursor-pointer select-none group ${optionClassName}`}
                        >
                            <input
                                type="radio"
                                name={name}
                                value={String(opt.value)}
                                checked={checked}
                                onChange={() => onChange(opt.value)}
                                className="sr-only"
                            />
                            <span
                                className={`relative flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${checked ? 'border-[#002E62]' : 'border-[#E0DEF7]'}`}
                            >
                                <span
                                    className={`h-2 w-2 rounded-full transition-all ${checked ? 'bg-[#002E62]' : 'bg-transparent'}`}
                                ></span>
                            </span>
                            <span
                                className={`tracking-wide text-[14px] font-medium transition-colors ${checked ? 'text-[#002E62]' : 'text-secondary'} group-hover:text-[#002E62]`}
                            >
                                {opt.label}
                            </span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default RadioGroup;

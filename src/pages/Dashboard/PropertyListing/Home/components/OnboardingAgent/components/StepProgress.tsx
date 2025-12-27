import React from 'react';

interface StepProgressProps {
    current: number;
}

const stepsData = [
    {
        id: 1,
        title: 'Professional Details',
        desc: 'Lorem ipsum dolor sit amet consectetur. Vulputate nec dictum quam congue massa.',
    },
    {
        id: 2,
        title: 'Verification And Legal Documents',
        desc: 'Lorem ipsum dolor sit amet consectetur. Tellus nunc odio enim ut sit rutrum morbi.',
    },
];

const StepProgress: React.FC<StepProgressProps> = ({ current }) => (
    <aside className="w-105 min-w-105 h-full bg-[#F6FAFF] flex flex-col justify-start px-10 pt-16 pb-0 rounded-tl-2xl rounded-bl-2xl">
        <div className="text-[23px] font-bold leading-tight text-[#0F172A] mb-14">
            Become an <span className="text-[#16A34A]">Agent/Realtor</span>
        </div>
        <ol className="relative flex flex-col gap-5">
            {stepsData.map((s, idx) => {
                const active = current === s.id;
                const completed = s.id < current; // previous steps
                const isLast = idx === stepsData.length - 1;
                return (
                    <li key={s.id} className="relative flex items-start gap-6">
                        {/* Bullet + Connector column */}
                        <div className="relative flex flex-col items-center mt-1">
                            {/* Outer halo */}
                            <span className="relative h-6 w-6 flex items-center justify-center">
                                <span className="absolute inset-0 rounded-full bg-[#E4E7EC]" />
                                {/* Middle ring */}
                                <span
                                    className={`relative h-4 w-4 rounded-full ${active || completed ? 'bg-[#16A34A]' : 'bg-[#C7D2E7]'} flex items-center justify-center transition-colors`}
                                >
                                    <span
                                        className={`h-1 w-1 rounded-full ${active ? 'bg-white' : completed ? 'bg-white' : 'bg-[#C7D2E7]'} block transition-colors`}
                                    />
                                </span>
                            </span>
                            {!isLast && (
                                <span
                                    className={`block w-0.5 mt-0.5 h-20.5 ${active || completed ? 'bg-[#16A34A]' : 'bg-[#C7D2E7]'}`}
                                />
                            )}
                        </div>
                        {/* Text content */}
                        <div className="pt-2">
                            <p
                                className={`text-[16px] font-semibold leading-tight mb-2 text-secondary transition-colors`}
                            >
                                {s.title}
                            </p>
                            <p className="text-[12px] leading-[1.55] tracking-[0.2px] text-[#3F3F46] max-w-160">
                                {s.desc}
                            </p>
                        </div>
                    </li>
                );
            })}
        </ol>
    </aside>
);

export default StepProgress;

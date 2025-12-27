import React from 'react';
import { type StepDef } from './types';

interface Props {
    steps: StepDef[];
    currentIdx: number;
    listingType: string;
}

const circleBullet = (active: boolean, completed: boolean) => (
    <div className="relative flex items-center justify-center">
        <div
            className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                active || completed ? 'bg-[#359F6A] border-[#359F6A]' : 'bg-[#94A3B8] border-[#94A3B8]'
            }`}
        >
            {(active || completed) && <div className="h-2 w-2 bg-white rounded-full"></div>}
        </div>
    </div>
);

const StepsSidebar: React.FC<Props> = ({ steps, currentIdx, listingType }) => {
    return (
        <aside className="hidden md:flex w-full h-full flex-col bg-[#F6FAFF] p-8">
            <div className="mb-12">
                <h1 className="text-[32px] font-semibold text-[#1E293B] leading-tight">
                    List Property for <span className="text-[#359F6A]">{listingType}</span>
                </h1>
            </div>
            <div className="flex flex-col space-y-8">
                {steps.map((s, idx) => {
                    const active = idx === currentIdx;
                    const completed = idx < currentIdx;
                    return (
                        <div key={s.id} className="relative flex items-start space-x-4">
                            {/* Vertical line */}
                            {idx !== steps.length - 1 && (
                                <div className="absolute left-1.75 top-8 w-0.5 h-16 bg-[#E2E8F0]"></div>
                            )}

                            {/* Circle bullet */}
                            <div className="shrink-0 mt-1">{circleBullet(active, completed)}</div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className={`text-[18px] font-semibold mb-2 text-[#002E62]`}>{s.title}</h3>
                                <p className="text-[14px] text-[#71717A] leading-relaxed">{s.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
};

export default StepsSidebar;

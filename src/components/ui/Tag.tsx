import React from 'react';

export type TagVariant = 'default' | 'muted' | 'success' | 'info' | 'warning';

export interface TagProps {
    children?: React.ReactNode;
    label?: string;
    icon?: React.ReactNode;
    variant?: TagVariant;
    className?: string;
}

const VARIANT_CLASSES: Record<TagVariant, string> = {
    default: 'bg-[#F1F9FF] text-[#0A66B2] border border-[#CFE8FF]',
    muted: 'bg-[#FAFBFC] text-[#475467] border border-[#EEF2F5]',
    success: 'bg-[#E6F9F0] text-[#0B7A52] border border-[#DFF4EA]',
    info: 'bg-[#F6F9FF] text-[#0A66B2] border border-[#EAF5FF]',
    warning: 'bg-[#FFF8E8] text-[#9A6B1A] border border-[#FEF2C7]',
};

const Tag: React.FC<TagProps> = ({ label, children, icon, variant = 'default', className = '' }) => {
    const content = children ?? label;
    return (
        <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold ${VARIANT_CLASSES[variant]} ${className}`}
            role="status"
        >
            {icon ? <span className="flex items-center justify-center">{icon}</span> : null}
            <span>{content}</span>
        </div>
    );
};

export default Tag;
import React from 'react';

interface PropertyItem {
    label: string;
    value: string;
}

interface CategoryCardProps {
    data: PropertyItem[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({ data }) => {
    // Split list into two halves for left and right columns
    const midpoint = Math.ceil(data.length / 2);
    const leftItems = data.slice(0, midpoint);
    const rightItems = data.slice(midpoint);

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 gap-x-8">
                {/* LEFT SIDE */}
                <div className="flex flex-col space-y-6">
                    {leftItems.map((item, index) => (
                        <div key={index}>
                            <p className="text-lg font-medium text-[#002E62]">{item.value}</p>
                            <p className="text-sm text-gray-500">{item.label}</p>
                        </div>
                    ))}
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col space-y-6 text-left md:text-right mt-6 md:mt-0">
                    {rightItems.map((item, index) => (
                        <div key={index}>
                            <p className="text-lg font-medium text-[#002E62]">{item.value}</p>
                            <p className="text-sm text-gray-500">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;

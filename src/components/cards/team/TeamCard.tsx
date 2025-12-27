interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
}

interface TeamCardProps {
    member: TeamMember;
    reversed?: boolean;
}

export default function TeamCard({ member, reversed = false }: TeamCardProps) {
    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Image */}
            <div
                className={`bg-gray-300 rounded-lg h-80 md:h-[571px] md:w-[449px] flex items-center justify-center flex-shrink-0 relative ${reversed ? 'md:order-2' : ''}`}
            >
                {/* Half border on the left side */}
                <div className="absolute left-[-10px] bottom-0 w-[15px] h-1/2 bg-[#359F6A]"></div>

                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                            parent.innerHTML = '<span class="text-gray-600 text-lg">Team Member Image</span>';
                        }
                    }}
                />
            </div>

            {/* Content */}
            <div className={`flex-1 ${reversed ? 'md:order-1' : ''}`}>
                <div className="text-primary text-sm font-medium mb-2">{member.role}</div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{member.name}</h3>
                <div className="text-gray-600 leading-[38px]">
                    <p>{member.bio}</p>
                </div>
            </div>
        </div>
    );
}

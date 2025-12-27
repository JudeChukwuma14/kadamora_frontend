import TeamCard from "@components/cards/team/TeamCard";
import { fakeDb } from "@components/fakeDB/fakeDb";

export default function Teams() {
    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary">The Core Team</h2>
                    <p className="text-gray-600 text-lg">Meet the mind behind Kadamora.</p>
                </div>

                {/* Team Members */}
                <div className="space-y-16">
                    {fakeDb.teams.map((member) => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
}

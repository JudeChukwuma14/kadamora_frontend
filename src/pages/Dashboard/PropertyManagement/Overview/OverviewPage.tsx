import React from 'react';
import StatCard from './components/StatCard';
import totalRevenueIcon from './components/icons/total_revenue.svg';
import totalPropertiesIcon from './components/icons/total_properties.svg';
import activeTenantsIcon from './components/icons/active_tenants.svg';
import maintenanceRequestIcon from './components/icons/maintenance_request.svg';
import ActiveRequests from './components/ActiveRequests';
import RecentActivities from './components/RecentActivities';

const OverviewPage: React.FC = () => {
    const stats = [
        {
            id: 1,
            title: 'Total Expected Revenue',
            value: 'NGN 2,450,000',
            icon: <img src={totalRevenueIcon} alt="Total Revenue" className="h-12 w-12" />,
        },
        {
            id: 2,
            title: 'Total Properties',
            value: '04',
            icon: <img src={totalPropertiesIcon} alt="Total Properties" className="h-12 w-12" />,
        },
        {
            id: 3,
            title: 'Active Tenants',
            value: '03',
            icon: <img src={activeTenantsIcon} alt="Active Tenants" className="h-12 w-12" />,
        },
        {
            id: 4,
            title: 'Maintenance Requests',
            value: '03',
            icon: <img src={maintenanceRequestIcon} alt="Maintenance Requests" className="h-12 w-12" />,
        },
    ];

    const activeRequests = [
        {
            id: 1,
            title: 'Leaking Bathroom Faucet',
            description:
                'Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat. Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor non fringilla nec curae. Purus ac morbi nunc.',
            assignee: 'Michael Chamberlain',
            property: 'Hilltop Diamond',
            cost: '35,000.00',
            serviceType: 'Plumber',
            status: 'In-progress' as const,
            priority: 'High' as const,
            assignedTo: 'Chukwu & Co Plumbing Services',
            scheduled: '03 June, 2025',
        },
        {
            id: 2,
            title: 'AC not Working',
            description:
                'AC is blowing warm air and not cooling properly. Technician check suggests a refrigerant leak and compressor failure.',
            assignee: 'Nasiru Abibathu',
            property: 'Hiltop Diamond',
            cost: '45,000.00',
            serviceType: 'Electrician',
            status: 'Pending' as const,
            priority: 'High' as const,
        },
        {
            id: 3,
            title: 'Circuit Overheating',
            description:
                'Electrical circuit keeps tripping and overheats under load during evening hours. Urgent inspection required.',
            assignee: 'Nasiru Abibathu',
            property: 'Dominion Diamond',
            cost: '12,200.00',
            serviceType: 'Electrician',
            status: 'Pending' as const,
            priority: 'Medium' as const,
        },
    ];

    const activities = [
        {
            id: 1,
            title: 'Rent Payment received',
            subtitle: 'Femiayo Doruchi — Hilltop Diamond A — ₦ 340,000',
            date: '06 June, 2025',
            type: 'payment' as const,
        },
        {
            id: 2,
            title: 'Rent Payment received',
            subtitle: 'Femiayo Doruchi — Hilltop Gold C — ₦ 520,000',
            date: '06 June, 2025',
            type: 'payment' as const,
        },
        {
            id: 3,
            title: 'Lease expiry notice sent',
            subtitle: 'Emmanuel Davis — Dominion Estate Gold F — 30 days',
            date: '06 June, 2025',
            type: 'notice' as const,
        },
        {
            id: 4,
            title: 'Maintenance Report submitted',
            subtitle: 'Chukwudi Abayo — CityVille Block A — Faulty AC',
            date: '06 June, 2025',
            type: 'maintenance' as const,
        },
    ];

    return (
        <div className="pb-10">
            <div className="mb-6 mt-4 mx-auto max-w-7xl">
                {/* Main columns */}
                <div className="mt-6 flex flex-col md:flex-row gap-6">
                    <div>
                        {/* Stats */}
                        <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 mb-3.75">
                            {stats.map((s) => (
                                <StatCard key={s.id} title={s.title} value={s.value} icon={s.icon} />
                            ))}
                        </div>
                        <ActiveRequests requests={activeRequests} />
                    </div>
                    <div>
                        <RecentActivities items={activities} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewPage;

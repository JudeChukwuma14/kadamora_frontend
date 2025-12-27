export interface ServiceItem {
    id: number;
    title: string;
    description: string;
    icon: string;
    active: boolean;
    url?: string;
}

export const services: ServiceItem[] = [
    {
        id: 1,
        title: 'Property listing, management and investment',
        description: 'Professionals listing properties on behalf of others or managing sales/rentals.',
        icon: '/assets/icons/property_listing.svg',
        active: true,
        url: '/dashboard/property-listing',
    },
    {
        id: 2,
        title: 'Facility Management',
        description: 'Individuals or firms interested in purchasing or investing in properties.',
        icon: '/assets/icons/facility_management.svg',
        active: false,
    },
    {
        id: 3,
        title: 'Professional Services Marketplace',
        description:
            'Individuals or businesses actively searching for residential or commercial properties to rent or lease.',
        icon: '/assets/icons/professional_service.svg',
        active: false,
    },
    {
        id: 4,
        title: 'Construction Supplies & Equipment Hubs',
        description:
            'Vendors offering services like facility management, procurement, cleaning, security, repairs, etc.',
        icon: '/assets/icons/construction_supplies.svg',
        active: false,
    },
    {
        id: 5,
        title: 'Project Constructions Management',
        description: 'Firms involved in construction, project management, or estate development.',
        icon: '/assets/icons/project_constructions.svg',
        active: false,
    },
    {
        id: 6,
        title: 'Hospitality and Tour',
        description:
            'Vendors offering services like facility management, procurement, cleaning, security, repairs, etc.',
        icon: '/assets/icons/hospitality.svg',
        active: false,
    },
];

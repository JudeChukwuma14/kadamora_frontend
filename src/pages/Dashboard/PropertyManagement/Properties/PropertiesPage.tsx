import React from 'react';
import PropertyCard2 from '../../../../components/cards/card/PropertyCard2';

const mockProperties = [
    { id: 1, name: 'Sunset Gardens', address: '112, Oak Street Yaba, Lagos', tenants: 32 },
    { id: 2, name: 'Hilltop', address: '02, Ademola Adetokunbo Crescent, Wuse 2 Abuja', tenants: 30 },
    { id: 3, name: 'Dominion Estate', address: 'Abacha Close, Gwarimpa, Abuja', tenants: 12 },
    { id: 4, name: 'Hilton Estate', address: 'Abacha Close, Gwarimpa, Abuja', tenants: 56 },
    { id: 5, name: 'De Villa', address: 'Abacha Close, Gwarimpa, Abuja', tenants: 8 },
    { id: 6, name: 'Oak City', address: 'Abacha Close, Gwarimpa, Abuja', tenants: 12 },
];

const PropertiesPage: React.FC = () => {
    return (
        <div className="pb-10">
            <div className="mb-6 mt-4 max-w-300 mx-auto">
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockProperties.map((p) => (
                        <PropertyCard2 key={p.id} id={p.id} name={p.name} address={p.address} tenants={p.tenants} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PropertiesPage;

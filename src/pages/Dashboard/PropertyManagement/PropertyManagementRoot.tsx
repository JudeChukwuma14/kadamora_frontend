import React, { useMemo } from 'react';
import { Route, Routes, NavLink, useLocation } from 'react-router';
import AddPropertyFlowModal from './Properties/components/AddPropertyFlowModal';
import CreateAnnouncementModal from './Communication/components/CreateAnnouncementModal';
import OverviewPage from './Overview/OverviewPage';
import PropertiesPage from './Properties/PropertiesPage';
import TenantsPage from './Tenant/TenantsPage';
import AddTenantModal from './Tenant/components/AddTenantModal';
import MaintenancePage from './Maintainance/MaintenancePage';
import CommunicationPage from './Communication/CommunicationPage';
import DocumentPage from './Document/DocumentPage';
import SettingsPage from './Settings/SettingsPage';

const tabs = ['Overview', 'Properties', 'Tenants', 'Maintenance', 'Communication', 'Documents', 'Settings'];

const tabPathMap: Record<string, string> = {
    Overview: '',
    Properties: 'properties',
    Tenants: 'tenants',
    Maintenance: 'maintenance',
    Communication: 'communication',
    Documents: 'documents',
    Settings: 'settings',
};

const actionsMap: Record<string, { label: string; path: string }> = {
    'tenants': { label: 'Add Tenant', path: '/dashboard/property-management/tenants/create' },
    'communication': { label: 'Create Announcement', path: '/dashboard/property-management/communication/create' },
    'properties': { label: 'Add Property', path: '/dashboard/property-management/properties/create' },
    '': { label: 'Add Property', path: '/dashboard/property-management/properties/create' },
};

const modalActions: Record<string, string> = {
    'Add Property': 'addProperty',
    'Add Tenant': 'addTenant',
    'Create Announcement': 'announcement',
};

const PropertyManagementRoot: React.FC = () => {
    const tabRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);

    const handleTabClick = (idx: number) => {
        const ref = tabRefs.current[idx];
        if (ref) {
            ref.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    };

    const location = useLocation();

    const activeSegment = useMemo(() => {
        const base = '/dashboard/property-management';
        const tail = location.pathname.startsWith(base) ? location.pathname.slice(base.length) : location.pathname;
        return tail.split('/').filter(Boolean)[0] || '';
    }, [location.pathname]);

    const action = actionsMap[activeSegment] || actionsMap[''];

    const [modals, setModals] = React.useState({
        addProperty: false,
        addTenant: false,
        announcement: false,
    });

    const handleAction = () => {
        const modalKey = modalActions[action.label];
        if (modalKey) {
            setModals((prev) => ({ ...prev, [modalKey]: true }));
        }
    };

    const closeModal = (modalKey: string) => {
        setModals((prev) => ({ ...prev, [modalKey]: false }));
    };

    const getTabClassName = (isActive: boolean) =>
        `font-medium px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-200 ${
            isActive ? 'bg-[#f3f9ff] text-[#002E62]' : 'text-[#71717A] border border-[#E4E4E7]'
        } md:px-3 md:py-1.5 md:border md:rounded-md border-0 md:border`;

    const getButtonLabel = (label: string) => {
        if (label.startsWith('+')) return label;
        if (label === 'Create Announcement') return 'Create Announcement';
        return `+ ${label.replace(/^Add /, '')}`;
    };

    return (
        <div className="pb-10">
            <AddPropertyFlowModal open={modals.addProperty} onClose={() => closeModal('addProperty')} />
            <AddTenantModal open={modals.addTenant} onClose={() => closeModal('addTenant')} />
            <CreateAnnouncementModal open={modals.announcement} onClose={() => closeModal('announcement')} />
            <div className="mb-6 mt-4 max-w-300 mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[25px] font-semibold text-[#002E62] leading-snug">Property Management</h1>
                        <nav className="mb-2 text-[13px] flex items-center gap-1 text-[#475467]">
                            <a href="/dashboard/home" className="hover:underline">
                                Home
                            </a>
                            <span>/</span>
                            <span className="text-[#0A66B2]">Manage My Property</span>
                        </nav>
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-2 flex-wrap bg-white p-2 md:justify-between">
                    <div className="w-full md:flex-1 overflow-x-auto scrollbar-hide md:overflow-visible">
                        <div className="flex items-center gap-2 flex-nowrap md:flex-nowrap bg-white p-2">
                            {tabs.map((t, idx) => (
                                <NavLink
                                    key={t}
                                    to={
                                        tabPathMap[t] === ''
                                            ? '/dashboard/property-management'
                                            : `/dashboard/property-management/${tabPathMap[t]}`
                                    }
                                    end={tabPathMap[t] === ''}
                                    className={({ isActive }) => getTabClassName(isActive)}
                                    ref={(el) => {
                                        tabRefs.current[idx] = el;
                                    }}
                                    onClick={() => handleTabClick(idx)}
                                >
                                    {t}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex ml-4 items-center">
                        <button
                            onClick={handleAction}
                            className="px-4 py-2 rounded-md border border-[#CCE3FD] bg-white text-[#0A66B2] hover:bg-[#F4F8FF]"
                            aria-label={action.label}
                        >
                            {getButtonLabel(action.label)}
                        </button>
                    </div>

                    <div className="md:hidden w-full mt-3 flex justify-center">
                        <button
                            onClick={handleAction}
                            className="w-full max-w-xs px-4 py-2 rounded-md border border-[#CCE3FD] bg-white text-[#0A66B2] hover:bg-[#F4F8FF]"
                            aria-label={action.label}
                        >
                            {action.label}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-300 mx-auto">
                <Routes>
                    <Route index element={<OverviewPage />} />
                    <Route path="properties" element={<PropertiesPage />} />
                    <Route path="tenants" element={<TenantsPage />} />
                    <Route path="maintenance" element={<MaintenancePage />} />
                    <Route path="communication" element={<CommunicationPage />} />
                    <Route path="documents" element={<DocumentPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Routes>
            </div>
        </div>
    );
};

export default PropertyManagementRoot;

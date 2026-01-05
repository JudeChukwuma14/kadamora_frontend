import React, { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { mockProperties } from './fakedb';
import FilterBlocks, { MobileFilterModal } from './FilterBlocks';
import ProductCard from '../../../../components/cards/product/ProductCard';
import QuickActionCard from './components/QuickActionCard';
import OnboardingAgentFlowModal from './components/OnboardingAgent/OnboardingAgentFlowModal';
import VerificationInProgressModal from './components/VerificationInProgressModal';
import ListPropertyFlowModal from './components/ListPropertyFlow/ListPropertyFlowModal';
import { useGetAgentProfileQuery } from '@store/api/propertyAgent.api';
const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 2 }).format(n);

const PropertyManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [listFlowOpen, setListFlowOpen] = useState(false);
    const [onboardingOpen, setOnboardingOpen] = useState(false);
    const [onboardingStep, setOnboardingStep] = useState(0);
    const [verificationInProgressOpen, setVerificationInProgressOpen] = useState(false);
 
    const filtered = useMemo(
        () => mockProperties.filter((p) => p.title.toLowerCase().includes(search.toLowerCase())),
        [search],
    );
    const {
  data: agentProfiles,
  isLoading: isLoadingProfile,
  isError,
  error,
} = useGetAgentProfileQuery();

const agentProfile = agentProfiles?.data
const profileNotFound =
  isError &&
  'status' in (error as any) &&
  (error as any).status === 404;

const profileError =
  isError && !profileNotFound
    ? 'Unable to load agent profile. Please try again later.'
    : null;

    const normalizedStatus = useMemo (() => {
        const status = agentProfile?.status;
        if(!status || typeof status !== 'string') return null;
        const upperStatus = status.toUpperCase();
        if(upperStatus === 'PENDING' || upperStatus === 'APPROVED' || upperStatus === 'REJECTED'){
            return upperStatus
        }
        if(upperStatus === "UNDER_REVIEW"){
            return 'PENDING'
        }
            return null
    }, [agentProfile?.status])

    const hasUploadedDocs = useMemo(() => {
        if (!agentProfile?.documents) return false;
        const docs = agentProfile.documents;
        return (
            (docs.governmentId && docs.governmentId.length > 0) ||
            (docs.businessCertificate && docs.businessCertificate.length > 0) ||
            (docs.proofOdAddress && docs.proofOdAddress.length > 0) 
        )
    }, [agentProfile?.documents]);

    const normalizedProfileStatus = useMemo(() => {
        const raw = agentProfile?.status 
        return typeof raw === 'string' ? raw.trim().toLowerCase() : null;
    }, [agentProfile?.status]);

    const isUnderReview = normalizedProfileStatus === 'under_review';

    // const isAgentVerified = agentProfile?.isVerified ?? normalizedStatus === 'APPROVED';
    const isAgentVerified = useMemo(() => {
        if(agentProfile?.isVerified === true) return true;
        const status = agentProfile?.status?.toUpperCase()
        return status === 'APPROVED';
    }, [agentProfile])

    const determineOnboardingEntryStep = useCallback(() => {
        if (!agentProfile) {
            return 0;
        }
        if(isAgentVerified){
            return 0;
        }
         if (isUnderReview || (normalizedStatus === 'PENDING' && hasUploadedDocs)) {
        return 0; 
        }
        const hasProfessionalDetails = Boolean(
            agentProfile.agencyCompanyName && 
            agentProfile.position && 
            agentProfile.registrationLicenseNumber
        )
        if(!hasProfessionalDetails){
            return 1
        }
        if(!hasUploadedDocs){
            return 2
        }
        return 0;
    }, [agentProfile, hasUploadedDocs, isAgentVerified, isUnderReview, normalizedStatus]);

    const openOnboardingFlow = useCallback(() => {
        const stepToOpen = determineOnboardingEntryStep();
        setOnboardingStep(stepToOpen);
        setOnboardingOpen(true);
    }, [determineOnboardingEntryStep]);
    type VerificationTone = 'pending' | 'success' | 'warning' | 'error';
    interface VerificationState {
        message: string;
        tone: VerificationTone;
    }

    const verificationCopy: VerificationState = useMemo(() => {
        if (isLoadingProfile) return { message: 'Checking your verification status...', tone: 'pending' };
        if (profileError) return { message: profileError, tone: 'error' };
        if (!agentProfile)
            return {
                message: 'Complete your agent profile to unlock property listing tools.',
                tone: 'warning',
            };
        if (isUnderReview) {
            return {
                message: 'Your verification is currently under review. We will notify you once it is approved.',
                tone: 'pending',
            };
        }
        const statusForCopy = normalizedStatus ?? 'PENDING';
        switch (statusForCopy) {
            case 'APPROVED':
                return {
                    message: 'Verification approved. You can now list and manage properties.',
                    tone: 'success',
                };
            case 'REJECTED':
                return {
                    message: 'Your verification was rejected. Update your profile and try again.',
                    tone: 'error',
                };
            case 'PENDING':
            default:
                if (!hasUploadedDocs) {
                    return {
                        message: 'Upload your legal documents to complete verification.',
                        tone: 'warning',
                    };
                }
                return {
                    message: 'Your verification is in progress. We will notify you once it is approved.',
                    tone: 'pending',
                };
        }
    }, [agentProfile, hasUploadedDocs, isLoadingProfile, isUnderReview, normalizedStatus, profileError]);

    const verificationToneClasses: Record<VerificationTone, string> = {
        pending: 'text-[#004493]',
        success: 'text-[#41A36E]',
        warning: 'text-[#B45309]',
        error: 'text-[#DC2626]',
    };

    const productCards = useMemo(
        () =>
            filtered.map((p) => ({
                id: p.id,
                name: p.title,
                price: formatCurrency(p.price),
                description:
                    'Felis sed amet aliqua cursus placerat. Risus morbi sed varius condimentum id odio magna condimentum.',
                category: p.type, // will determine colour in ProductCard
                subCategory: p.tags[1] || p.tags[0] || 'General',
                image: p.img,
            })),
        [filtered],
    );

    return (
        <div className="pb-10">
            <div className="mb-8 mt-4">
                <h1 className="text-[25px] font-semibold text-[#002E62] leading-snug">
                    Property listing, Management and Investment
                </h1>
                <nav className="mb-2 text-[13px] flex items-center gap-1">
                    <Link to="/dashboard/home" className="hover:underline">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-primary">Property listing</span>
                </nav>
            </div>

            {/* Quick Actions */}
            <section className="mb-10">
                <div className="flex md:justify-between md:flex-row flex-col md:items-center mb-5">
                    <div className="text-[#001731] font-semibold text-[17px] md:mb-0 mb-3.75">Quick Actions</div>
                    <div
                        className={`${verificationToneClasses[verificationCopy.tone]} font-semibold flex items-center gap-2`}
                    >
                        <img src="/assets/icons/info.svg" alt="Info" className="h-6 w-6" />
                        <span aria-live="polite">{verificationCopy.message}</span>
                    </div>
                </div>
                <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
                    <QuickActionCard
                        title="List New Property"
                        desc="List your property for rent, lease, shortlet, or sale to reach interested buyers or tenants."
                        onClick={() => {
                            if (isLoadingProfile) {
                                return;
                            }
                            if (profileError && !profileNotFound) {
                                return;
                            }
                            if (isUnderReview) {
                                setVerificationInProgressOpen(true);
                                return;
                            }
                            if (isAgentVerified) {
                                setListFlowOpen(true);
                                return;
                            }
                            openOnboardingFlow();
                        }}
                        icon={<img src="/assets/icons/new_property.svg" alt="List new property" className="h-7 w-7" />}
                        disabled={Boolean(profileError) && !profileNotFound}
                        lockedLabel={profileError ? 'Unavailable' : undefined}
                    />
                    <QuickActionCard
                        title="Manage My Properties"
                        desc="View and manage your listed properties, bookings, and client messages."
                        icon={
                            <img src="/assets/icons/manage_property.svg" alt="Manage properties" className="h-7 w-7" />
                        }
                        onClick={() => navigate('/dashboard/property-management')}
                    />
                    <QuickActionCard
                        title="Offer Investment Opportunities"
                        desc="Offer your properties for investment or explore investment contributions."
                        icon={
                            <img
                                src="/assets/icons/investment.svg"
                                alt="Investment opportunities"
                                className="h-7 w-7"
                            />
                        }
                        disabled
                        lockedLabel="Coming Soon"
                    />
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h3 className="text-[20px] font-semibold text-[#0A2D50] tracking-tight">
                        Explore Properties From Other Users
                    </h3>
                    <div className="w-full md:w-auto">
                        <div className="flex items-center gap-3">
                            <div className="relative w-full md:max-w-xs">
                                <svg
                                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0A2D50]/50"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2" />
                                    <circle cx="11" cy="11" r="7" />
                                </svg>
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search anything"
                                    className="w-full rounded-3xl border border-[#E0E7FF] bg-white py-3 pl-12 pr-4 text-[15px] text-[#0A2D50] shadow-[0_6px_20px_rgba(10,45,80,0.08)] transition focus:border-[#0A2D50] focus:outline-none focus:ring-2 focus:ring-[#0A2D50]/15"
                                />
                            </div>
                            <div className="md:hidden">
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(true)}
                                    className="grid h-12.5 w-12.5 place-items-center rounded-[7px] bg-[#04194E] text-white shadow-[0_8px_20px_rgba(4,25,78,0.25)] transition hover:bg-[#072968] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                                    aria-label="Open filters"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M4 6h16M7 12h10M10 18h4" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-[250px_1fr] gap-6">
                    {/* Filters */}
                    <aside className="space-y-6 hidden lg:block">
                        <FilterBlocks />
                    </aside>
                    {/* Property grid */}
                    <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-6">
                        {productCards.map((p) => (
                            <ProductCard key={p.id} property={p} />
                        ))}
                    </div>
                </div>
            </section>
            <MobileFilterModal open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} />
            <ListPropertyFlowModal open={listFlowOpen} onClose={() => setListFlowOpen(false)} />
            <OnboardingAgentFlowModal
                open={onboardingOpen}
                step={onboardingStep}
                goTo={setOnboardingStep}
                onClose={() => setOnboardingOpen(false)}
            />
            <VerificationInProgressModal
                open={verificationInProgressOpen}
                onClose={() => setVerificationInProgressOpen(false)}
            />
        </div>
    );
};

export default PropertyManagementPage;

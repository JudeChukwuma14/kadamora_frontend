import React, { useCallback, useMemo, useState } from 'react';
import CloseButton from './CloseButton';
import StepProgress from './StepProgress';

import Select from '@components/forms/Select';
import Textarea from '@components/forms/Textarea';
import Input from '@components/forms/Input';
import { useRegisterAgentMutation, type RegisterAgentPayload } from '@store/api/propertyAgent.api';


interface ProfessionalDetailsFormProps {
    next: () => void;
    onClose: () => void;
    current: number;
}

type FormField =
    | 'agencyCompanyName'
    | 'position'
    | 'yearsOfExperience'
    | 'areaOfOperation'
    | 'registrationLicenseNumber'
    | 'linkedinProfile'
    | 'website'
    | 'bio';

const initialForm: Record<FormField, string> = {
    agencyCompanyName: '',
    position: '',
    yearsOfExperience: '',
    areaOfOperation: '',
    registrationLicenseNumber: '',
    linkedinProfile: '',
    website: '',
    bio: '',
};

const requiredFields: FormField[] = [
    'agencyCompanyName',
    'position',
    'yearsOfExperience',
    'areaOfOperation',
    'registrationLicenseNumber',
];

const ProfessionalDetailsForm: React.FC<ProfessionalDetailsFormProps> = ({ next, onClose, current }) => {
    const [formValues, setFormValues] = useState<Record<FormField, string>>(initialForm);
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<FormField, string>>>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [registerAgent, { isLoading }] = useRegisterAgentMutation();


    const updateField = useCallback((field: FormField, value: string) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
        setFieldErrors((prev) => {
            if (!prev[field]) return prev;
            const { [field]: _removed, ...rest } = prev;
            return rest;
        });
        setSubmitError(null);
    }, []);

    const positionOptions = useMemo(
        () => [
            { label: 'Select Position', value: '' },
            { label: 'Independent Realtor', value: 'independent_realtor' },
            { label: 'Sales Agent', value: 'sales_agent' },
            { label: 'Developer', value: 'developer' },
            { label: 'Broker', value: 'broker' },
        ],
        [],
    );

    const validateForm = useCallback(() => {
        const errors: Partial<Record<FormField, string>> = {};
        requiredFields.forEach((field) => {
            if (!formValues[field]?.trim()) {
                errors[field] = 'This field is required.';
            }
        });

        if (formValues.yearsOfExperience) {
            const parsed = Number(formValues.yearsOfExperience);
            if (Number.isNaN(parsed) || parsed < 0) {
                errors.yearsOfExperience = 'Enter a valid number of years.';
            }
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    }, [formValues]);

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setSubmitError(null);

            if (!validateForm()) {
                return;
            }

            const payload: RegisterAgentPayload = {
                agencyCompanyName: formValues.agencyCompanyName.trim(),
                position: formValues.position,
                yearsOfExperience: Number(formValues.yearsOfExperience),
                areaOfOperation: formValues.areaOfOperation.trim(),
                registrationLicenseNumber: formValues.registrationLicenseNumber.trim(),
                bio: formValues.bio.trim(),
                website: formValues.website.trim() || undefined,
                linkedinProfile: formValues.linkedinProfile.trim() || undefined,
            };

            try {
                await registerAgent(payload).unwrap();
                next();
            } catch (error: any) {
                const apiMessage = error?.data?.message || error?.data?.response?.message || 'Unable to save details. Please try again.';
                setSubmitError(apiMessage);
            }
        },
        [formValues, next, validateForm],
    );

    const renderError = useCallback(
        (field: FormField) =>
            fieldErrors[field] ? <p className="text-sm text-red-500 font-medium">{fieldErrors[field]}</p> : null,
        [fieldErrors],
    );

    const errorInputClass = 'border-red-400 focus:ring-red-400/60 focus:border-red-400';

    return (
        <div className="w-full md:w-295 lg:w-310 max-w-[96vw] rounded-xl overflow-hidden flex bg-white shadow-[0_4px_32px_-4px_rgba(15,23,42,0.12)] md:flex-row flex-col md:h-175">
            {/* Desktop sidebar, hidden on mobile */}
            <div className="hidden md:block">
                <StepProgress current={current} />
            </div>
            {/* Mobile header */}
            <div className="md:hidden w-full px-6 pt-6 pb-2 flex items-center justify-between">
                <h2 className="text-[22px] font-bold leading-tight text-[#0F172A]">
                    Become an <span className="text-[#16A34A]">Agent/Realtor</span>
                </h2>
                <CloseButton onClick={onClose} />
            </div>
            <div className="flex-1 flex flex-col md:max-h-none max-h-[80vh]">
                {/* Top bar (desktop) */}
                <div className="h-16 md:flex hidden items-center justify-between pl-10 pr-6 border-b border-[#EDF1F5] bg-white/70 backdrop-blur-sm">
                    <h3 className="text-[15px] font-semibold text-[#001731]">Professional Details</h3>
                    <CloseButton onClick={onClose} />
                </div>
                {/* Mobile step indicator */}
                <div className="md:hidden flex items-center justify-between px-6 pt-2 pb-2">
                    <h3 className="text-[18px] font-semibold text-[#0F172A]">Professional Details</h3>
                    <span className="text-[15px] text-[#64748B] font-medium">{current}/2</span>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                    <div className="md:px-10 px-6 md:pt-10 pt-2 md:pb-8 pb-2 grid md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-7 [&_input]:bg-[#F7F7FD] [&_input:focus]:bg-white [&_select]:bg-[#F7F7FD] [&_select:focus]:bg-white [&_textarea]:bg-[#F7F7FD] [&_textarea:focus]:bg-white">
                        <div className="space-y-2">
                            <Input
                                title="Agency/ Company Name"
                                required
                                value={formValues.agencyCompanyName}
                                onChange={(event) => updateField('agencyCompanyName', event.target.value)}
                                placeholder="Enter your Agency/Company Name"
                                className={`placeholder:font-medium ${fieldErrors.agencyCompanyName ? errorInputClass : ''}`}
                            />
                            {renderError('agencyCompanyName')}
                        </div>
                        <div className="space-y-2">
                            <Select
                                title="Position"
                                required
                                value={formValues.position}
                                onChange={(value) => updateField('position', value)}
                                options={positionOptions}
                                className={`font-semibold text-[#52525B] ${fieldErrors.position ? errorInputClass : ''}`}
                            />
                            {renderError('position')}
                        </div>
                        <div className="space-y-2">
                            <Input
                                title="Years of Experience In Real Estate"
                                required
                                value={formValues.yearsOfExperience}
                                onChange={(event) => updateField('yearsOfExperience', event.target.value)}
                                placeholder="Enter your years of experience"
                                type="number"
                                min="0"
                                className={`placeholder:font-medium ${fieldErrors.yearsOfExperience ? errorInputClass : ''}`}
                            />
                            {renderError('yearsOfExperience')}
                        </div>
                        <div className="space-y-2">
                            <Input
                                title="Area/Location Of Operation"
                                required
                                value={formValues.areaOfOperation}
                                onChange={(event) => updateField('areaOfOperation', event.target.value)}
                                placeholder="Enter your Area/Location of Operation"
                                className={`placeholder:font-medium ${fieldErrors.areaOfOperation ? errorInputClass : ''}`}
                            />
                            {renderError('areaOfOperation')}
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Input
                                title="Registration Number/License Number"
                                required
                                value={formValues.registrationLicenseNumber}
                                onChange={(event) => updateField('registrationLicenseNumber', event.target.value)}
                                placeholder="Enter license number"
                                className={`placeholder:font-medium ${fieldErrors.registrationLicenseNumber ? errorInputClass : ''}`}
                            />
                            {renderError('registrationLicenseNumber')}
                        </div>
                        <div className="space-y-2">
                            <Input
                                title="LinkedIn URL"
                                placeholder="LinkedIn URL"
                                value={formValues.linkedinProfile}
                                onChange={(event) => updateField('linkedinProfile', event.target.value)}
                                className="placeholder:font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                title="Website URL"
                                placeholder="Website URL"
                                value={formValues.website}
                                onChange={(event) => updateField('website', event.target.value)}
                                className="placeholder:font-medium"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Textarea
                                title="Bio"
                                rows={3}
                                value={formValues.bio}
                                onChange={(event) => updateField('bio', event.target.value)}
                                placeholder="Enter bio"
                                className="min-h-27.5 placeholder:font-medium placeholder:text-[#52525B]"
                            />
                        </div>
                    </div>
                    <div className="bg-white md:px-10 px-3 md:py-5 py-0 pb-2.5 border-t border-[#EDF1F5] flex flex-col md:flex-row md:items-center md:justify-between gap-3 sticky md:static bottom-0 z-10">
                        {submitError && <p className="text-sm text-red-500 font-medium md:mr-auto">{submitError}</p>}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#002A54] hover:bg-[#013463] disabled:bg-[#7B8AA0] disabled:cursor-not-allowed text-white text-[15px] font-semibold rounded-md md:px-7 px-4 md:py-2.5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#013463]/40 w-full md:w-auto"
                            aria-busy={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save & Continue'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfessionalDetailsForm;

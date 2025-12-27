import React from 'react';

import { usePropertyListingForm } from '../formContext';

import Select from '@components/forms/Select';
import Textarea from '@components/forms/Textarea';
import Input from '@components/forms/Input';

const LeasePricingStep: React.FC = () => {
    const { state, updateField } = usePropertyListingForm();

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    title="Lease Price"
                    placeholder="Enter lease price"
                    type="number"
                    value={state.price}
                    onChange={(event) => updateField('price', event.target.value)}
                    required
                />
                <Input
                    title="Lease Duration (months)"
                    placeholder="Enter lease duration"
                    type="number"
                    value={state.leaseDuration}
                    onChange={(event) => updateField('leaseDuration', event.target.value)}
                />
                <Select
                    title="Payment Term"
                    value={state.paymentTerm}
                    onChange={(value) => updateField('paymentTerm', value)}
                    options={[
                        { label: 'Select payment term', value: '' },
                        { label: 'Monthly', value: 'monthly' },
                        { label: 'Quarterly', value: 'quarterly' },
                        { label: 'Annually', value: 'annually' },
                    ]}
                />
                <Input
                    title="Service Charge"
                    placeholder="Enter service charge"
                    type="number"
                    value={state.serviceCharge}
                    onChange={(event) => updateField('serviceCharge', event.target.value)}
                />
                <Input
                    title="Weekly Rate"
                    placeholder="Enter weekly rate"
                    type="number"
                    value={state.weeklyRate}
                    onChange={(event) => updateField('weeklyRate', event.target.value)}
                />
                <Input
                    title="Monthly Rate"
                    placeholder="Enter monthly rate"
                    type="number"
                    value={state.monthlyRate}
                    onChange={(event) => updateField('monthlyRate', event.target.value)}
                />
                <Input
                    title="Minimum Nights Stay"
                    placeholder="Enter minimum nights stay"
                    type="number"
                    value={state.minimumNightsStay}
                    onChange={(event) => updateField('minimumNightsStay', event.target.value)}
                />
                <Input
                    title="Security Deposit"
                    placeholder="Enter security deposit"
                    value={state.securityDeposit}
                    onChange={(event) => updateField('securityDeposit', event.target.value)}
                />
                <Select
                    title="Maintenance Responsibility"
                    value={state.maintenanceResponsibility}
                    onChange={(value) => updateField('maintenanceResponsibility', value)}
                    options={[
                        { label: 'Select maintenance option', value: '' },
                        { label: 'Landlord', value: 'landlord' },
                        { label: 'Tenant', value: 'tenant' },
                        { label: 'Shared', value: 'shared' },
                    ]}
                />
                <Input
                    title="Maintenance Charge"
                    placeholder="Enter maintenance charge"
                    value={state.maintenanceCharge}
                    onChange={(event) => updateField('maintenanceCharge', event.target.value)}
                />
                <Select
                    title="Property Condition"
                    value={state.propertyConditions}
                    onChange={(value) => updateField('propertyConditions', value)}
                    options={[
                        { label: 'Select property condition', value: '' },
                        { label: 'New', value: 'new' },
                        { label: 'Good', value: 'good' },
                        { label: 'Renovated', value: 'renovated' },
                        { label: 'Needs Renovation', value: 'needs_renovation' },
                    ]}
                />
                <Textarea
                    title="House Rule"
                    placeholder="State key house rules"
                    rows={3}
                    value={state.houseRule}
                    onChange={(event) => updateField('houseRule', event.target.value)}
                    containerClassName="md:col-span-2"
                />
                <Textarea
                    title="Additional Charges"
                    placeholder="Enter additional charges here"
                    rows={3}
                    value={state.additionalCharges}
                    onChange={(event) => updateField('additionalCharges', event.target.value)}
                    containerClassName="md:col-span-2"
                />
                <Textarea
                    title="Other Charges"
                    placeholder="Enter other optional charges"
                    rows={3}
                    value={state.otherCharges}
                    onChange={(event) => updateField('otherCharges', event.target.value)}
                    containerClassName="md:col-span-2"
                />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#002E62]">
                    <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-[#CBD5E1] text-[#002E62] focus:ring-[#002E62]/60"
                        checked={state.renewalOption}
                        onChange={(event) => updateField('renewalOption', event.target.checked)}
                    />
                    Renewal option available
                </label>
                <label className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#002E62]">
                    <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-[#CBD5E1] text-[#002E62] focus:ring-[#002E62]/60"
                        checked={state.negotiable}
                        onChange={(event) => updateField('negotiable', event.target.checked)}
                    />
                    Price negotiable
                </label>
            </div>
        </div>
    );
};

export default LeasePricingStep;

import React from 'react';
import { usePropertyListingForm } from '../formContext';
import Input from '@components/forms/Input';
import Textarea from '@components/forms/Textarea';

const PricingBookingStep: React.FC = () => {
    const { state, updateField } = usePropertyListingForm();

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    title="Daily Rate"
                    placeholder="Enter daily rate"
                    type="number"
                    value={state.price}
                    onChange={(event) => updateField('price', event.target.value)}
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
                <Textarea
                    title="Additional Charges"
                    placeholder="Describe additional charges (cleaning, service fees, etc.)"
                    containerClassName="md:col-span-2"
                    rows={3}
                    value={state.additionalCharges}
                    onChange={(event) => updateField('additionalCharges', event.target.value)}
                />
            </div>
        </div>
    );
};

export default PricingBookingStep;

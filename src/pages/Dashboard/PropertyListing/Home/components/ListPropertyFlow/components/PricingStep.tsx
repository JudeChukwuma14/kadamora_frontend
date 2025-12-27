import React from 'react';

import { usePropertyListingForm } from '../formContext';
import Input from '@components/forms/Input';
import Select from '@components/forms/Select';
import Textarea from '@components/forms/Textarea';
import RadioGroup from '@components/forms/RadioGroup';

const PricingStep: React.FC = () => {
    const { state, updateField } = usePropertyListingForm();

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <Input
                    title="Sale Price"
                    placeholder="Enter sale price"
                    type="number"
                    value={state.price}
                    onChange={(event) => updateField('price', event.target.value)}
                    required
                />
                <Input
                    title="Other Charges"
                    placeholder="Enter other charges"
                    value={state.otherCharges}
                    onChange={(event) => updateField('otherCharges', event.target.value)}
                />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <Select
                    title="Payment Option"
                    value={state.paymentTerm}
                    onChange={(value) => updateField('paymentTerm', value)}
                    options={[
                        { value: '', label: 'Select payment option' },
                        { value: 'cash', label: 'Cash Payment' },
                        { value: 'installment', label: 'Installment Payment' },
                        { value: 'mortgage', label: 'Mortgage' },
                        { value: 'lease_to_own', label: 'Lease to Own' },
                    ]}
                />
                <Select
                    title="Property Condition"
                    value={state.propertyConditions}
                    onChange={(value) => updateField('propertyConditions', value)}
                    options={[
                        { value: '', label: 'Select property condition' },
                        { value: 'new', label: 'New' },
                        { value: 'renovated', label: 'Recently Renovated' },
                        { value: 'good', label: 'Good Condition' },
                        { value: 'needs_repair', label: 'Needs Repairs' },
                    ]}
                />
            </div>

            <Textarea
                title="Additional Charges"
                placeholder="Describe additional costs buyers should expect"
                value={state.additionalCharges}
                onChange={(event) => updateField('additionalCharges', event.target.value)}
                rows={3}
            />

            <RadioGroup
                title="Is Price Negotiable?"
                name="priceNegotiable"
                value={state.negotiable ? 'yes' : 'no'}
                onChange={(value) => updateField('negotiable', value === 'yes')}
                options={[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                ]}
            />
        </div>
    );
};

export default PricingStep;

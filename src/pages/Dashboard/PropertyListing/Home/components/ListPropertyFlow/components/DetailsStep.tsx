// import React, { useEffect, useMemo, useState } from 'react';
// import { usePropertyListingForm } from '../formContext';
// import RadioGroup from '@components/forms/RadioGroup';
// import Select from '@components/forms/Select';
// import FacilitiesMultiSelect from '@components/forms/FacilitiesMultiSelect';
// import Textarea from '@components/forms/Textarea';
// import Input from '@components/forms/Input';

// const AMENITY_OPTIONS: Array<{ label: string; value: string }> = [
//     { label: 'Standing Fan', value: 'standing_fan' },
//     { label: 'Bed Linen', value: 'bed_linen' },
//     { label: 'Game Console', value: 'game_console' },
//     { label: 'Balcony', value: 'balcony' },
//     { label: 'King Bed', value: 'king_bed' },
//     { label: 'Roof Top', value: 'roof_top' },
//     { label: 'Inverter', value: 'inverter' },
//     { label: 'Work Desk', value: 'work_desk' },
//     { label: 'CCTV', value: 'cctv' },
//     { label: 'Smart TV', value: 'smart_tv' },
//     { label: 'Air Conditioner', value: 'air_conditioner' },
//     { label: 'Kitchenette', value: 'kitchenette' },
//     { label: 'Washing Machine', value: 'washing_machine' },
//     { label: 'House Keeper', value: 'house_keeper' },
//     { label: 'Hangers', value: 'hangers' },
//     { label: 'Cleaning Supplies', value: 'cleaning_supplies' },
//     { label: 'Toiletries', value: 'toiletries' },
//     { label: 'Chef', value: 'chef' },
//     { label: 'Netflix', value: 'netflix' },
//     { label: 'Wi-Fi', value: 'wifi' },
//     { label: 'Cable TV', value: 'cable_tv' },
//     { label: 'Parking', value: 'parking' },
//     { label: 'Security', value: 'security' },
//     { label: 'Restaurant', value: 'restaurant' },
//     { label: 'Swimming Pool', value: 'swimming_pool' },
//     { label: 'Kitchen', value: 'kitchen' },
//     { label: 'Gym', value: 'gym' },
//     { label: 'Spacious Compound', value: 'spacious_compound' },
//     { label: 'Sitting Room', value: 'sitting_room' },
// ];

// const DetailsStep: React.FC = () => {
//     const { state, updateField, setFacilities, setAmenities } = usePropertyListingForm();
//     // const [countries, setCountries] = useState<Array<{ label: string; value: string }>>([]);
//     // const [states, setStates] = useState<Array<{ label: string; value: string }>>([]);
//     // const [loadingCountries, setLoadingCountries] = useState(false);
//     // const [loadingStates, setLoadingStates] = useState(false);

//     const amenitiesSet = useMemo(() => new Set(state.amenities), [state.amenities]);

//     // useEffect(() => {
//     //     let cancelled = false;
//     //     (async () => {
//     //         try {
//     //             setLoadingCountries(true);
//     //             // const response = await fetchCountries();
//     //             if (cancelled) return;
//     //             // const rawCountries = response.response?.countries ?? response.data ?? [];
//     //             const countryList = Array.isArray(rawCountries) ? rawCountries : [];
//     //             setCountries(
//     //                 countryList.map((entry) => ({
//     //                     label: String(entry.name ?? entry.id ?? ''),
//     //                     value: String(entry.id ?? ''),
//     //                 })),
//     //             );
//     //         } catch (error) {
//     //             if (!cancelled) {
//     //                 console.error('Failed to fetch countries', error);
//     //             }
//     //         } finally {
//     //             if (!cancelled) {
//     //                 setLoadingCountries(false);
//     //             }
//     //         }
//     //     })();

//     //     return () => {
//     //         cancelled = true;
//     //     };
//     // }, []);

//     // useEffect(() => {
//     //     let cancelled = false;
//     //     if (!state.countryId) {
//     //         setStates([]);
//     //         return () => {
//     //             cancelled = true;
//     //         };
//     //     }

//     //     (async () => {
//     //         try {
//     //             setLoadingStates(true);
//     //             setStates([]);
//     //             const response = await fetchStatesByCountry(state.countryId);
//     //             if (cancelled) return;
//     //             const rawStates = response.response?.states ?? response.data ?? [];
//     //             const stateList = Array.isArray(rawStates) ? rawStates : [];
//     //             setStates(
//     //                 stateList.map((entry) => ({
//     //                     label: String(entry.name ?? entry.id ?? ''),
//     //                     value: String(entry.id ?? ''),
//     //                 })),
//     //             );
//     //         } catch (error) {
//     //             if (!cancelled) {
//     //                 console.error('Failed to fetch states', error);
//     //                 setStates([]);
//     //             }
//     //         } finally {
//     //             if (!cancelled) {
//     //                 setLoadingStates(false);
//     //             }
//     //         }
//     //     })();

//     //     return () => {
//     //         cancelled = true;
//     //     };
//     // }, [state.countryId]);

//     return (
//         <div className="space-y-8">
//             <RadioGroup
//                 title="Property Category"
//                 name="property_category"
//                 value={state.propertyCategory}
//                 onChange={(v) => updateField('propertyCategory', v as typeof state.propertyCategory)}
//                 options={[
//                     { label: 'AFFORDABLE', value: 'affordable' },
//                     { label: 'LUXURIOUS', value: 'luxurious' },
//                     { label: 'ULTRA-LUXURIOUS', value: 'ultra_luxurious' },
//                 ]}
//                 optionClassName="text-[11px]"
//             />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Select
//                     title="Category Type"
//                     value={state.categoryType}
//                     onChange={(value) => updateField('categoryType', value)}
//                     options={[
//                         { label: 'Select property category', value: '' },
//                         { label: 'Land Listing', value: 'land_listing' },
//                         { label: 'Residential', value: 'residential' },
//                         { label: 'Commercial', value: 'commercial' },
//                         { label: 'Mixed Use', value: 'mixed_use' },
//                     ]}
//                 />
//                 <Select
//                     title="Property Type"
//                     value={state.propertySubType}
//                     onChange={(value) => updateField('propertySubType', value)}
//                     options={[
//                         { label: 'Select property type', value: '' },
//                         { label: 'Apartment', value: 'apartment' },
//                         { label: 'Duplex', value: 'duplex' },
//                         { label: 'Terrace', value: 'terrace' },
//                         { label: 'Land', value: 'land' },
//                         { label: 'Office Space', value: 'office_space' },
//                     ]}
//                 />
//                 <Input
//                     title="Property Title"
//                     placeholder="Enter property title"
//                     value={state.title}
//                     onChange={(event) => updateField('title', event.target.value)}
//                     required
//                 />
//                 <Input
//                     title="Location"
//                     placeholder="Enter location"
//                     value={state.location}
//                     onChange={(event) => updateField('location', event.target.value)}
//                 />
//                 <Select
//                     title="Country"
//                     value={state.countryId}
//                     onChange={(value) => {
//                         updateField('countryId', value);
//                         updateField('stateId', '');
//                     }}
//                     options={countries}
//                     placeholder={loadingCountries ? 'Loading countries...' : 'Select country'}
//                     disabled={loadingCountries}
//                 />
//                 <Select
//                     title="State"
//                     value={state.stateId}
//                     onChange={(value) => updateField('stateId', value)}
//                     options={states}
//                     placeholder={
//                         state.countryId
//                             ? loadingStates
//                                 ? 'Loading states...'
//                                 : 'Select state'
//                             : 'Select country first'
//                     }
//                     disabled={!state.countryId || loadingStates}
//                 />
//                 <Input
//                     title="Size (e.g., sqm or square feet)"
//                     placeholder="Enter size"
//                     value={state.size}
//                     onChange={(event) => updateField('size', event.target.value)}
//                 />
//                 <Select
//                     title="Furnishing Status"
//                     value={state.furnishingStatus}
//                     onChange={(value) => updateField('furnishingStatus', value)}
//                     options={[
//                         { label: 'Select furnish status', value: '' },
//                         { label: 'Furnished', value: 'furnished' },
//                         { label: 'Unfurnished', value: 'unfurnished' },
//                         { label: 'Part Furnished', value: 'part_furnished' },
//                     ]}
//                 />
//                 <FacilitiesMultiSelect
//                     title="Facilities"
//                     value={state.facilities}
//                     onChange={(facilities) =>
//                         setFacilities(
//                             facilities.map((entry) => ({
//                                 label: entry.label,
//                                 value: entry.value,
//                                 units: entry.units ?? 1,
//                             })),
//                         )
//                     }
//                     containerClassName="md:col-span-2"
//                 />
//                 <div className="md:col-span-2">
//                     <p className="block mb-1 text-secondary font-semibold text-[15px]">Amenities</p>
//                     <div className="flex flex-wrap gap-2">
//                         {AMENITY_OPTIONS.map(({ label, value }) => {
//                             const active = amenitiesSet.has(value);
//                             return (
//                                 <button
//                                     type="button"
//                                     key={value}
//                                     onClick={() => {
//                                         const next = new Set(amenitiesSet);
//                                         if (next.has(value)) {
//                                             next.delete(value);
//                                         } else {
//                                             next.add(value);
//                                         }
//                                         setAmenities(Array.from(next));
//                                     }}
//                                     className={`px-4 py-2 rounded-lg text-[14px] font-medium border transition-colors focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none ${
//                                         active
//                                             ? 'bg-[#002E62] text-white border-[#002E62]'
//                                             : 'bg-[#F7F7FD] text-[#52525B] border-[#E0DEF7] hover:bg-white focus:bg-white'
//                                     }`}
//                                 >
//                                     {label}
//                                 </button>
//                             );
//                         })}
//                     </div>
//                 </div>
//                 <Textarea
//                     title="Description"
//                     placeholder="Describe the property"
//                     rows={3}
//                     value={state.description}
//                     onChange={(event) => updateField('description', event.target.value)}
//                     containerClassName="md:col-span-2"
//                 />
//             </div>
//         </div>
//     );
// };

// export default DetailsStep;

import React, { useMemo } from 'react';

import { usePropertyListingForm } from '../formContext';
import RadioGroup from '@components/forms/RadioGroup';
import Select from '@components/forms/Select';
import Input from '@components/forms/Input';
import FacilitiesMultiSelect from '@components/forms/FacilitiesMultiSelect';
import Textarea from '@components/forms/Textarea';

const AMENITY_OPTIONS: Array<{ label: string; value: string }> = [
    { label: 'Standing Fan', value: 'standing_fan' },
    { label: 'Bed Linen', value: 'bed_linen' },
    { label: 'Game Console', value: 'game_console' },
    { label: 'Balcony', value: 'balcony' },
    { label: 'King Bed', value: 'king_bed' },
    { label: 'Roof Top', value: 'roof_top' },
    { label: 'Inverter', value: 'inverter' },
    { label: 'Work Desk', value: 'work_desk' },
    { label: 'CCTV', value: 'cctv' },
    { label: 'Smart TV', value: 'smart_tv' },
    { label: 'Air Conditioner', value: 'air_conditioner' },
    { label: 'Kitchenette', value: 'kitchenette' },
    { label: 'Washing Machine', value: 'washing_machine' },
    { label: 'House Keeper', value: 'house_keeper' },
    { label: 'Hangers', value: 'hangers' },
    { label: 'Cleaning Supplies', value: 'cleaning_supplies' },
    { label: 'Toiletries', value: 'toiletries' },
    { label: 'Chef', value: 'chef' },
    { label: 'Netflix', value: 'netflix' },
    { label: 'Wi-Fi', value: 'wifi' },
    { label: 'Cable TV', value: 'cable_tv' },
    { label: 'Parking', value: 'parking' },
    { label: 'Security', value: 'security' },
    { label: 'Restaurant', value: 'restaurant' },
    { label: 'Swimming Pool', value: 'swimming_pool' },
    { label: 'Kitchen', value: 'kitchen' },
    { label: 'Gym', value: 'gym' },
    { label: 'Spacious Compound', value: 'spacious_compound' },
    { label: 'Sitting Room', value: 'sitting_room' },
];

const DetailsStep: React.FC = () => {
    const { state, updateField, setFacilities, setAmenities } = usePropertyListingForm();

    const amenitiesSet = useMemo(() => new Set(state.amenities), [state.amenities]);

    return (
        <div className="space-y-8">
            <RadioGroup
                title="Property Category"
                name="property_category"
                value={state.propertyCategory}
                onChange={(v) => updateField('propertyCategory', v as typeof state.propertyCategory)}
                options={[
                    { label: 'AFFORDABLE', value: 'affordable' },
                    { label: 'LUXURIOUS', value: 'luxurious' },
                    { label: 'ULTRA-LUXURIOUS', value: 'ultra_luxurious' },
                ]}
                optionClassName="text-[11px]"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                    title="Category Type"
                    value={state.categoryType}
                    onChange={(value) => updateField('categoryType', value)}
                    options={[
                        { label: 'Select property category', value: '' },
                        { label: 'Land Listing', value: 'land_listing' },
                        { label: 'Residential', value: 'residential' },
                        { label: 'Commercial', value: 'commercial' },
                        { label: 'Mixed Use', value: 'mixed_use' },
                    ]}
                />
                <Select
                    title="Property Type"
                    value={state.propertySubType}
                    onChange={(value) => updateField('propertySubType', value)}
                    options={[
                        { label: 'Select property type', value: '' },
                        { label: 'Apartment', value: 'apartment' },
                        { label: 'Duplex', value: 'duplex' },
                        { label: 'Terrace', value: 'terrace' },
                        { label: 'Land', value: 'land' },
                        { label: 'Office Space', value: 'office_space' },
                    ]}
                />
                <Input
                    title="Property Title"
                    placeholder="Enter property title"
                    value={state.title}
                    onChange={(event) => updateField('title', event.target.value)}
                    required
                />
                <Input
                    title="Location"
                    placeholder="Enter location"
                    value={state.location}
                    onChange={(event) => updateField('location', event.target.value)}
                />
                <Input
                    title="Size (e.g., sqm or square feet)"
                    placeholder="Enter size"
                    value={state.size}
                    onChange={(event) => updateField('size', event.target.value)}
                />
                <Select
                    title="Furnishing Status"
                    value={state.furnishingStatus}
                    onChange={(value) => updateField('furnishingStatus', value)}
                    options={[
                        { label: 'Select furnish status', value: '' },
                        { label: 'Furnished', value: 'furnished' },
                        { label: 'Unfurnished', value: 'unfurnished' },
                        { label: 'Part Furnished', value: 'part_furnished' },
                    ]}
                />
                <FacilitiesMultiSelect
                    title="Facilities"
                    value={state.facilities}
                    onChange={(facilities) =>
                        setFacilities(
                            facilities.map((entry) => ({
                                label: entry.label,
                                value: entry.value,
                                units: entry.units ?? 1,
                            })),
                        )
                    }
                    containerClassName="md:col-span-2"
                />
                <div className="md:col-span-2">
                    <p className="block mb-1 text-secondary font-semibold text-[15px]">Amenities</p>
                    <div className="flex flex-wrap gap-2">
                        {AMENITY_OPTIONS.map(({ label, value }) => {
                            const active = amenitiesSet.has(value);
                            return (
                                <button
                                    type="button"
                                    key={value}
                                    onClick={() => {
                                        const next = new Set(amenitiesSet);
                                        if (next.has(value)) {
                                            next.delete(value);
                                        } else {
                                            next.add(value);
                                        }
                                        setAmenities(Array.from(next));
                                    }}
                                    className={`px-4 py-2 rounded-lg text-[14px] font-medium border transition-colors focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none ${
                                        active
                                            ? 'bg-[#002E62] text-white border-[#002E62]'
                                            : 'bg-[#F7F7FD] text-[#52525B] border-[#E0DEF7] hover:bg-white focus:bg-white'
                                    }`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <Textarea
                    title="Description"
                    placeholder="Describe the property"
                    rows={3}
                    value={state.description}
                    onChange={(event) => updateField('description', event.target.value)}
                    containerClassName="md:col-span-2"
                />
            </div>
        </div>
    );
};

export default DetailsStep;

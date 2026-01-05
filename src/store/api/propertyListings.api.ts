import { baseApi } from "./baseApi";

export type PropertyMediaType = 'image' | 'video' | 'document';

export interface PropertyMediaPayload {
    url: string;
    altText?: string;
    mediaType: PropertyMediaType;
    sortOrder?: number;
}

export interface PropertyFacilitiesPayload {
    livingRooms?: number;
    bedrooms?: number;
    bathrooms?: number;
    kitchens?: number;
    stores?: number;
    [key: string]: number | undefined;
}

export type PropertyCategory = 'affordable' | 'luxurious' | 'ultra_luxurious';
export type PropertyType = 'rent' | 'lease' | 'short_let' | 'sell';

export interface CreatePropertyListingPayload {
    title: string;
    description: string;
    location: string;
    countryId?: string;
    stateId?: string;
    propertyType: PropertyType;
    propertyCategory: PropertyCategory;
    categoryType: string;
    propertySubType: string;
    furnishingStatus: string;
    facilities: PropertyFacilitiesPayload;
    price: number;
    serviceCharge?: number;
    additionalCharges?: string;
    paymentTerm?: string;
    weeklyRate?: number;
    monthlyRate?: number;
    minimumNightsStay?: number;
    houseRule?: string;
    size?: string;
    leaseDuration?: number;
    renewalOption?: boolean;
    maintenanceCharge?: string;
    availablePropertyDocuments?: string[];
    maintenanceResponsibility?: string;
    amenities?: string[];
    securityDeposit?: string;
    propertyConditions?: string;
    otherCharges?: string;
    negotiable?: boolean;
    media: PropertyMediaPayload[];
}

export interface CreatePropertyListingResponse {

        data?: unknown;
        message?: string;
}

export interface AgentPropertyMedia {
    id: string;
    url: string;
    altText?: string | null;
    mediaType: PropertyMediaType;
    sortOrder?: number | null;
    property?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}

export interface AgentPropertyListing {
    id: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    title: string;
    description?: string | null;
    location?: string | null;
    country?: string | null;
    state?: string | null;
    propertyType: string;
    propertyCategory?: string | null;
    categoryType?: string | null;
    propertySubType?: string | null;
    furnishingStatus?: string | null;
    livingRooms?: number | null;
    bedrooms?: number | null;
    bathrooms?: number | null;
    kitchens?: number | null;
    stores?: number | null;
    amenities?: string[];
    price?: string | null;
    serviceCharge?: string | null;
    additionalCharges?: string | null;
    paymentTerm?: string | null;
    weeklyRate?: string | null;
    monthlyRate?: string | null;
    minimumNightsStay?: string | null;
    houseRule?: string | null;
    size?: string | null;
    leaseDuration?: string | null;
    renewalOption?: boolean | null;
    maintenanceCharge?: string | null;
    maintenanceResponsibility?: string | null;
    securityDeposit?: string | null;
    availablePropertyDocuments?: string[];
    propertyConditions?: string | null;
    otherCharges?: string | null;
    negotiable?: boolean | null;
    isAvailable?: boolean | null;
    isDeleted?: boolean | null;
    media?: AgentPropertyMedia[];
    [key: string]: unknown;
}

export interface AgentPropertyListingsResponse {
        data?: AgentPropertyListing[];
        message?: string;
}

export const propertyListingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAgentPropertyListings: builder.query<AgentPropertyListingsResponse, void>({
            query: () => ({
                url: "/api/v1/properties-listing/agent/listings",
                method: "GET",
            }),
            providesTags: ["Property"],
        }),

        createPropertyListing: builder.mutation<CreatePropertyListingResponse, CreatePropertyListingPayload>({
            query: (payload) => ({
                url: "/api/v1/properties-listing/agent",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Property"],
        }),
    }),
});

export const {
    useGetAgentPropertyListingsQuery,
    useCreatePropertyListingMutation,
} = propertyListingApi
import { request } from "@utils/apiClient";

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
    message?: string;
    response?: {
        data?: unknown;
        message?: string;
    };
}

export interface AgentPropertyListingsResponse {
    response?: {
        data?: unknown;
        message?: string;
    };
    data?: unknown;
    message?: string;
}

export async function createPropertyListing(
    payload: CreatePropertyListingPayload,
): Promise<CreatePropertyListingResponse> {
    return request<CreatePropertyListingResponse, CreatePropertyListingPayload>({
        method: 'POST',
        url: '/api/v1/properties-listing/agent',
        data: payload,
    });
}

export async function getAgentPropertyListings(): Promise<AgentPropertyListingsResponse> {
    return request<AgentPropertyListingsResponse>({
        method: 'GET',
        url: '/api/v1/properties-listing/agent/listings',
    });
}

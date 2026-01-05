import { baseApi } from "./baseApi";

/* =======================
   Types
======================= */

export interface CreatePropertyPayload {
    role: "agent" | "admin";
    name: string;
    categoryType: string;
    address: string;
    estateManagerEmail: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
}

export interface UpdatePropertyPayload extends Partial<CreatePropertyPayload> {
    propertyId: string;
}

export interface CreatePropertyResponse {
    message: string;
    data?: unknown;
}

export interface DashboardSummaryResponse {
    message: string;
    data: {
        totalProperties: number;
        totalTenants: number;
        totalRevenue?: number;
        occupancyRate?: number;
    };
}

export interface Property {
    id: string;
    name: string;
    categoryType: string;
    address: string;
    estateManagerEmail: string;
    tenants?: unknown[];
}

export interface GetPropertiesResponse {
    message: string;
    data: Property[];
}

/* =======================
   API
======================= */

export const propertyMgtApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createProperty: builder.mutation<
            CreatePropertyResponse,
            CreatePropertyPayload
        >({
            query: (payload) => ({
                url: "/management/create-property",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["PropertyMgt"],
        }),

        updateProperty: builder.mutation<
            CreatePropertyResponse,
            UpdatePropertyPayload
        >({
            query: ({ propertyId, ...payload }) => ({
                url: `/management/update-property/${propertyId}`,
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: ["PropertyMgt"],
        }),

        deleteProperty: builder.mutation<
            CreatePropertyResponse,
            { propertyId: string }
        >({
            query: ({ propertyId }) => ({
                url: `/management/delete-property/${propertyId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["PropertyMgt"],
        }),

        getDashboardSummary: builder.query<
            DashboardSummaryResponse,
            void
        >({
            query: () => ({
                url: "/management/dashboard-summary",
                method: "GET",
            }),
            providesTags: ["PropertyMgt"],
        }),

        getManagedProperties: builder.query<
            GetPropertiesResponse,
            void
        >({
            query: () => ({
                url: "/management/properties",
                method: "GET",
            }),
            providesTags: ["PropertyMgt"],
        }),

        removeTenantFromProperty: builder.mutation<
            CreatePropertyResponse,
            { propertyId: string; tenantId: string }
        >({
            query: ({ propertyId, tenantId }) => ({
                url: `/management/delete-tenant/${propertyId}/${tenantId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["PropertyMgt"],
        }),
    }),
});

/* =======================
   Hooks
======================= */

export const {
    useCreatePropertyMutation,
    useUpdatePropertyMutation,
    useDeletePropertyMutation,
    useGetDashboardSummaryQuery,
    useGetManagedPropertiesQuery,
    useRemoveTenantFromPropertyMutation,
} = propertyMgtApi;

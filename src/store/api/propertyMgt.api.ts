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

export interface CreatePropertyResponse {
    message: string;
    data?: unknown;
}

/* =======================
   API
======================= */

export const propertyMgtApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      
        /* =======================
           Property Management
        ====================== */

        createProperty: builder.mutation<CreatePropertyResponse, CreatePropertyPayload>({
            query: (payload) => ({
                url: "/api/v1/management/create-property",
                method: "POST",
                body: payload,
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
} = propertyMgtApi;

import { baseApi } from "./baseApi";

/* =======================
   Types
======================= */

export type AgentStatus = "pending" | "approved" | "rejected";

export type AgentDocumentsMap = Record<string, string[] | null | undefined>;

export interface AgentProfile {
    id: string;
    userId?: string;
    agencyCompanyName?: string;
    position?: string;
    yearsOfExperience?: number;
    areaOfOperation?: string;
    registrationLicenseNumber?: string;
    bio?: string;
    website?: string | null;
    linkedinProfile?: string | null;
    status?: AgentStatus | Uppercase<AgentStatus>;
    verificationStatus?: "PENDING" | "APPROVED" | "REJECTED";
    isVerified?: boolean;
    canListProperties?: boolean;
    approvedAt?: string | null;
    rejectedAt?: string | null;
    rejectionReason?: string | null;
    documents?: AgentDocumentsMap | null;
    createdAt?: string;
    updatedAt?: string;
    companyName?: string;
    companyAddress?: string;
    companyEmail?: string;
    companyPhoneNumber?: string;
    companyDescription?: string;
    companyWebsite?: string | null;
    data?: any
}

export interface AgentProfileResponse {
        data: AgentProfile;
        message?: string; 
        statusCode: number;
}

/* =======================
   Register Agent
======================= */

export interface RegisterAgentPayload {
    agencyCompanyName: string;
    position: string;
    yearsOfExperience: number;
    areaOfOperation: string;
    registrationLicenseNumber: string;
    bio: string;
    website?: string;
    linkedinProfile?: string;
}

export interface RegisterAgentResponse {
        data: AgentProfile;
        message?: string;
}

/* =======================
   Upload Documents
======================= */

export interface UploadAgentDocumentsPayload {
    governmentId: string[];
    businessCertificate?: string[];
    proofOfAddress?: string[];
}

export interface UploadAgentDocumentsResponse {
        data?: unknown;
        message?: string;
}

/* =======================
   API
======================= */

export const propertyAgentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAgentProfile: builder.query<AgentProfile, void>({
            query: () => ({
                url: "/api/v1/agents/profile",
                method: "GET",
            }),
            providesTags: ["AgentProfile"],
        }),

        registerAgent: builder.mutation<RegisterAgentResponse, RegisterAgentPayload>({
            query: (payload) => ({
                url: "/api/v1/agents/register",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["AgentProfile"],
        }),

        uploadAgentDocuments: builder.mutation<
            UploadAgentDocumentsResponse,
            UploadAgentDocumentsPayload
        >({
            query: (payload) => ({
                url: "/api/v1/agents/upload-documents",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["AgentProfile"],
        }),
    }),
});

/* =======================
   Hooks
======================= */

export const {
    useGetAgentProfileQuery,
    useRegisterAgentMutation,
    useUploadAgentDocumentsMutation,
} = propertyAgentApi;
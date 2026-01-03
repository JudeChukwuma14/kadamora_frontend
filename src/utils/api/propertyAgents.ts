import { request } from "@utils/apiClient";


export type AgentStatus = 'pending' | 'approved' | 'rejected';

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
    verificationStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
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
}

export interface AgentProfileResponse {
    response: {
        data: AgentProfile;
        message?: string;
    };
    statusCode: number;
    message?: string;
}

export async function getAgentProfile(): Promise<AgentProfileResponse> {
    return request<AgentProfileResponse>({
        method: 'GET',
        url: '/api/v1/agents/profile',
    });
}

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
    message: string;
    response?: {
        data: AgentProfile;
        message?: string;
    };
}

export async function registerAgent(payload: RegisterAgentPayload): Promise<RegisterAgentResponse> {
    return request<RegisterAgentResponse, RegisterAgentPayload>({
        method: 'POST',
        url: '/api/v1/agents/register',
        data: payload,
    });
}

export interface UploadAgentDocumentsPayload {
    governmentId: string[];
    businessCertificate?: string[];
    proofOfAddress?: string[];
}

export interface UploadAgentDocumentsResponse {
    message: string;
    response?: {
        data?: unknown;
        message?: string;
    };
}

export async function uploadAgentDocuments(
    payload: UploadAgentDocumentsPayload,
): Promise<UploadAgentDocumentsResponse> {
    return request<UploadAgentDocumentsResponse, UploadAgentDocumentsPayload>({
        method: 'POST',
        url: '/api/v1/agents/upload-documents',
        data: payload,
    });
}

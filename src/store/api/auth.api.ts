import { baseApi } from "./baseApi";

export interface SignupPayload {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isTermsAccepted: boolean;
    phoneNumber: string;
}
export interface SignupResponse {
    message?: string;
}

export interface VerifyAccountPayload {
    token: string;
    email: string;
}
export interface VerifyAccountData {
    accessToken: string;
    refreshToken: string;
    message: string;
    user?: any;
}
export interface VerifyAccountResponse {
        data: VerifyAccountData;
    statusCode: number;
}
export interface LoginPayload {
    email: string;
    password: string;
}
export type LoginResponse = {
        data: VerifyAccountData;
    statusCode: number;
};

export interface ForgotPasswordPayload {
    email: string;
}
export interface ForgotPasswordResponse {
    message?: string;
}

export interface ResetPasswordPayload {
    newPassword: string;
    resetToken: string;
}
export interface ResetPasswordResponse {
    message?: string;
}
export interface AccountData {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    imgUrl: string | null;
    role: string;
    isVerified: boolean;
    lastLoginAt: string | null;
    createdAt: string;
    updatedAt: string;
}
export interface AccountResponse {
        data: AccountData;    
    statusCode: number;
}
export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation<SignupResponse, SignupPayload>({
            query: (payload) => ({
                url: '/api/v1/auth/signup',
                method: 'POST',
                body: payload,
            }),
        }),
        verifyAccount: builder.mutation<VerifyAccountResponse, VerifyAccountPayload>({
            query: (payload) => ({
                url: '/api/v1/auth/verify-account',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Account'],
        }),
        login: builder.mutation<LoginResponse, LoginPayload>({
            query: (payload) => ({
                url: '/api/v1/auth/login',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Account'],
        }),
        requestPasswordReset: builder.mutation<ForgotPasswordResponse, ForgotPasswordPayload>({
            query: (payload) => ({
                url: '/api/v1/auth/forgot-password',
                method: 'POST',
                body: payload,
            }),
        }),
        resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordPayload>({
            query: (payload) => ({
                url: '/api/v1/auth/reset-password',
                method: 'POST',
                body: payload,
            }),
        }),
        getAccount: builder.query<AccountResponse, void>({
            query: () => '/api/v1/auth/account',
            providesTags: ["Account"]
        })
    })
})

export const {
    useSignupMutation,
    useVerifyAccountMutation,
    useLoginMutation,
    useRequestPasswordResetMutation,
    useResetPasswordMutation,
    useGetAccountQuery,
} = authApi

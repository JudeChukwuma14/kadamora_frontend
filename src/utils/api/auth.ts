import { request } from '@utils/apiClient';

const SIGNUP_ENDPOINT = '/api/v1/auth/signup';
const VERIFY_ACCOUNT_ENDPOINT = '/api/v1/auth/verify-account';
const LOGIN_ENDPOINT = '/api/v1/auth/login';
const FORGOT_PASSWORD_ENDPOINT = '/api/v1/auth/forgot-password';
const ACCOUNT_ENDPOINT = '/api/v1/auth/account';
const RESET_PASSWORD_ENDPOINT = '/api/v1/auth/reset-password';

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

export async function signup(payload: SignupPayload): Promise<SignupResponse> {
    return request<SignupResponse, SignupPayload>({
        url: SIGNUP_ENDPOINT,
        method: 'POST',
        data: payload,
    });
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
    response: {
        data: VerifyAccountData;
    };
    statusCode: number;
}

export async function verifyAccount(payload: VerifyAccountPayload): Promise<VerifyAccountResponse> {
    return request<VerifyAccountResponse, VerifyAccountPayload>({
        url: VERIFY_ACCOUNT_ENDPOINT,
        method: 'POST',
        data: payload,
    });
}

export interface LoginPayload {
    email: string;
    password: string;
}

export type LoginResponse = VerifyAccountResponse;

export async function login(payload: LoginPayload): Promise<LoginResponse> {
    return request<LoginResponse, LoginPayload>({
        url: LOGIN_ENDPOINT,
        method: 'POST',
        data: payload,
    });
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ForgotPasswordResponse {
    message?: string;
}

export async function requestPasswordReset(payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> {
    return request<ForgotPasswordResponse, ForgotPasswordPayload>({
        url: FORGOT_PASSWORD_ENDPOINT,
        method: 'POST',
        data: payload,
    });
}

export interface ResetPasswordPayload {
    newPassword: string;
    resetToken: string;
}

export interface ResetPasswordResponse {
    message?: string;
}

export async function resetPassword(payload: ResetPasswordPayload): Promise<ResetPasswordResponse> {
    return request<ResetPasswordResponse, ResetPasswordPayload>({
        url: RESET_PASSWORD_ENDPOINT,
        method: 'POST',
        data: payload,
    });
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
    response: {
        data: AccountData;
    };
    statusCode: number;
}

export async function getAccount(): Promise<AccountResponse> {
    return request<AccountResponse>({
        url: ACCOUNT_ENDPOINT,
        method: 'GET',
    });
}

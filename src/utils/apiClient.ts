import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

const BASE_URL = 'https://kadamora-test-app-38pdp.ondigitalocean.app';

const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});

export type RequestConfig<TData = unknown> = AxiosRequestConfig<TData>;

export async function request<TResponse, TData = unknown>(config: RequestConfig<TData>): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await apiClient.request<TResponse, AxiosResponse<TResponse>, TData>(
        config,
    );
    return response.data;
}

export function setAuthToken(token: string | null): void {
    if (token) {
        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
        return;
    }

    delete apiClient.defaults.headers.common.Authorization;
}

export default apiClient;

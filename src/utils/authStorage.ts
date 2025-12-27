const ACCESS_TOKEN_KEY = 'kadamora.accessToken';
const REFRESH_TOKEN_KEY = 'kadamora.refreshToken';

interface SaveTokensParams {
    accessToken: string;
    refreshToken: string;
}

export function saveTokens({ accessToken, refreshToken }: SaveTokensParams): void {
    try {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } catch (error) {
        // Ignore storage errors (e.g., private mode) to avoid breaking the flow.
        console.error('Failed to persist auth tokens', error);
    }
}

export function clearTokens(): void {
    try {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
        console.error('Failed to clear auth tokens', error);
    }
}

export function getAccessToken(): string | null {
    try {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
        console.error('Failed to read access token', error);
        return null;
    }
}

export function getRefreshToken(): string | null {
    try {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
        console.error('Failed to read refresh token', error);
        return null;
    }
}

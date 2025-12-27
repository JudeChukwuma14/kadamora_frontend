import { baseApi } from './baseApi';

export interface CountryResponseItem {
    id: string;
    name: string;
    [key: string]: unknown;
}

export interface StateResponseItem {
    id: string;
    name: string;
    [key: string]: unknown;
}

export interface CountriesResponse {
    response?: {
        message?: string;
        countries?: CountryResponseItem[];
    };
    data?: CountryResponseItem[];
    message?: string;
}

export interface StatesResponse {
    response?: {
        message?: string;
        states?: StateResponseItem[];
    };
    data?: StateResponseItem[];
    message?: string;
}

export const locationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCountries: builder.query<CountriesResponse, void>({
            query: () => ({
                url: '/api/v1/locations/countries',
                method: 'GET',
            }),
            providesTags: ['Location'],
        }),

        getStatesByCountry: builder.query<StatesResponse, string>({
            query: (countryId) => ({
                url: `/api/v1/locations/countries/${countryId}/states`,
                method: 'GET',
            }),
            providesTags: ['Location'],
        }),
    }),
});

export const {
    useGetCountriesQuery,
    useGetStatesByCountryQuery,
} = locationApi;
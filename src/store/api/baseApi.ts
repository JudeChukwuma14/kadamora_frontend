import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {RootState} from '../index'
const BASE_URL = 'https://kadamora-test-app-38pdp.ondigitalocean.app';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.accessToken;
            if(token){
                headers.set('authorization', `Bearer ${token}`);
            }
            headers.set('content-type', 'application/json');
            return headers;
        }
    }),
    tagTypes: [
        'Account', 'AgentProfile', 'Property', 'Location', 'Notification', 'PropertyMgt'
    ],
    endpoints: () => ({})
})
import { baseApi } from "./baseApi";

/* =======================
   Types
======================= */

export interface UploadResponse {
     data: {
        urls: string[];
};
    message?: string;
}

/* =======================
   API
======================= */

export const uploadApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadFiles: builder.mutation<UploadResponse, FormData>({
            query: (formData) => ({
                url: "/api/v1/upload",
                method: "POST",
                body: formData,
            }),
        }),
    }),
});

/* =======================
   Hooks
======================= */

export const { useUploadFilesMutation } = uploadApi;

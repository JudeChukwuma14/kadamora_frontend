import { baseApi } from "./baseApi";

/* =======================
   Types
======================= */

export interface Notification {
    id: string;
    title: string;
    body: string;
    isRead: boolean;
    createdAt: string;
}

export interface NotificationResponse {
    data: Notification[];
    page: number;
    limit: number;
    total: number;
}

export interface UnreadCountResponse {
    count: number;
}

/* =======================
   API
======================= */

export const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /* =======================
           Notifications
        ====================== */

        getNotifications: builder.query<NotificationResponse, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 20 }) => `/notifications?page=${page}&limit=${limit}`,
            providesTags: ["Notification"],
        }),

        markAllNotificationsRead: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: "/notifications/mark-all-read",
                method: "POST",
            }),
            invalidatesTags: ["Notification"],
        }),

        getUnreadNotificationCount: builder.query<UnreadCountResponse, void>({
            query: () => "/notifications/unread-count",
            providesTags: ["Notification"],
        }),

        deleteNotification: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/notifications/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Notification"],
        }),

        markNotificationRead: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/notifications/${id}/read`,
                method: "POST",
            }),
            invalidatesTags: ["Notification"],
        }),
    }),
});

/* =======================
   Hooks
======================= */

export const {
    useGetNotificationsQuery,
    useMarkAllNotificationsReadMutation,
    useGetUnreadNotificationCountQuery,
    useDeleteNotificationMutation,
    useMarkNotificationReadMutation,
} = notificationApi;

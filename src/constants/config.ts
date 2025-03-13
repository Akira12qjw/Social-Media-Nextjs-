export const API_URL = "http://localhost:4000";

export const ENDPOINTS = {
  TWEETS: `${API_URL}/tweets`,
  USERS: {
    ME: `${API_URL}/users/me`,
    LOGIN: `${API_URL}/users/login`,
    REGISTER: `${API_URL}/users/register`,
    FOLLOW: `${API_URL}/users/follow`,
    UNFOLLOW: (userId: string) => `${API_URL}/users/follow/${userId}`,
  },
  MEDIAS: {
    UPLOAD_IMAGE: `${API_URL}/medias/upload-image`,
    UPLOAD_VIDEO: `${API_URL}/medias/upload-video`,
  },
} as const;

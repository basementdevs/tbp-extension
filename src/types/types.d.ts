export interface TwitchUser {
  id: number;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  email: string;
  created_at: string;
}

export interface UserSettings {
  user_id?: int;
  username?: string;
  locale?: string;
  timezone?: string;
  occupation?: string;
  pronouns?: string;
  updated_at?: string;
}

interface ColorChatUser {
  data: {
    user_id: string;
    color: string;
  }[];
}

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_at: string;
}

export  interface User {
  name: string;
  email: string;
  updated_at: string;
  created_at: string;
  id: number;
  is_admin: boolean;
  settings: UserSettings;
  accounts: Account[];
}

export  interface UserSettings {
  id: number;
  user_id: number;
  occupation_id: number;
  pronouns: string;
  timezone: string;
  locale: string;
  is_developer: boolean;
  created_at: string;
  updated_at: string;
  occupation: Occupation;
}

export interface Occupation {
  id: number;
  name: string;
  slug: string;
  translation_key: string;
  created_at: string;
  updated_at: string;
  image_url: string;
}

export interface Account {
  id: number;
  user_id: number;
  provider: string;
  provider_user_id: string;
  name: string;
  nickname: string;
  email: string;
  phone: string | null;
  avatar: string;
  token: string;
  refresh_token: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

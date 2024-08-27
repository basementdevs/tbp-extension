export interface TwitchUser {
  id: number;
  login: string;
  display_name: string;
}

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_at: string;
}

export interface User {
  name: string;
  email: string;
  updated_at: string;
  created_at: string;
  id: number;
  is_admin: boolean;
  settings: UserSettings;
  accounts: Account[];
}

export interface SettingsOption {
  name: string;
  slug: string;
  translation_key: string;
}

export interface UserSettings {
  id: number;
  user_id: number;
  occupation_id: number;
  color_id: number;
  effect_id: number;
  channel_id: string;
  pronouns: SettingsOption;
  timezone: string;
  locale: string;
  is_developer: boolean;
  created_at: string;
  updated_at: string;
  occupation: Occupation;
  color: Color;
  effect: Effect;
  enabled: boolean;
}

export interface Occupation {
  id: number;
  name: string;
  slug: string;
  translation_key: string;
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

// ----- Metrics
export interface UserMetrics {
  user_id: number;
  minutes_watched: number | null;
  messages_count: number | null;
}

export interface UserMetricsByCategory {
  user_id: number;
  minutes_watched: number | null;
  category_id: string;
}

export interface UserMetricsByChannel {
  user_id: number;
  minutes_watched: number | null;
  channel_id: string;
}

export interface MetricsResponse {
  main_metrics: UserMetrics;
  user_metrics_by_channel: UserMetricsByChannel[];
  user_metrics_by_category: UserMetricsByCategory[];
}

interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

interface Paginator<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface Effect {
  id: number;
  name: string;
  slug: string;
  translation_key: string;
  class_name: string;
  hex: string | null;
  created_at: string;
  updated_at: string;
}

interface Color {
  id: number;
  name: string;
  slug: string;
  translation_key: string;
  hex: string | null;
  created_at: string;
  updated_at: string;
}

import { env } from "~config/env";
import type {
  AccessTokenResponse,
  MetricsResponse,
  TwitchUser,
  User,
} from "~types/types";

const API_URL = env.data.CONSUMER_API_URL;
const API_VERSION = env.data.CONSUMER_API_VERSION;

const BASE_URL = `${API_URL}/api/${API_VERSION}`;

export type SettingsOption = {
  name: string;
  slug: string;
  translation_key: string;
};

export type ConsumerUserResponse = {
  locale: string;
  occupation: SettingsOption;
  pronouns: SettingsOption;
  timezone?: string;
  updated_at: string;
  user_id: number;
  username: string;
};

export async function getUserFromConsumer(
  username: string,
): Promise<ConsumerUserResponse> {
  const uri = `${BASE_URL}/settings/${username}`;
  const req = await fetch(uri);

  if (!req.ok) {
    return;
  }

  return (await req.json()) as ConsumerUserResponse;
}

export async function authenticateWithServer(code: string) {
  const uri = `${env.data.APP_PLATFORM_API_URL}/authenticate/twitch?code=${code}`;
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to authenticate with server");
  }

  const data: { user: User; authorization: AccessTokenResponse } =
    await response.json();
  const { user, authorization } = data;

  const twitchUser = {
    id: Number.parseInt(user.accounts[0].provider_user_id),
    login: user.accounts[0].nickname,
    display_name: user.accounts[0].name,
  } as TwitchUser;

  return { authorization, user, twitchUser };
}

export async function sendHeartbeat(
  authentication: string,
  channel_id: string,
  category_id: string,
) {
  const uri = `${BASE_URL}/metrics/heartbeat`;
  const payload = { category_id, channel_id };

  await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authentication,
    },
    body: JSON.stringify(payload),
  });
}

export async function getMetrics(authentication: string) {
  const uri = `${BASE_URL}/metrics/by-user`;

  const response = await fetch(uri, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authentication,
    },
  });
  return (await response.json()) as MetricsResponse;
}

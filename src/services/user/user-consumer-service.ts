import { env } from "@/config/env";
import type {
  AccessTokenResponse,
  Color,
  Effect,
  MetricsResponse,
  TwitchUser,
  User,
} from "@/types/types";
import axios from "axios";

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
  color: Color;
  effect: Effect;
  timezone?: string;
  updated_at: string;
  user_id: number;
  username: string;
};

export async function getUserFromConsumer(
  username: string,
): Promise<ConsumerUserResponse> {
  try {
    const { data } = await axios.get<ConsumerUserResponse>(
      `${BASE_URL}/settings/${username}`,
    );

    return data;
  } catch (error) {
    console.error("Error fetching user from consumer:", error);
  }
}

export async function authenticateWithServer(code: string) {
  try {
    const { data } = await axios.post<{
      user: User;
      authorization: AccessTokenResponse;
    }>(`${env.data.APP_PLATFORM_API_URL}/authenticate/twitch`, { code });

    const { user, authorization } = data;

    const twitchUser = {
      id: Number.parseInt(user.accounts[0].provider_user_id),
      login: user.accounts[0].nickname,
      display_name: user.accounts[0].name,
    } as TwitchUser;

    user.settings = user.settings[0];

    return { authorization, user, twitchUser };
  } catch (error) {
    console.error("Error authenticating with server:", error);
  }
}

export async function sendHeartbeat(
  authentication: string,
  channel_id: string,
  category_id: string,
) {
  try {
    await axios.post(
      `${BASE_URL}/metrics/heartbeat`,
      { category_id, channel_id },
      {
        headers: {
          Authorization: authentication,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error sending heartbeat:", error);
  }
}

export async function getMetrics(authentication: string) {
  try {
    const { data } = await axios.get<MetricsResponse>(
      `${BASE_URL}/metrics/by-user`,
      {
        headers: {
          Authorization: authentication,
          "Content-Type": "application/json",
        },
      },
    );
    return data;
  } catch (error) {
    console.error("Error getting metrics:", error);
  }
}

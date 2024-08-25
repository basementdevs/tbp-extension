import axios from "axios";
import { env } from "~config/env";
import type { ConsumerUserResponse } from "~services/user/user-consumer-service";
import type {
  AccessTokenResponse,
  Color,
  Effect,
  Occupation,
  Paginator,
  SettingsOption,
  UserSettings,
} from "~types/types";

export async function getOccupations(): Promise<Occupation[]> {
  const response = await fetch(`${env.data.APP_PLATFORM_API_URL}/occupations`);
  if (!response.ok) {
    return [];
  }
  return (await response.json()) as Occupation[];
}

export async function getEffects(): Promise<Paginator<Effect>> {
  try {
    const { data } = await axios.get<Paginator<Effect>>(
      `${env.data.APP_PLATFORM_API_URL}/effects`,
    );
    return data;
  } catch (error) {
    console.error("Error fetching effects from platform:", error);
  }
}

export async function getColors(): Promise<Paginator<Color>> {
  try {
    const { data } = await axios.get<Paginator<Color>>(
      `${env.data.APP_PLATFORM_API_URL}/colors`,
    );
    return data;
  } catch (error) {
    console.error("Error fetching effects from platform:", error);
  }
}

export type UpdateSettingsDTO = {
  occupation_id?: number;
  color_id?: number;
  effect_id?: number;
  pronouns?: string;
  timezone?: string;
  locale?: string;
};

export async function updateSettings(
  authorization: AccessTokenResponse,
  payload: UpdateSettingsDTO,
): Promise<UserSettings> {
  try {
    const { data } = await axios.put<UserSettings>(
      `${env.data.APP_PLATFORM_API_URL}/me/update-settings`,
      { ...payload, enabled: true, channel_id: "global" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorization.access_token}`,
        },
      },
    );
    return data;
  } catch (error) {
    console.error("Error fetching effects from platform:", error);
  }
}

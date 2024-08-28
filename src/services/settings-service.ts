import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { env } from "~config/env";
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
  enabled?: boolean;
  channel_id?: string;
};

export async function updateSettings(
  authorization: AccessTokenResponse,
  payload: UpdateSettingsDTO,
): Promise<UserSettings> {
  try {
    const { data } = await axios.put<UserSettings>(
      `${env.data.APP_PLATFORM_API_URL}/me/update-settings`,
      payload,
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

export async function getUserSettings(
  authorization: AccessTokenResponse,
  channelId?: string,
): Promise<[UserSettings?, UserSettings?]> {
  if (!authorization) return [];

  const url = `${env.data.APP_PLATFORM_API_URL}/me/settings${
    channelId ? `?channel_id=${channelId}` : ""
  }`;

  try {
    const { data } = await axios.get<{ data: [UserSettings, UserSettings?] }>(
      url,
      {
        headers: {
          Authorization: `Bearer ${authorization.access_token}`,
        },
      },
    );

    return data.data;
  } catch (error) {
    console.error("Error fetching user settings:", error);
    throw error;
  }
}

export const useGetUserSettingsQuery = ({
  channelId,
  authorization,
}: { channelId: string; authorization: AccessTokenResponse }) =>
  useQuery({
    queryKey: ["userSettings", "channelId", channelId],
    queryFn: async () => {
      const [globalSettings, channelSettings] = await getUserSettings(
        authorization,
        channelId,
      );

      const result: {
        globalSettings?: UserSettings;
        channelSettings?: UserSettings;
      } = { globalSettings, channelSettings };

      return result;
    },
  });

export const useGetUserSettingsMutation = () =>
  useMutation({
    mutationFn: ({
      authorization,
      payload,
    }: { authorization: AccessTokenResponse; payload: UpdateSettingsDTO }) =>
      updateSettings(authorization, payload),
  });

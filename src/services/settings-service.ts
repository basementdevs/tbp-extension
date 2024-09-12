import { env } from "@/config/env";
import type {
  AccessTokenResponse,
  Color,
  Effect,
  Occupation,
  Paginator,
  UserSettings,
} from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export async function getOccupations(): Promise<Occupation[]> {
  const response = await fetch(`${env.data.APP_PLATFORM_API_URL}/occupations`);
  if (!response.ok) {
    return [];
  }
  return (await response.json()) as Occupation[];
}

export async function getEffects(): Promise<Paginator<Effect> | undefined> {
  try {
    const { data } = await axios.get<Paginator<Effect>>(
      `${env.data.APP_PLATFORM_API_URL}/effects`,
    );
    return data;
  } catch (error) {
    console.error("Error fetching effects from platform:", error);
  }
}

export async function getColors(): Promise<Paginator<Color> | undefined> {
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
): Promise<UserSettings | undefined> {
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

export async function patchSettings(
  authorization: AccessTokenResponse,
  payload: UpdateSettingsDTO,
): Promise<UserSettings | undefined> {
  try {
    const { data } = await axios.patch<UserSettings>(
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

const apiAxiosInstance = axios.create({
  baseURL: env.data.APP_PLATFORM_API_URL,
});

export async function getUserGlobalSettings(
  authorization: AccessTokenResponse,
) {
  const { data } = await apiAxiosInstance.get<UserSettings>("/me/settings", {
    headers: {
      Authorization: `Bearer ${authorization.access_token}`,
    },
  });

  return data;
}

export async function getUserSettings(
  authorization: AccessTokenResponse,
  channelName?: string | null,
): Promise<[UserSettings?, UserSettings?]> {
  if (!authorization) return [];

  const url = `${env.data.APP_PLATFORM_API_URL}/me/settings${
    channelName ? `?channel_id=${channelName}` : ""
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
  channelName,
  authorization,
}: {
  channelName: string | undefined;
  authorization: AccessTokenResponse;
}) =>
  useQuery({
    queryKey: ["userSettings", "channelId", channelName],
    queryFn: async () => {
      const [globalSettings, channelSettings] = await getUserSettings(
        authorization,
        channelName,
      );

      const result: {
        globalSettings?: UserSettings;
        channelSettings?: UserSettings;
      } = { globalSettings, channelSettings };

      return result;
    },
  });

export const useUpdateUserSettingsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      authorization,
      payload,
    }: {
      authorization: AccessTokenResponse;
      payload: UpdateSettingsDTO;
    }) => updateSettings(authorization, payload),
    onSuccess: () => {
      queryClient.invalidateQueries();
      // This is a workaround, but the correct approach would be to invalidate directly the key, but is not working idk why
    },
  });
};

export const usePatchUserSettingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      authorization,
      payload,
    }: {
      authorization: AccessTokenResponse;
      payload: UpdateSettingsDTO;
    }) => patchSettings(authorization, payload),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

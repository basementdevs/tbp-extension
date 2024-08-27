import { useStorage } from "@plasmohq/storage/hook";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  type UpdateSettingsDTO,
  getUserSettings,
  updateSettings,
} from "~services/settings-service";
import type { AccessTokenResponse, UserSettings } from "~types/types";

type SettingsContextType = {
  globalSettings: UserSettings | null;
  channelSettings: UserSettings | null;
  fetchSettings: (params?: FetchSettingsParams) => Promise<void>;
  saveSettings: (updatedSettings: UpdateSettingsDTO) => Promise<void>;
  isTokenReady: boolean;
  isLoading: boolean;
};

type FetchSettingsParams = {
  currentTabValue: string;
  channelName?: string;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function SettingsProvider({ children }) {
  const [globalSettings, setGlobalSettings] = useState<UserSettings | null>(
    null,
  );
  const [channelSettings, setChannelSettings] = useState<UserSettings | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTokenReady, setIsTokenReady] = useState<boolean>(false);

  const [storedAccessToken] = useStorage<AccessTokenResponse>("accessToken");
  const [accessToken, setAccessToken] = useState<AccessTokenResponse | null>(
    null,
  );

  useEffect(() => {
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      setIsTokenReady(true);
    } else {
      setIsTokenReady(false);
    }
    setIsLoading(false);
  }, [storedAccessToken]);

  const fetchSettings = useCallback(
    async (params?: FetchSettingsParams) => {
      if (!accessToken || !isTokenReady) return;
      try {
        setIsLoading(true);
        const handleUrlSettings =
          params.currentTabValue === "global-profile"
            ? null
            : params.channelName;
        const settingsData = await getUserSettings(
          accessToken,
          handleUrlSettings,
        );

        if (settingsData.length === 2) {
          if (params.currentTabValue === "global-profile") {
            setGlobalSettings(settingsData[0]);
            setChannelSettings(null);
          } else {
            setChannelSettings(settingsData[1]);
            setGlobalSettings(settingsData[0]);
          }
        } else {
          setChannelSettings({ ...settingsData[0], enabled: false });
          setGlobalSettings(settingsData[0]);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken, isTokenReady],
  );

  const saveSettings = useCallback(
    async (updatedSettings: UpdateSettingsDTO) => {
      if (!accessToken || !isTokenReady) return;
      try {
        setIsLoading(true);
        const updatedSettingsData = await updateSettings(
          accessToken,
          updatedSettings,
        );
        if (updatedSettingsData.channel_id === "global") {
          setGlobalSettings(updatedSettingsData);
        } else {
          setChannelSettings(updatedSettingsData);
        }

        await fetchSettings({
          currentTabValue:
            updatedSettings.channel_id === "global"
              ? "global-profile"
              : "channel-profile",
          channelName:
            updatedSettings.channel_id !== "global"
              ? updatedSettings.channel_id
              : undefined,
        });
      } catch (error) {
        console.error("Error updating settings:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken, isTokenReady, fetchSettings],
  );

  return (
    <SettingsContext.Provider
      value={{
        globalSettings,
        channelSettings,
        fetchSettings,
        saveSettings,
        isLoading,
        isTokenReady,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

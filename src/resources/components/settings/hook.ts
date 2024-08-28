import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "../auth/access-token-provider";
import { getUserGlobalSettings } from "~services/settings-service";

export const useGetUserGlobalSettingsQuery = () => {
  const { accessToken } = useAccessToken();

  return useQuery({
    queryKey: ["userGlobalSettings"],
    queryFn: () => getUserGlobalSettings(accessToken),
  });
};

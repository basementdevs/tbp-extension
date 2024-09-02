import { env } from "@/config/env";
import type { MetricsResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = env.data.CONSUMER_API_URL;
const API_VERSION = env.data.CONSUMER_API_VERSION;

const BASE_URL = `${API_URL}/api/${API_VERSION}`;

export function getMetrics(authentication: string) {
  try {
    return axios.get<MetricsResponse>(`${BASE_URL}/metrics/by-user`, {
      headers: {
        Authorization: authentication,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error getting metrics:", error);
  }
}

export const useGetMetricsQuery = (authentication: string) =>
  useQuery({
    queryKey: ["metrics"],
    queryFn: () => getMetrics(authentication),
    select: (stats) => {
      const data = stats?.data;
      if (!data) {
        return {
          hoursWatched: 0,
          messages: 0,
          topChannels: [],
          topCategories: [],
        };
      }
      return {
        hoursWatched:
          data.main_metrics.minutes_watched &&
          data.main_metrics.minutes_watched > 0
            ? Math.round(data.main_metrics.minutes_watched / 60)
            : 0,
        messages: 0,
        topChannels: data.user_metrics_by_channel.slice(0, 4).map((channel) => {
          return `https://twitch-cdn.danielheart.dev/u/${channel.channel_id}.png`;
        }),
        topCategories: data.user_metrics_by_category
          .slice(0, 4)
          .map((channel) => {
            return `https://twitch-cdn.danielheart.dev/c/${channel.category_id}.png`;
          }),
      };
    },
  });

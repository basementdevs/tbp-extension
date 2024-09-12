import { env } from "@/config/env";
import axios from "axios";

const appPlatformAxiosInstance = axios.create({
  baseURL: env.data.APP_PLATFORM_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const consumerApiAxiosInstance = axios.create({
  baseURL: `${env.data.CONSUMER_API_URL}/api/${env.data.CONSUMER_API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export { appPlatformAxiosInstance, consumerApiAxiosInstance };

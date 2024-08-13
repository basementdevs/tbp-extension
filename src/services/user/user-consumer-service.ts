import { env } from "~config/env";

const API_URL = env.data.CONSUMER_API_URL;
const API_VERSION = env.data.CONSUMER_API_VERSION;

const BASE_URL = `${API_URL}/api/${API_VERSION}`;

console.log(BASE_URL);

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
  console.log(uri);
  const req = await fetch(uri);

  if (!req.ok) {
    return;
  }

  return (await req.json()) as ConsumerUserResponse;
}

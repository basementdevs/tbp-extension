import browser from "webextension-polyfill";

import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";

import type {
  AccessTokenResponse,
  ColorChatUser,
  TwitchUser,
  User,
  UserSettings,
} from "~types/types";
import { env } from "~config/env";

const CLIENT_ID = process.env.PLASMO_PUBLIC_TWITCH_CLIENT_ID;
const TWITCH_API_URL = process.env.PLASMO_PUBLIC_TWITCH_API_URL;
const API_URL: string = process.env.PLASMO_PUBLIC_API_URL;

const REDIRECT_URI = browser.identity.getRedirectURL();

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const storage = new Storage();
  const accessToken = await authenticateWithTwitch();
  await storage.set("accessToken", accessToken);

  let  [serverAccessToken, user] = await authenticateWithServer(accessToken);
  user = user as User;
  await storage.set("user", user);

  const settings = await getUserDataByUsername(
    user.accounts[0].nickname,
    user.accounts[0].provider_user_id,
  );

  await storage.set("settings", settings);

  const color = await getUserChatColor(user.accounts[0].token, user.accounts[0].provider_user_id);
  await storage.set("color", color);

  if (settings) {
    await storage.set("pronouns", settings.pronouns);
    await storage.set("occupation", settings.occupation);
  }

  res.send({
    auth: true,
    user: user,
  });
};

async function getUserDataByUsername(
  username: string,
  user_id: string,
): Promise<UserSettings | null> {
  const settings = await fetch(`${API_URL}/settings/${username}`, {
    headers: {
      "Client-ID": CLIENT_ID,
    },
  });

  if (settings.ok) {
    return (await settings.json()) as UserSettings;
  }

  const response = await fetch(
    `${process.env.PLASMO_PUBLIC_API_URL}/settings`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pronouns: "n/d",
        locale: navigator.language,
        occupation: "none",
        user_id: user_id,
        username: username,
      }),
    },
  );

  if (settings.ok) {
    return (await settings.json()) as UserSettings;
  }

  return null;
}

async function getUserChatColor(
  accessToken: string,
  userId: string,
): Promise<string | null> {
  const usernameColorRequest = await fetch(
    `${TWITCH_API_URL}/chat/color?user_id=${userId}`,
    {
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (usernameColorRequest.ok) {
    const response: ColorChatUser = await usernameColorRequest.json();
    return response.data[0].color;
  }
  return "gray";
}

/**
 * Authenticate with Twitch using OAuth2
 *
 * @returns string - Access Token
 */
async function authenticateWithTwitch() {
  const AUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=user:read:email`;

  const redirectURL = await browser.identity.launchWebAuthFlow({
    interactive: true,
    url: AUTH_URL,
  });

  const urlParams = new URLSearchParams(redirectURL);
  return urlParams.entries().next().value[1];
}

async function authenticateWithServer(code: string) {
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

  let data = await response.json();
  console.log(data);

  let user = data.user as User;
  //delete data.user;

  let accessToken = data as AccessTokenResponse;

  return [accessToken, user];
}

export default handler;

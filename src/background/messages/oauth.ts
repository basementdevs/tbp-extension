import browser from "webextension-polyfill";

import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";

import type { AccessTokenResponse, TwitchUser, User } from "~types/types";
import { env } from "~config/env";
import { getOccupations } from "~services/occupation-service";

const CLIENT_ID = process.env.PLASMO_PUBLIC_TWITCH_CLIENT_ID;

const REDIRECT_URI = browser.identity.getRedirectURL();


const handler: PlasmoMessaging.MessageHandler = async (req, res) => {

  const accessToken = await authenticateWithTwitch();
  let [serverAccessToken, user, twitchUser] =
    await authenticateWithServer(accessToken);
  user = user as User;
  const storage = new Storage();

  await storage.set("user", user);
  await storage.set("accessToken", serverAccessToken);
  await storage.set("twitchUser", twitchUser);
  let occupations = await getOccupations();
  console.log(occupations);
  await storage.set("occupations",  occupations);

  res.send({
    auth: true,
    user: user,
  });
};

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

  let accessToken = data as AccessTokenResponse;
  let twitchUser = {
    id: parseInt(user.accounts[0].provider_user_id),
    login: user.accounts[0].nickname,
    display_name: user.accounts[0].name,
  } as TwitchUser;

  return [accessToken, user, twitchUser];
}

export default handler;

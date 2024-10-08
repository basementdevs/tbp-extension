import browser from "webextension-polyfill";

import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";

import { env } from "@/config/env";
import {
  getColors,
  getEffects,
  getOccupations,
} from "@/services/settings-service";
import { authenticateWithServer } from "@/services/user/user-consumer-service";

const CLIENT_ID = env.data.TWITCH_CLIENT_ID;

const REDIRECT_URI = browser.identity.getRedirectURL();

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

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const accessToken = await authenticateWithTwitch();

  const authResult = await authenticateWithServer(accessToken);

  if (!authResult) {
    console.error("Failed to authenticate with Twitch");
    return;
  }

  const { authorization, user, twitchUser } = authResult;

  const [occupations, effects, colors] = await Promise.all([
    getOccupations(),
    getEffects(),
    getColors(),
  ]);

  const storage = new Storage();

  await storage.set("user", user);
  await storage.set("accessToken", authorization);
  await storage.set("twitchUser", twitchUser);

  await storage.set("occupations", occupations);
  await storage.set("settings-effects", effects?.data);
  await storage.set("settings-colors", colors?.data);

  res.send({
    auth: true,
    user: user,
  });
};

export default handler;

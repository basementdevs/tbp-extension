import browser from "webextension-polyfill";

import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";

import { env } from "~config/env";
import { getOccupations } from "~services/occupation-service";
import { authenticateWithServer } from "~services/user/user-consumer-service";

const CLIENT_ID = env.data.TWITCH_CLIENT_ID;

const REDIRECT_URI = browser.identity.getRedirectURL();

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const accessToken = await authenticateWithTwitch();
  const { authorization, user, twitchUser } =
    await authenticateWithServer(accessToken);

  const storage = new Storage();

  await storage.set("user", user);
  await storage.set("accessToken", authorization);
  await storage.set("twitchUser", twitchUser);
  const occupations = await getOccupations();
  await storage.set("occupations", occupations);

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

export default handler;

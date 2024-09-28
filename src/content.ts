import { env } from "@/config/env";
import type { PlasmoCSConfig } from "plasmo";
import Kernel from "./scripting/index";

export const config: PlasmoCSConfig = {
  matches: [
    "https://dashboard.twitch.tv/u/*/stream-manager",
    "https://www.twitch.tv/embed/*/chat*",
    "https://www.twitch.tv/*",
  ],
  exclude_matches: [
    "*://*.twitch.tv/*.html",
    "*://*.twitch.tv/*.html?*",
    "*://*.twitch.tv/*.htm",
    "*://*.twitch.tv/*.htm?*",
  ],
  all_frames: true,
};

const cssDocumentEl = document.getElementById("tbp-effects");

if (!cssDocumentEl) {
  const current_ts = Date.now();
  const uri = `${env.data.APP_PLATFORM_API_URL}/storage/effects.css?ts=${current_ts}`;
  const link = document.createElement("link");
  link.id = "tbp-effects";
  link.rel = "stylesheet";
  link.href = uri;
  document.head.appendChild(link);
}

new Kernel().init();

import type { PlasmoCSConfig } from "plasmo";

import "@Scripting/scripting.css";

import Kernel from "@Scripting/index";

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

new Kernel().init();

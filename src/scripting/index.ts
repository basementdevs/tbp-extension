import ChatMutationObserver from "@Scripting/observers/chat-observer";
import PopoverMutationObserver from "@Scripting/observers/popover-observer";
import PageWatcher, {
  PageWatcherState,
} from "@Scripting/watchers/page-watcher";
import { Storage } from "@plasmohq/storage";
import browser from "webextension-polyfill";
import { sendHeartbeat } from "~services/user/user-consumer-service";
import type { AccessTokenResponse } from "~types/types";
import { extractUsername } from "~utils/regex";

const TWITCH_CHAT_LIST = ".chat-list--default,.chat-list--other,.chat-list";
const SEVEN_TV_CHAT_LIST = ".seventv-chat-list";
const CHAT_LIST = `${TWITCH_CHAT_LIST},${SEVEN_TV_CHAT_LIST}`;
const POPOVER_ELEMENT = ".viewer-card-layer";
const CATEGORY_ELEMENT_SELECTOR = 'a[data-a-target="stream-game-link"]';
const storage = new Storage();

let interval: number | null = null;
let currentCategory = "";

export default class Kernel {
  // Core components
  private chatObserver: ChatMutationObserver;
  private pageWatcher: PageWatcher;
  private popoverObserver: PopoverMutationObserver;

  constructor() {
    this.chatObserver = new ChatMutationObserver();
    this.popoverObserver = new PopoverMutationObserver();
    this.pageWatcher = new PageWatcher();
    this.pageWatcher.init();
  }

  init = () => {
    setInterval(async () => {
      if (this.pageWatcher.matches() && !this.pageWatcher.observerRunning) {
        console.log(
          "TBP: PageWatcher matched, starting to listen to Twitch DOM...",
        );
        this.listenToTwitchDOM();
      } else if (
        !this.pageWatcher.matches() &&
        this.pageWatcher.observerRunning
      ) {
        console.log("TBP: PageWatcher didn't match, stopping observer...");
        this.stop();
      } else if (this.pageWatcher.refresh()) {
        this.stop();
        this.listenToTwitchDOM();
      } else if (
        !this.pageWatcher.matches() &&
        !this.pageWatcher.observerRunning
      ) {
        // console.log("TBP: Not on a watchable page...");
      } else {
        //console.log("TBP: Waiting...");
      }
    }, 25);
  };

  private async listenToTwitchDOM() {
    console.log("TBP: Loading Twitch Better Profile...");

    const chatElements = document.querySelector(CHAT_LIST);
    if (!chatElements) {
      return setTimeout(this.init, 50);
    }

    const chat = chatElements as Node;
    const popover = document.querySelector(POPOVER_ELEMENT) as Node;
    console.log("TBP: Loaded! Starting to listen to new messages...");

    this.chatObserver.start(chat, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    this.popoverObserver.start(popover, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    this.pageWatcher.observerRunning = true;
    this.pageWatcher.pageState = PageWatcherState.MATCHED;

    // Check if the category has changed
    console.log("TBP: Checking for category changes...");
    const channelName = extractUsername(window.location.href);

    if (!channelName) {
      return;
    }

    await storage.set("channelName", channelName);

    setTimeout(() => {
      const categoryElement = document.querySelector(CATEGORY_ELEMENT_SELECTOR);
      if (categoryElement) {
        const category = categoryElement.getAttribute("href").split("/").pop();
        currentCategory = category;
        console.log(`TBP: Category changed to ${category}`);
      }
      // @ts-ignore
      interval = setInterval(() => {
        browser.storage.sync.get("accessToken").then((res) => {
          const authorization: AccessTokenResponse = JSON.parse(
            res.accessToken,
          );

          if (!authorization) {
            return;
          }
          sendHeartbeat(
            authorization.access_token,
            channelName,
            currentCategory,
          ).then(() => console.log("TBP: Heartbeat sent!"));
        });
      }, 60 * 1000);
    }, 5000);

    window.addEventListener("beforeunload", async () => {
      await storage.set("channelName", "");
    });
  }

  stop = () => {
    this.pageWatcher.observerRunning = false;
    this.chatObserver.stop();
    this.popoverObserver.stop();
    clearInterval(interval);
  };
}

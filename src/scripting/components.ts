import { Storage } from "@plasmohq/storage";
import { env } from "~config/env";
import { getUserSettings } from "~services/settings-service";
import { getUserFromConsumer } from "~services/user/user-consumer-service";
import type { Occupation } from "~types/types";
import { t } from "~utils/i18nUtils";

const API_URL: string = env.data.CONSUMER_API_URL;

const TWITCH_BADGES_CONTAINER = ".chat-line__username-container";
const SEVEN_TV_BADGES_CONTAINER = ".seventv-chat-user-badge-list";

const TWITCH_USERNAME_CONTAINER = ".chat-line__username";
const SEVEN_TV_USERNAME_CONTAINER = ".seventv-chat-user-username";
const USERNAME_CONTAINER = `${TWITCH_USERNAME_CONTAINER},${SEVEN_TV_USERNAME_CONTAINER}`;
const storage = new Storage();

const enhanceChatMessage = async (messageEl: HTMLElement) => {
  const usernameContainer = messageEl.querySelector(USERNAME_CONTAINER);
  const channelName = await storage.get("channelName");
  const accessToken = await storage.get("accessToken");

  let badgesEl: Element | null;
  badgesEl = messageEl.querySelector(TWITCH_BADGES_CONTAINER);

  if (badgesEl) {
    badgesEl = badgesEl.childNodes[0] as Element;
  } else {
    badgesEl = messageEl.querySelector(SEVEN_TV_BADGES_CONTAINER);
  }

  if (!usernameContainer) {
    return;
  }
  const username = usernameContainer.textContent;

  const consumerUser = await getUserSettings(accessToken, channelName);

  if (!consumerUser) {
    return;
  }

  const settings = consumerUser?.[1]?.enabled
    ? consumerUser[1]
    : consumerUser[0];

  const usernameEl = usernameContainer.querySelector(
    ".chat-author__display-name",
  );

  if (settings.color && settings.color.slug !== "none") {
    // @ts-ignore
    usernameEl.style.color = settings.color.hex;
  }

  if (settings.effect && settings.effect.slug !== "none") {
    // @ts-ignore
    usernameEl.classList.add(settings.effect.class_name);
  }

  const child = usernameContainer.firstChild;
  const i18nPronouns = t(`pronouns${settings.pronouns.translation_key}`);
  const pronounsElement = document.createElement("span");
  pronounsElement.textContent = `(${i18nPronouns})`;
  pronounsElement.style.color = "gray";
  pronounsElement.style.marginLeft = "4px";

  if (child) {
    usernameContainer.appendChild(pronounsElement);
    badgesEl.appendChild(buildBadge(settings.occupation));
  }
};

const buildBadge = (occupation: Occupation) => {
  // Create a div element
  const badgeContainer = document.createElement("div");
  badgeContainer.className =
    "InjectLayout-sc-1i43xsx-0 jbmPmA seventv-chat-badge";
  // SevenTV Stuff
  badgeContainer.setAttributeNode(document.createAttribute("data-v-9f956e7d"));

  // Create an img element
  const img = document.createElement("img");
  img.alt = "Just a thing";
  img.width = 18;
  img.setAttribute("aria-label", "Just a thing");
  img.className = "chat-badge";
  const badgeUrl = `${API_URL}/static/icons/${occupation.slug}.png`;
  img.src = badgeUrl;
  img.srcset = `${badgeUrl} 1x,${badgeUrl} 2x,${badgeUrl} 4x`;

  // Append the img to the div
  badgeContainer.appendChild(img);

  return badgeContainer;
};

async function enhanceTwitchPopover(nameCard: Element, detailsCard: Element) {
  const username = nameCard.textContent?.trim();

  if (!username) {
    return;
  }

  const res = await getUserFromConsumer(username);

  const i18nPronouns = t(`pronouns${res.pronouns.translation_key}`);
  nameCard.innerHTML += `<span class="pronouns-card">(${i18nPronouns})</span>`;

  const occupationContainer = document.createElement("div");
  occupationContainer.className = "occupation-job";
  occupationContainer.innerHTML = `
            ${buildBadge(res.occupation).outerHTML}
            <span>${res.occupation.name}</span>
          `;

  detailsCard.appendChild(occupationContainer);
}

export { enhanceChatMessage, enhanceTwitchPopover };

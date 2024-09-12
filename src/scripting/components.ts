import { env } from "@/config/env";
import {
  type ConsumerUserResponse,
  type SettingsOption,
  getUserFromConsumer,
} from "@/services/user/user-consumer-service";
import { t } from "@/utils/i18n";
import { Storage } from "@plasmohq/storage";

const API_URL: string = env.data.CONSUMER_API_URL;

const SELECTORS = {
  TWITCH_BADGES: ".chat-line__username-container",
  SEVEN_TV_BADGES: ".seventv-chat-user-badge-list",
  TWITCH_USERNAME: ".chat-line__username",
  SEVEN_TV_USERNAME: ".seventv-chat-user-username",
  get USERNAME() {
    return `${this.TWITCH_USERNAME},${this.SEVEN_TV_USERNAME}`;
  },
};

const enhanceChatMessage = async (messageEl: HTMLElement) => {
  try {
    const usernameContainer = messageEl.querySelector(SELECTORS.USERNAME);
    if (!usernameContainer) return;

    const storage = new Storage();
    const channelId = await storage.get("channelName");
    const username = usernameContainer.textContent || "";
    const consumerUser = await getUserFromConsumer(username, channelId);
    if (!consumerUser) return;

    const badgesEl = getBadgesElement(messageEl);
    updateUsername(usernameContainer, consumerUser);
    addPronouns(usernameContainer, consumerUser.pronouns);
    addOccupationBadge(badgesEl, consumerUser.occupation);
  } catch (error) {
    console.error("Error enhancing chat message:", error);
  }
};

const getBadgesElement = (messageEl: HTMLElement): Element | null => {
  const badgesEl = messageEl.querySelector(SELECTORS.TWITCH_BADGES);
  if (badgesEl) {
    return badgesEl.childNodes[0] as Element;
  }
  return messageEl.querySelector(SELECTORS.SEVEN_TV_BADGES);
};

const updateUsername = (container: Element, user: ConsumerUserResponse) => {
  const usernameEl = container.querySelector(".chat-author__display-name");
  if (!usernameEl) return;

  if (user.color && user.color.slug !== "none") {
    (usernameEl as HTMLElement).style.color = user.color.hex || "";
  }

  if (user.effect && user.effect.slug !== "none") {
    usernameEl.classList.add(user.effect.class_name);
  }
};

const addPronouns = (container: Element, pronouns: SettingsOption) => {
  const i18nPronouns =
    pronouns.translation_key === "None"
      ? "-"
      : t(`pronouns${pronouns.translation_key}`);

  const pronounsElement = createPronounsElement(i18nPronouns);
  container.appendChild(pronounsElement);
};

const createPronounsElement = (text: string): HTMLSpanElement => {
  const element = document.createElement("span");
  element.textContent = `(${text})`;
  element.style.color = "gray";
  element.style.marginLeft = "4px";
  return element;
};

const addOccupationBadge = (
  badgesEl: Element | null,
  occupation: SettingsOption,
) => {
  if (badgesEl) {
    badgesEl.appendChild(buildBadge(occupation));
  }
};

const buildBadge = (occupation: SettingsOption): HTMLDivElement => {
  const badgeContainer = document.createElement("div");
  badgeContainer.className =
    "InjectLayout-sc-1i43xsx-0 jbmPmA seventv-chat-badge";
  badgeContainer.setAttributeNode(document.createAttribute("data-v-9f956e7d"));

  const img = document.createElement("img");
  img.alt = "Just a thing";
  img.width = 18;
  img.setAttribute("aria-label", "Just a thing");
  img.className = "chat-badge";
  const badgeUrl = `${API_URL}/static/icons/${occupation.slug}.png`;
  img.src = badgeUrl;
  img.srcset = `${badgeUrl} 1x,${badgeUrl} 2x,${badgeUrl} 4x`;

  badgeContainer.appendChild(img);
  return badgeContainer;
};

async function enhanceTwitchPopover(nameCard: Node, detailsCard: Node) {
  const username = nameCard.textContent?.trim() || "";
  const storage = new Storage();
  const channelId = await storage.get("channelName");
  const res = await getUserFromConsumer(username, channelId);

  addPronounsToNameCard(
    nameCard,
    res?.pronouns || {
      name: "",
      slug: "",
      translation_key: "None",
    },
  );
  addOccupationToDetailsCard(
    detailsCard,
    res?.occupation || {
      name: "",
      slug: "",
      translation_key: "None",
    },
  );
}

const addPronounsToNameCard = (nameCard: Node, pronouns: SettingsOption) => {
  const i18nPronouns = t(
    `${pronouns.translation_key === "None" ? "-" : "pronouns"}${pronouns.translation_key}`,
  );
  if (nameCard instanceof HTMLElement) {
    nameCard.innerHTML += `<span class="pronouns-card">(${i18nPronouns})</span>`;
  }
};

const addOccupationToDetailsCard = (
  detailsCard: Node,
  occupation: SettingsOption,
) => {
  if (detailsCard instanceof HTMLElement) {
    const occupationContainer = document.createElement("div");
    occupationContainer.className = "occupation-job";
    occupationContainer.innerHTML = `
      ${buildBadge(occupation).outerHTML}
      <span>${occupation.name}</span>
    `;
    detailsCard.appendChild(occupationContainer);
  }
};

export { enhanceChatMessage, enhanceTwitchPopover };

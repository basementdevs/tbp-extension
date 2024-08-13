import { env } from "~config/env";
import { getUserFromConsumer } from "~services/user/user-consumer-service";
import { t } from "~utils/i18nUtils";

const API_URL: string = env.data.CONSUMER_API_URL;

const TWITCH_BADGES_CONTAINER = ".chat-line__username-container";
const SEVEN_TV_BADGES_CONTAINER = ".seventv-chat-user-badge-list";

const TWITCH_USERNAME_CONTAINER = ".chat-line__username";
const SEVEN_TV_USERNAME_CONTAINER = ".seventv-chat-user-username";
const USERNAME_CONTAINER = `${TWITCH_USERNAME_CONTAINER},${SEVEN_TV_USERNAME_CONTAINER}`;

const enhanceChatMessage = async (messageEl: HTMLElement) => {
  const usernameEl = messageEl.querySelector(USERNAME_CONTAINER);
  let badgesEl: Element;
  badgesEl = messageEl.querySelector(TWITCH_BADGES_CONTAINER);
  if (badgesEl) {
    badgesEl = badgesEl.childNodes[0] as Element;
  } else {
    badgesEl = messageEl.querySelector(SEVEN_TV_BADGES_CONTAINER);
  }

  if (!usernameEl) {
    return;
  }

  const username = usernameEl.textContent;
  const res = await getUserFromConsumer(username);

  if (!res) {
    return;
  }
  const child = usernameEl.firstChild;
  const i18nPronouns = t(`pronouns${res.pronouns.translation_key}`);
  const pronounsElement = document.createElement("span");
  pronounsElement.textContent = `(${i18nPronouns})`;
  pronounsElement.style.color = "gray";
  pronounsElement.style.marginLeft = "4px";

  if (child) {
    usernameEl.appendChild(pronounsElement);
    badgesEl.appendChild(buildBadge(res.occupation));
  }
};

const buildBadge = (occupation) => {
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

async function enhanceTwitchPopover(nameCard: Node, detailsCard: Node) {
  const username = nameCard.textContent.trim();

  const res = await getUserFromConsumer(username);

  const i18nPronouns = t(`pronouns${res.pronouns.translation_key}`);
  // @ts-ignore
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

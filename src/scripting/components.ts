import { occupations, pronounsItems } from "@Components/settings/settings-form";
import { t } from "~utils/i18nUtils";

const API_URL: string = process.env.PLASMO_PUBLIC_API_URL;

const TWITCH_BADGES_CONTAINER = ".chat-line__username-container";
const SEVEN_TV_BADGES_CONTAINER = ".seventv-chat-user-badge-list";

const TWITCH_USERNAME_CONTAINER = ".chat-line__username";
const SEVEN_TV_USERNAME_CONTAINER = ".seventv-chat-user-username";
const USERNAME_CONTAINER = `${TWITCH_USERNAME_CONTAINER},${SEVEN_TV_USERNAME_CONTAINER}`;

const enhanceChatMessage = async (messageEl: HTMLElement) => {
  const usernameEl = messageEl.querySelector(USERNAME_CONTAINER);

  /**
   * TODO: make adapters based on which plugins the user has installed (compatibility mode)
   * Restructure the code to make it more modular and easy to maintain (Goal: 1.0.0)
   **/
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
  const uri = `${API_URL}/settings/${username}`;
  const req = await fetch(uri);

  if (!req.ok) {
    return;
  }

  const res = await req.json();
  const child = usernameEl.firstChild;

  const pronouns = res.pronouns.replace("/", "");
  const i18nPronouns = t(`pronouns${pronouns}`);
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

  // Get the occupation object
  const occupationObject = occupations.find((o) => o.apiValue === occupation);

  // Create an img element
  const img = document.createElement("img");
  // Create a title
  const title =
    occupationObject.translationKey === "None"
      ? "Twitch Better Profile"
      : t(`occupation${occupationObject.translationKey}`);

  img.alt = "Just a thing";
  img.width = 18;
  img.setAttribute("aria-label", "Just a thing");
  img.className = "chat-badge";
  const badgeUrl = `${API_URL}/static/icons/${occupation}.png`;
  img.src = badgeUrl;
  img.srcset = `${badgeUrl} 1x,${badgeUrl} 2x,${badgeUrl} 4x`;

  // Wrap img in a tooltip container
  const tooltipContainer = document.createElement("div");
  tooltipContainer.className = "tooltip-container gJjWWl tw-transition";

  // Create a tooltip element
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip-text cQRCoy etwtmn";
  tooltip.innerText = title;

  // Create the arrow element for the tooltip
  const tooltipArrow = document.createElement("div");
  tooltipArrow.className = "tooltip-arrow";

  // Append img and tooltip to the tooltip container
  tooltip.appendChild(tooltipArrow);
  tooltipContainer.appendChild(img);
  tooltipContainer.appendChild(tooltip);

  // Append the tooltip container to the div
  badgeContainer.appendChild(tooltipContainer);

  return badgeContainer;
};

async function enhanceTwitchPopover(nameCard: Node, detailsCard: Node) {
  const username = nameCard.textContent.trim();

  const uri = `${API_URL}/settings/${username}`;
  const req = await fetch(uri);

  if (!req.ok) {
    return;
  }

  const res = await req.json();
  const currentPronoun = pronounsItems.find((p) => p.apiValue === res.pronouns);

  const i18nPronouns = t(`pronouns${currentPronoun.translationKey}`);
  // @ts-ignore
  nameCard.innerHTML += `<span class="pronouns-card">(${i18nPronouns})</span>`;
  const occupationObject = occupations.find(
    (o) => o.apiValue === res.occupation,
  );
  const occupation = t(`occupation${occupationObject.translationKey}`);

  const occupationContainer = document.createElement("div");
  occupationContainer.className = "occupation-job";
  occupationContainer.innerHTML = `
            ${buildBadge(res.occupation).outerHTML}
            <span>${occupation}</span>
          `;

  detailsCard.appendChild(occupationContainer);
}

export { enhanceChatMessage, enhanceTwitchPopover };

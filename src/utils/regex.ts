const watchableUserPages = [
  /^https:\/\/www\.twitch\.tv\/([^\/]+)$/,
  //TODO: check if there's any other page link that should be included here
];

export function extractUsername(url: string) {
  for (const regex of watchableUserPages) {
    const match = url.match(regex);
    if (match) {
      let url = match[1];
      if (url.includes("?")) {
        url = url.split("?")[0];
      }
      return url;
    }
  }
  return null; // No match found
}

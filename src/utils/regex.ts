const watchableUserPages = [
  /^https:\/\/www\.twitch\.tv\/([^\/]+)$/,
  //TODO: check if there's any other page link that should be included here
];

export function extractUsername(url) {
  for (const regex of watchableUserPages) {
    const match = url.match(regex);
    if (match) {
      return match[1]; // Extracted username
    }
  }
  return null; // No match found
}

const watchablePages = [
  /^https:\/\/dashboard\.twitch\.tv\/u\/([^\/]+)\/stream-manager$/,
  /^https:\/\/www\.twitch\.tv\/embed\/([^\/]+)\/chat.*$/,
  /^https:\/\/www\.twitch\.tv\/([^\/]+)$/,
];

export function extractUsername(url) {
  for (const regex of watchablePages) {
    const match = url.match(regex);
    if (match) {
      return match[1]; // Extracted username
    }
  }
  return null; // No match found
}

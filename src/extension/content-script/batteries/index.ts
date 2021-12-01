import browser from "webextension-polyfill";

// import GitHubRepo from "./GitHubRepo";
import Monetization from "./Monetization";
import Twitter from "./Twitter";
import YouTubeVideo from "./YouTubeVideo";
// import YouTubeChannel from "./YouTubeChannel";

// Order is important as the first one for which the URL matches will be used
const enhancements = [Twitter, YouTubeVideo, Monetization];

async function extractLightningData() {
  const { settings } = await browser.storage.sync.get({
    settings: {
      websiteEnhancements: true, // defaults to true when not set.
    },
  });
  if (!settings.websiteEnhancements) return;

  const match = enhancements.find((e) =>
    document.location.toString().match(e.urlMatcher)
  );

  if (match) {
    match.battery();
  }
}
export default extractLightningData;

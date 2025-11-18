import { el } from "./dom.js";
import { API_LINK } from "../constants/index.js";

export function load(links) {
  const promises = links.map((element) => {
    if (element.endsWith(".css")) {
      return new Promise((resolve) => {
        const link = el("link", {
          attrs: [{ rel: "stylesheet" }, { href: `./src/css/${element}` }],
        });
        link.onload = () => resolve();
        link.onerror = () => resolve();
        document.head.append(link);
      });
    }

    if (element.startsWith(API_LINK)) {
      return fetch(element)
        .then((r) => r.json())
        .then((data) => data)
        .catch((err) => {
          console.error(err);
          return null;
        });
    }

    return Promise.resolve();
  });

  return Promise.all(promises);
}

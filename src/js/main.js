import { load } from "./utils/loader.js";
import { ui } from "./ui.js";
import { API_LINK } from "./constants/index.js";
const app = document.getElementById("app");

async function init() {
  const url = window.location.pathname;
  const params = new URLSearchParams(window.location.search);

  switch (url) {
    case "/src/index.html":
      load(["page.css", `${API_LINK}films`]).then(([, data]) => {
        ui(app, "main", data);
      });
      break;
    case "/src/episodeInfo.html":
      if (!params.get("ep")) {
        console.error("Episode ID is missing");
        return;
      }
      load([
        "episodeInfo.css",
        `${API_LINK}/films/${params.get("ep")}`,
      ]).then(async ([, data]) => {
        const [planets, species, characters] = await Promise.all([
          load(data.planets),
          load(data.species),
          load(data.characters),
        ]);

        ui(app, "episodeInfo", {
          ...data,
          planets,
          species,
          characters,
        });
      });
      break;
    default:
      console.error("Unknown page");
  }
}

init();

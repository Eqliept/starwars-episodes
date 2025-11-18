import { load } from "./utils/loader.js";
import { API_LINK } from "./constants/index.js";
import { ui } from "./ui.js";

export function pageManager(container, url, params) {
    switch (url) {
        case "/index.html":
        load(["page.css", `${API_LINK}films`]).then(([, data]) => {
            ui(container, "main", data);
        });
        break;
        case "/episodeInfo.html":
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

            ui(container, "episodeInfo", {
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

    window.addEventListener("popstate", () => {
        const url = window.location.pathname;
        const params = new URLSearchParams(window.location.search);
        pageManager(app, url, params);
    })
}
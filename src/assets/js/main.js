import { load } from "./utils/loader.js";
import { ui } from "./ui.js";

const app = document.getElementById("app");

async function init() {
    const url = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    if (url === "/src/index.html") {
        load(["page.css", "https://swapi.dev/api/films"]).then(([, data]) => {
            ui(app, "main", data);
        })
    }

if (url === "/src/episodeInfo.html" && params.get("ep")) {

    load(["episodeInfo.css", `https://swapi.dev/api/films/${params.get("ep")}`])
        .then(async ([, data]) => {
            
            const [planets, species, characters] = await Promise.all([
                load(data.planets),
                load(data.species),
                load(data.characters)
            ]);

            data.planets = planets;
            data.species = species;
            data.characters = characters;

            ui(app, "episodeInfo", data);
        });
    }
}

init();
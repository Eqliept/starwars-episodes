import { el } from "./dom.js";

const apiLink = "https://swapi.dev/api/";

export function load(links) {
    const promises = links.map(element => {
        if (element.endsWith(".css")) {
            return new Promise(resolve => {
                const link = el("link", {attrs: [{"rel": "stylesheet"}, {"href": `./assets/css/${element}`}]} );
                link.onload = () => resolve();
                link.onerror = () => resolve();
                document.head.append(link);
            });
        }

        if (element.startsWith(apiLink)) {
            return fetch(element)
                .then(r => r.json())
                .then(data => data)
                .catch(err => { 
                    console.error(err); 
                    return null; 
                });
        }

        return Promise.resolve();
    });

    return Promise.all(promises);
}

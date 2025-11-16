import { el } from "./utils/dom.js";

export function ui(container, page, data) {
    if (page === "main") {
        data.results.map(element => {
            const card = el("div", {classes: ["card"]});
            const cardTitle = el("div", {classes: ["card__title"], text: element.title});
            const cardDescr = el("p", {classes: ["card__description"], text: element.opening_crawl});
            const cardReleaseDate = el("time", {classes: ["card__release-date"], text: element.release_date});
            const cardLink = el("a", {classes: ["card__link"], attrs: [{"href": `episodeInfo.html?ep=${element.episode_id}`}], text: "Полное описание"});

            card.append(cardTitle, cardDescr, cardReleaseDate, cardLink);
            container.append(card);
        })
    }

    if (page === "episodeInfo") {
        const cardInfo = el("div", {classes: ["card-info"]});
        const cardInfoTitle = el("h1", {classes: ["card-info__title"], text: data.title});
        const cardInfoDirector = el("h2", {classes: ["card-info__director"], text: data.director});
        const cardInfoProducer = el("h3", {classes: ["card-info__producer"], text: data.producer});
        const release_date = el("time", {classes: ["card-info__release-date"], text: data.release_date});

        cardInfo.append(cardInfoTitle, cardInfoDirector, cardInfoProducer, release_date)

        let isFirstSection = true;

        if (data?.planets && data.planets.length > 0) {
            if (!isFirstSection) {
                const sectionDivider = el("div", {classes: ["section-divider"]});
                cardInfo.append(sectionDivider);
            }
            isFirstSection = false;
            
            const planetsSection = el("section", {classes: ["section", "section-planets"]});
            const planetsHeader = el("div", {classes: ["section-header"]});
            const planetsTitle = el("h2", {classes: ["section-title", "section-title--planets"], text: "Планеты"});
            const planetsCount = el("span", {classes: ["section-count"], text: `${data.planets.length}`});
            const planetsList = el("ul", {classes: ["planets-list"]});
            
            planetsTitle.append(planetsCount);
            planetsHeader.append(planetsTitle);
            planetsSection.append(planetsHeader);
            
            data.planets.map(element => {
                const listItem = el("li", {classes: ["planets-list__item"]});
                const cardPlanet = el("div", {classes: ["card-planet"]});
                const cardPlanetName = el("strong", {classes: ["card-planet__name"], text: element.name});
                const cardPlanetDiameter = el("span", {classes: ["card-planet__diameter"], text: element.diameter});
                const cardPlanetPopulation = el("span", {classes: ["card-planet__population"], text: element.population});

                cardPlanet.append(cardPlanetName, cardPlanetDiameter, cardPlanetPopulation);
                listItem.append(cardPlanet);
                planetsList.append(listItem);
            });
            
            planetsSection.append(planetsList);
            cardInfo.append(planetsSection);
        }

        if (data?.species && data.species.length > 0) {
            if (!isFirstSection) {
                const sectionDivider = el("div", {classes: ["section-divider"]});
                cardInfo.append(sectionDivider);
            }
            isFirstSection = false;
            
            const speciesSection = el("section", {classes: ["section", "section-species"]});
            const speciesHeader = el("div", {classes: ["section-header"]});
            const speciesTitle = el("h2", {classes: ["section-title", "section-title--species"], text: "Виды"});
            const speciesCount = el("span", {classes: ["section-count"], text: `${data.species.length}`});
            const speciesList = el("ul", {classes: ["species-list"]});
            
            speciesTitle.append(speciesCount);
            speciesHeader.append(speciesTitle);
            speciesSection.append(speciesHeader);
            
            data.species.map(element => {
                const listItem = el("li", {classes: ["species-list__item"]});
                const cardSpecie = el("div", {classes: ["card-specie"]});
                const cardSpecieName = el("strong", {classes: ["card-specie__name"], text: element.name});
                const cardSpecieAverageHeight = el("span", {classes: ["card-specie__average-height"], text: element.average_height});
                const cardSpecieClassification = el("span", {classes: ["card-specie__classification"], text: element.classification});
                const cardSpecieLanguage = el("span", {classes: ["card-specie__language"], text: element.language});

                cardSpecie.append(cardSpecieName, cardSpecieAverageHeight, cardSpecieClassification, cardSpecieLanguage);
                listItem.append(cardSpecie);
                speciesList.append(listItem);
            });
            
            speciesSection.append(speciesList);
            cardInfo.append(speciesSection);
        }

        if (data?.characters && data.characters.length > 0) {
            if (!isFirstSection) {
                const sectionDivider = el("div", {classes: ["section-divider"]});
                cardInfo.append(sectionDivider);
            }
            isFirstSection = false;
            
            const charactersSection = el("section", {classes: ["section", "section-characters"]});
            const charactersHeader = el("div", {classes: ["section-header"]});
            const charactersTitle = el("h2", {classes: ["section-title", "section-title--characters"], text: "Персонажи"});
            const charactersCount = el("span", {classes: ["section-count"], text: `${data.characters.length}`});
            const charactersList = el("ul", {classes: ["characters-list"]});
            
            charactersTitle.append(charactersCount);
            charactersHeader.append(charactersTitle);
            charactersSection.append(charactersHeader);
            
            data.characters.map(element => {
                const listItem = el("li", {classes: ["characters-list__item"]});
                const cardCharacter = el("div", {classes: ["card-character"]});
                const cardCharacterName = el("strong", {classes: ["card-character__name"], text: element.name});
                const cardCharacterGender = el("span", {classes: ["card-character__gender"], text: element.gender});
                const cardCharacterBirthYear = el("span", {classes: ["card-character__birth_year"], text: element.birth_year });

                cardCharacter.append(cardCharacterName, cardCharacterGender, cardCharacterBirthYear);
                listItem.append(cardCharacter);
                charactersList.append(listItem);
            });
            
            charactersSection.append(charactersList);
            cardInfo.append(charactersSection);
        }

        container.append(cardInfo);
    }
}
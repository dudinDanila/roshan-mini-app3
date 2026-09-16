/* =========================================================
   ROSHAN — META
   ========================================================= */

const META_CONFIG = {
    patch: "7.41e",
    bracket: "7000+ MMR",
    source: "D2PT"
};


/* =========================================================
   META DATA
   ========================================================= */

const metaData = {

    carry: {
        title: "⚔️ Топ керри",

        featured: {
            name: "NECROPHOS",
            wr: "55.1%",
            matches: "2.1K",
            rating: "73",
            role: "Carry"
        },

        heroes: [
            ["PHANTOM LANCER", "52.2%", "6.6K", "81"],
            ["NECROPHOS", "55.1%", "2.1K", "73"],
            ["SPECTRE", "53.1%", "4.4K", "69"],
            ["LIFESTEALER", "51.7%", "10.1K", "66"],
            ["WINDRANGER", "53.3%", "2.6K", "63"],
            ["SLARK", "52.3%", "3.2K", "62"],
            ["SVEN", "51.2%", "4.9K", "60"]
        ]
    },


    mid: {
        title: "🔥 Топ мидеров",

        featured: {
            name: "INVOKER",
            wr: "52.3%",
            matches: "8.7K",
            rating: "81",
            role: "Mid"
        },

        heroes: [
            ["INVOKER", "52.3%", "8.7K", "81"],
            ["KEEPER OF THE LIGHT", "56.8%", "2.9K", "74"],
            ["LINA", "50.3%", "10.2K", "72"],
            ["EARTH SPIRIT", "53.0%", "4.6K", "61"],
            ["EMBER SPIRIT", "50.5%", "8.1K", "61"],
            ["OUTWORLD DESTROYER", "51.9%", "5.0K", "57"],
            ["ARC WARDEN", "52.7%", "1.7K", "49"]
        ]
    },


    offlane: {
        title: "🛡️ Топ оффлейнеров",

        featured: {
            name: "ENIGMA",
            wr: "56.9%",
            matches: "4.2K",
            rating: "83",
            role: "Offlane"
        },

        heroes: [
            ["ENIGMA", "56.9%", "4.2K", "83"],
            ["PUDGE", "53.2%", "3.0K", "75"],
            ["DARK SEER", "52.9%", "7.5K", "65"],
            ["NIGHT STALKER", "50.1%", "5.0K", "58"],
            ["PRIMAL BEAST", "53.6%", "1.3K", "56"],
            ["MAGNUS", "51.1%", "2.6K", "55"],
            ["DRAGON KNIGHT", "52.5%", "1.5K", "55"]
        ]
    },


    support: {
        title: "✨ Топ саппортов",

        featured: {
            name: "BOUNTY HUNTER",
            wr: "56.2%",
            matches: "10.9K",
            rating: "93",
            role: "Support"
        },

        heroes: [
            ["BOUNTY HUNTER", "56.2%", "10.9K", "93"],
            ["SPIRIT BREAKER", "53.1%", "8.0K", "68"],
            ["NYX ASSASSIN", "54.4%", "2.1K", "64"],
            ["DARK WILLOW", "50.5%", "3.9K", "55"],
            ["KEEPER OF THE LIGHT", "51.1%", "1.7K", "66"]
        ]
    },


    hardSupport: {
        title: "💎 Топ хард-саппортов",

        featured: {
            name: "TREANT PROTECTOR",
            wr: "52.6%",
            matches: "7.9K",
            rating: "95",
            role: "Hard Support"
        },

        heroes: [
            ["TREANT PROTECTOR", "52.6%", "7.9K", "95"],
            ["WINTER WYVERN", "52.1%", "7.1K", "89"],
            ["ORACLE", "54.7%", "2.4K", "74"],
            ["BANE", "52.3%", "2.7K", "67"],
            ["CLOCKWERK", "52.3%", "2.2K", "67"],
            ["DISRUPTOR", "50.1%", "4.0K", "51"],
            ["RINGMASTER", "51.1%", "2.7K", "47"]
        ]
    }
};


/* =========================================================
   HERO IMAGE
   Не зависит от массива heroes из index.html
   ========================================================= */

const META_HERO_IDS = {

    "PHANTOM LANCER": "phantom_lancer",
    "NECROPHOS": "necrolyte",
    "SPECTRE": "spectre",
    "LIFESTEALER": "life_stealer",
    "WINDRANGER": "windrunner",
    "SLARK": "slark",
    "SVEN": "sven",

    "INVOKER": "invoker",
    "KEEPER OF THE LIGHT": "keeper_of_the_light",
    "LINA": "lina",
    "EARTH SPIRIT": "earth_spirit",
    "EMBER SPIRIT": "ember_spirit",
    "OUTWORLD DESTROYER": "obsidian_destroyer",
    "ARC WARDEN": "arc_warden",

    "ENIGMA": "enigma",
    "PUDGE": "pudge",
    "DARK SEER": "dark_seer",
    "NIGHT STALKER": "night_stalker",
    "PRIMAL BEAST": "primal_beast",
    "MAGNUS": "magnataur",
    "DRAGON KNIGHT": "dragon_knight",

    "BOUNTY HUNTER": "bounty_hunter",
    "SPIRIT BREAKER": "spirit_breaker",
    "NYX ASSASSIN": "nyx_assassin",
    "DARK WILLOW": "dark_willow",

    "TREANT PROTECTOR": "treant",
    "WINTER WYVERN": "winter_wyvern",
    "ORACLE": "oracle",
    "BANE": "bane",
    "CLOCKWERK": "rattletrap",
    "DISRUPTOR": "disruptor",
    "RINGMASTER": "ringmaster"
};


function getMetaHero(name) {

    const id = META_HERO_IDS[name];

    if (!id) {
        return {
            name: name,
            img: ""
        };
    }

    return {
        name: name,

        img:
            "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/" +
            id +
            ".png"
    };
}


/* =========================================================
   RENDER
   ========================================================= */

function renderMetaRole(role, button) {

    const data = metaData[role];

    if (!data) {
        console.error("Meta role not found:", role);
        return;
    }


    /* ACTIVE BUTTON */

    document
        .querySelectorAll(".meta-role-btn")
        .forEach(btn => {
            btn.classList.remove("active");
        });


    if (button) {

        button.classList.add("active");

    } else {

        const buttons =
            document.querySelectorAll(".meta-role-btn");

        const roles = [
            "carry",
            "mid",
            "offlane",
            "support",
            "hardSupport"
        ];

        const index = roles.indexOf(role);

        if (buttons[index]) {
            buttons[index].classList.add("active");
        }
    }


    /* FEATURED HERO */

    const featured =
        document.getElementById("metaFeatured");

    if (featured) {

        const hero =
            getMetaHero(data.featured.name);


        featured.innerHTML = `

            <img
                src="${hero.img}"
                alt="${data.featured.name}"
            >

            <div class="meta-featured-content">

                <div class="meta-rank">
                    🔥 TOP PICK
                </div>

                <h2>
                    ${data.featured.name}
                </h2>

                <div class="meta-featured-role">
                    ${data.featured.role}
                    •
                    ${META_CONFIG.patch}
                </div>

                <div class="meta-stats">

                    <div class="meta-stat">
                        <strong>
                            ${data.featured.wr}
                        </strong>

                        <span>
                            WINRATE
                        </span>
                    </div>


                    <div class="meta-stat">
                        <strong>
                            ${data.featured.matches}
                        </strong>

                        <span>
                            МАТЧЕЙ
                        </span>
                    </div>


                    <div class="meta-stat">
                        <strong>
                            ${data.featured.rating}
                        </strong>

                        <span>
                            D2PT
                        </span>
                    </div>

                </div>

            </div>
        `;
    }


    /* TITLE */

    const title =
        document.getElementById("metaListTitle");

    if (title) {
        title.textContent = data.title;
    }


    /* HERO LIST */

    const list =
        document.getElementById("metaList");

    if (!list) {
        console.error("metaList not found");
        return;
    }


    list.innerHTML = "";


    data.heroes.forEach((item, index) => {

        const hero =
            getMetaHero(item[0]);


        const card =
            document.createElement("div");


        card.className =
            "meta-list-item";


        card.innerHTML = `

            <div class="meta-list-rank">
                ${index + 1}
            </div>


            <img
                class="meta-list-img"
                src="${hero.img}"
                alt="${item[0]}"
                loading="lazy"
            >


            <div class="meta-list-info">

                <div class="meta-list-name">
                    ${item[0]}
                </div>

                <div class="meta-list-rating">
                    D2PT Rating ${item[3]}/100
                </div>

            </div>


            <div class="meta-list-right">

                <div class="meta-wr">
                    ${item[1]}
                </div>

                <div class="meta-matches">
                    ${item[2]} матчей
                </div>

            </div>
        `;


        list.appendChild(card);
    });
}


/* =========================================================
   HEADER
   ========================================================= */

function updateMetaHeader() {

    const element =
        document.querySelector(
            ".meta-hero-version"
        );


    if (!element) {
        return;
    }


    element.textContent =
        `${META_CONFIG.source} • ` +
        `${META_CONFIG.bracket} • ` +
        `Патч ${META_CONFIG.patch}`;
}


/* =========================================================
   START
   ========================================================= */

function initMeta() {

    updateMetaHeader();

    renderMetaRole("carry");
}


/* =========================================================
   EXPOSE FUNCTIONS
   Нужны для onclick в index.html
   ========================================================= */

window.renderMetaRole =
    renderMetaRole;

window.initMeta =
    initMeta;

/* =========================================================
   ROSHAN — AUTO META
   Данные автоматически загружаются из meta-data.json
   ========================================================= */


/* =========================================================
   CONFIG
   ========================================================= */

const META_CONFIG = {
    source: "STRATZ",
    bracket: "Divine + Immortal",
    period: "Last 7 days"
};


/* =========================================================
   ROLE SETTINGS
   ========================================================= */

const META_ROLES = {

    carry: {
        title: "⚔️ Топ керри",
        role: "Carry"
    },

    mid: {
        title: "🔥 Топ мидеров",
        role: "Mid"
    },

    offlane: {
        title: "🛡️ Топ оффлейнеров",
        role: "Offlane"
    },

    support: {
        title: "✨ Топ саппортов",
        role: "Support"
    },

    hardSupport: {
        title: "💎 Топ хард-саппортов",
        role: "Hard Support"
    }
};


/* =========================================================
   HERO ID → DOTA HERO
   STRATZ использует стандартные Dota 2 heroId
   ========================================================= */

const META_HEROES = {

    1: ["ANTI-MAGE", "antimage"],
    2: ["AXE", "axe"],
    3: ["BANE", "bane"],
    4: ["BLOODSEEKER", "bloodseeker"],
    5: ["CRYSTAL MAIDEN", "crystal_maiden"],
    6: ["DROW RANGER", "drow_ranger"],
    7: ["EARTHSHAKER", "earthshaker"],
    8: ["JUGGERNAUT", "juggernaut"],
    9: ["MIRANA", "mirana"],
    10: ["MORPHLING", "morphling"],
    11: ["SHADOW FIEND", "nevermore"],
    12: ["PHANTOM LANCER", "phantom_lancer"],
    13: ["PUCK", "puck"],
    14: ["PUDGE", "pudge"],
    15: ["RAZOR", "razor"],
    16: ["SAND KING", "sand_king"],
    17: ["STORM SPIRIT", "storm_spirit"],
    18: ["SVEN", "sven"],
    19: ["TINY", "tiny"],
    20: ["VENGEFUL SPIRIT", "vengefulspirit"],
    21: ["WINDRANGER", "windrunner"],
    22: ["ZEUS", "zuus"],
    23: ["KUNKKA", "kunkka"],
    25: ["LINA", "lina"],
    26: ["LION", "lion"],
    27: ["SHADOW SHAMAN", "shadow_shaman"],
    28: ["SLARDAR", "slardar"],
    29: ["TIDEHUNTER", "tidehunter"],
    30: ["WITCH DOCTOR", "witch_doctor"],
    31: ["LICH", "lich"],
    32: ["RIKI", "riki"],
    33: ["ENIGMA", "enigma"],
    34: ["TINKER", "tinker"],
    35: ["SNIPER", "sniper"],
    36: ["NECROPHOS", "necrolyte"],
    37: ["WARLOCK", "warlock"],
    38: ["BEASTMASTER", "beastmaster"],
    39: ["QUEEN OF PAIN", "queenofpain"],
    40: ["VENOMANCER", "venomancer"],
    41: ["FACELESS VOID", "faceless_void"],
    42: ["WRAITH KING", "skeleton_king"],
    43: ["DEATH PROPHET", "death_prophet"],
    44: ["PHANTOM ASSASSIN", "phantom_assassin"],
    45: ["PUGNA", "pugna"],
    46: ["TEMPLAR ASSASSIN", "templar_assassin"],
    47: ["VIPER", "viper"],
    48: ["LUNA", "luna"],
    49: ["DRAGON KNIGHT", "dragon_knight"],
    50: ["DAZZLE", "dazzle"],
    51: ["CLOCKWERK", "rattletrap"],
    52: ["LESHRAC", "leshrac"],
    53: ["NATURE'S PROPHET", "furion"],
    54: ["LIFESTEALER", "life_stealer"],
    55: ["DARK SEER", "dark_seer"],
    56: ["CLINKZ", "clinkz"],
    57: ["OMNIKNIGHT", "omniknight"],
    58: ["ENCHANTRESS", "enchantress"],
    59: ["HUSKAR", "huskar"],
    60: ["NIGHT STALKER", "night_stalker"],
    61: ["BROODMOTHER", "broodmother"],
    62: ["BOUNTY HUNTER", "bounty_hunter"],
    63: ["WEAVER", "weaver"],
    64: ["JAKIRO", "jakiro"],
    65: ["BATRIDER", "batrider"],
    66: ["CHEN", "chen"],
    67: ["SPECTRE", "spectre"],
    68: ["ANCIENT APPARITION", "ancient_apparition"],
    69: ["DOOM", "doom_bringer"],
    70: ["URSA", "ursa"],
    71: ["SPIRIT BREAKER", "spirit_breaker"],
    72: ["GYROCOPTER", "gyrocopter"],
    73: ["ALCHEMIST", "alchemist"],
    74: ["INVOKER", "invoker"],
    75: ["SILENCER", "silencer"],
    76: ["OUTWORLD DESTROYER", "obsidian_destroyer"],
    77: ["LYCAN", "lycan"],
    78: ["BREWMASTER", "brewmaster"],
    79: ["SHADOW DEMON", "shadow_demon"],
    80: ["LONE DRUID", "lone_druid"],
    81: ["CHAOS KNIGHT", "chaos_knight"],
    82: ["MEEPO", "meepo"],
    83: ["TREANT PROTECTOR", "treant"],
    84: ["OGRE MAGI", "ogre_magi"],
    85: ["UNDYING", "undying"],
    86: ["RUBICK", "rubick"],
    87: ["DISRUPTOR", "disruptor"],
    88: ["NYX ASSASSIN", "nyx_assassin"],
    89: ["NAGA SIREN", "naga_siren"],
    90: ["KEEPER OF THE LIGHT", "keeper_of_the_light"],
    91: ["IO", "wisp"],
    92: ["VISAGE", "visage"],
    93: ["SLARK", "slark"],
    94: ["MEDUSA", "medusa"],
    95: ["TROLL WARLORD", "troll_warlord"],
    96: ["CENTAUR WARRUNNER", "centaur"],
    97: ["MAGNUS", "magnataur"],
    98: ["TIMBERSAW", "shredder"],
    99: ["BRISTLEBACK", "bristleback"],
    100: ["TUSK", "tusk"],
    101: ["SKYWRATH MAGE", "skywrath_mage"],
    102: ["ABADDON", "abaddon"],
    103: ["ELDER TITAN", "elder_titan"],
    104: ["LEGION COMMANDER", "legion_commander"],
    105: ["TECHIES", "techies"],
    106: ["EMBER SPIRIT", "ember_spirit"],
    107: ["EARTH SPIRIT", "earth_spirit"],
    108: ["UNDERLORD", "abyssal_underlord"],
    109: ["TERRORBLADE", "terrorblade"],
    110: ["PHOENIX", "phoenix"],
    111: ["ORACLE", "oracle"],
    112: ["WINTER WYVERN", "winter_wyvern"],
    113: ["ARC WARDEN", "arc_warden"],
    114: ["MONKEY KING", "monkey_king"],
    119: ["DARK WILLOW", "dark_willow"],
    120: ["PANGOLIER", "pangolier"],
    121: ["GRIMSTROKE", "grimstroke"],
    123: ["HOODWINK", "hoodwink"],
    126: ["VOID SPIRIT", "void_spirit"],
    128: ["SNAPFIRE", "snapfire"],
    129: ["MARS", "mars"],
    135: ["DAWNBREAKER", "dawnbreaker"],
    136: ["MARCI", "marci"],
    137: ["PRIMAL BEAST", "primal_beast"],
    138: ["MUERTA", "muerta"],
    145: ["KEZ", "kez"],
    146: ["RINGMASTER", "ringmaster"]
};


/* =========================================================
   DATA
   ========================================================= */

let metaData = null;

let currentMetaRole = "carry";


/* =========================================================
   HERO
   ========================================================= */

function getMetaHero(heroId) {

    const hero = META_HEROES[heroId];

    if (!hero) {

        console.warn(
            "Unknown heroId:",
            heroId
        );

        return {
            name: `HERO ${heroId}`,
            img: ""
        };
    }


    return {

        name: hero[0],

        img:
            "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/" +
            hero[1] +
            ".png"
    };
}


/* =========================================================
   FORMAT MATCHES
   ========================================================= */

function formatMetaMatches(number) {

    const value = Number(number) || 0;


    if (value >= 1000000) {

        return (
            (value / 1000000)
                .toFixed(1)
                .replace(".0", "") +
            "M"
        );
    }


    if (value >= 1000) {

        return (
            (value / 1000)
                .toFixed(1)
                .replace(".0", "") +
            "K"
        );
    }


    return value.toString();
}


/* =========================================================
   RATING
   Относительный рейтинг внутри текущей роли.
   Лучший герой = 100.
   ========================================================= */

function calculateMetaRating(hero, heroes) {

    if (!heroes.length) {
        return 0;
    }


    const bestWR =
        Math.max(
            ...heroes.map(
                item =>
                    Number(item.winRate) || 0
            )
        );


    if (!bestWR) {
        return 0;
    }


    return Math.max(
        1,
        Math.min(
            100,
            Math.round(
                (
                    Number(hero.winRate) /
                    bestWR
                ) * 100
            )
        )
    );
}


/* =========================================================
   LOAD JSON
   ========================================================= */

async function loadMetaData() {

    try {

        const response =
            await fetch(
                "./meta-data.json?ts=" +
                Date.now(),
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status
            );
        }


        const json =
            await response.json();


        if (
            !json ||
            json.ok !== true ||
            !json.roles
        ) {

            throw new Error(
                "Invalid meta-data.json"
            );
        }


        metaData = json;


        if (json.source) {
            META_CONFIG.source =
                json.source;
        }


        if (json.bracket) {
            META_CONFIG.bracket =
                json.bracket;
        }


        if (json.period) {
            META_CONFIG.period =
                json.period;
        }


        console.log(
            "ROSHAN META loaded:",
            json.updatedAt
        );


        return true;

    } catch (error) {

        console.error(
            "Failed to load meta:",
            error
        );


        showMetaError();


        return false;
    }
}


/* =========================================================
   ERROR
   ========================================================= */

function showMetaError() {

    const featured =
        document.getElementById(
            "metaFeatured"
        );


    const list =
        document.getElementById(
            "metaList"
        );


    const title =
        document.getElementById(
            "metaListTitle"
        );


    if (featured) {

        featured.innerHTML = `
            <div class="meta-featured-content">
                <h2>
                    Не удалось загрузить мету
                </h2>

                <div class="meta-featured-role">
                    Попробуй открыть страницу ещё раз
                </div>
            </div>
        `;
    }


    if (title) {
        title.textContent =
            "Мета временно недоступна";
    }


    if (list) {
        list.innerHTML = "";
    }
}


/* =========================================================
   RENDER
   ========================================================= */

function renderMetaRole(role, button) {

    currentMetaRole = role;


    if (
        !metaData ||
        !metaData.roles
    ) {

        return;
    }


    const heroes =
        metaData.roles[role];


    const roleConfig =
        META_ROLES[role];


    if (
        !Array.isArray(heroes) ||
        !roleConfig
    ) {

        console.error(
            "Meta role not found:",
            role
        );

        return;
    }


    /* ACTIVE BUTTON */

    document
        .querySelectorAll(
            ".meta-role-btn"
        )
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );
        });


    if (button) {

        button.classList.add(
            "active"
        );

    } else {

        const buttons =
            document.querySelectorAll(
                ".meta-role-btn"
            );


        const roles = [
            "carry",
            "mid",
            "offlane",
            "support",
            "hardSupport"
        ];


        const index =
            roles.indexOf(role);


        if (buttons[index]) {

            buttons[index]
                .classList.add(
                    "active"
                );
        }
    }


    /* NO DATA */

    if (!heroes.length) {

        const list =
            document.getElementById(
                "metaList"
            );


        if (list) {

            list.innerHTML = `
                <div class="meta-list-item">
                    Нет данных для этой роли
                </div>
            `;
        }


        return;
    }


    /* FEATURED */

    const featuredData =
        heroes[0];


    const featuredHero =
        getMetaHero(
            featuredData.heroId
        );


    const featuredRating =
        calculateMetaRating(
            featuredData,
            heroes
        );


    const featured =
        document.getElementById(
            "metaFeatured"
        );


    if (featured) {

        featured.innerHTML = `

            <img
                src="${featuredHero.img}"
                alt="${featuredHero.name}"
            >

            <div class="meta-featured-content">

                <div class="meta-rank">
                    🔥 TOP PICK
                </div>

                <h2>
                    ${featuredHero.name}
                </h2>

                <div class="meta-featured-role">
                    ${roleConfig.role}
                    •
                    ${META_CONFIG.period}
                </div>


                <div class="meta-stats">

                    <div class="meta-stat">

                        <strong>
                            ${Number(
                                featuredData.winRate
                            ).toFixed(2)}%
                        </strong>

                        <span>
                            WINRATE
                        </span>

                    </div>


                    <div class="meta-stat">

                        <strong>
                            ${formatMetaMatches(
                                featuredData.matches
                            )}
                        </strong>

                        <span>
                            МАТЧЕЙ
                        </span>

                    </div>


                    <div class="meta-stat">

                        <strong>
                            ${featuredRating}
                        </strong>

                        <span>
                            META
                        </span>

                    </div>

                </div>

            </div>
        `;
    }


    /* TITLE */

    const title =
        document.getElementById(
            "metaListTitle"
        );


    if (title) {

        title.textContent =
            roleConfig.title;
    }


    /* LIST */

    const list =
        document.getElementById(
            "metaList"
        );


    if (!list) {

        console.error(
            "metaList not found"
        );

        return;
    }


    list.innerHTML = "";


    heroes.forEach(
        (item, index) => {

            const hero =
                getMetaHero(
                    item.heroId
                );


            const rating =
                calculateMetaRating(
                    item,
                    heroes
                );


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "meta-list-item";


            card.innerHTML = `

                <div class="meta-list-rank">
                    ${index + 1}
                </div>


                <img
                    class="meta-list-img"
                    src="${hero.img}"
                    alt="${hero.name}"
                    loading="lazy"
                >


                <div class="meta-list-info">

                    <div class="meta-list-name">
                        ${hero.name}
                    </div>


                    <div class="meta-list-rating">
                        Meta Rating
                        ${rating}/100
                    </div>

                </div>


                <div class="meta-list-right">

                    <div class="meta-wr">
                        ${Number(
                            item.winRate
                        ).toFixed(2)}%
                    </div>


                    <div class="meta-matches">
                        ${formatMetaMatches(
                            item.matches
                        )}
                        матчей
                    </div>

                </div>
            `;


            list.appendChild(
                card
            );
        }
    );
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
        `${META_CONFIG.period}`;
}


/* =========================================================
   UPDATED TIME
   ========================================================= */

function logMetaUpdateTime() {

    if (
        !metaData ||
        !metaData.updatedAt
    ) {

        return;
    }


    const date =
        new Date(
            metaData.updatedAt
        );


    console.log(
        "Последнее обновление меты:",
        date.toLocaleString("ru-RU")
    );
}


/* =========================================================
   START
   ========================================================= */

async function initMeta() {

    const loaded =
        await loadMetaData();


    if (!loaded) {
        return;
    }


    updateMetaHeader();

    logMetaUpdateTime();

    renderMetaRole(
        currentMetaRole
    );
}


/* =========================================================
   EXPOSE
   ========================================================= */

window.renderMetaRole =
    renderMetaRole;

window.initMeta =
    initMeta;

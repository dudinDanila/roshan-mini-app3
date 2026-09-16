const fs = require("fs");

const STRATZ_TOKEN = process.env.STRATZ_TOKEN;

if (!STRATZ_TOKEN) {
    console.error("STRATZ_TOKEN is missing.");
    process.exit(1);
}

const API_URL = "https://api.stratz.com/graphql";
const OUTPUT_FILE = "guides-data.json";
const OPENDOTA_BASE =
    "https://api.opendota.com/api/constants";

let dotaHeroes = {};
let dotaHeroAbilities = {};
let dotaAbilityIds = {};
let dotaAbilities = {};

// Пауза между героями, чтобы не отправлять
// слишком много запросов STRATZ подряд.
const REQUEST_DELAY = 350;

// Повторяем временно неудачный запрос.
const MAX_RETRIES = 3;

async function loadDotaAbilityData() {
    console.log("Loading Dota ability metadata...");

    const [
    heroesResponse,
    heroAbilitiesResponse,
    abilityIdsResponse,
    abilitiesResponse
] = await Promise.all([
    fetch(`${OPENDOTA_BASE}/heroes`),
    fetch(`${OPENDOTA_BASE}/hero_abilities`),
    fetch(`${OPENDOTA_BASE}/ability_ids`),
    fetch(`${OPENDOTA_BASE}/abilities`)
]);

    if (
        !heroesResponse.ok ||
        !heroAbilitiesResponse.ok ||
        !abilityIdsResponse.ok ||
        !abilitiesResponse.ok
    ) {
        throw new Error(
            "Failed to load OpenDota ability metadata."
        );
    }

    dotaHeroes =
        await heroesResponse.json();

    dotaHeroAbilities =
        await heroAbilitiesResponse.json();

console.log(
    "HERO ABILITIES DEBUG",
    Object.keys(
        dotaHeroAbilities
    ).slice(0, 10)
);
    
    dotaAbilityIds =
        await abilityIdsResponse.json();

dotaAbilities =
    await abilitiesResponse.json();
    
    console.log(
        "Dota ability metadata loaded."
    );
}

// ======================================================
// ГЕРОИ
// ======================================================

const HEROES = [
    [1, "ANTI-MAGE"],
    [2, "AXE"],
    [3, "BANE"],
    [4, "BLOODSEEKER"],
    [5, "CRYSTAL MAIDEN"],
    [6, "DROW RANGER"],
    [7, "EARTHSHAKER"],
    [8, "JUGGERNAUT"],
    [9, "MIRANA"],
    [10, "MORPHLING"],
    [11, "SHADOW FIEND"],
    [12, "PHANTOM LANCER"],
    [13, "PUCK"],
    [14, "PUDGE"],
    [15, "RAZOR"],
    [16, "SAND KING"],
    [17, "STORM SPIRIT"],
    [18, "SVEN"],
    [19, "TINY"],
    [20, "VENGEFUL SPIRIT"],
    [21, "WINDRANGER"],
    [22, "ZEUS"],
    [23, "KUNKKA"],
    [25, "LINA"],
    [26, "LION"],
    [27, "SHADOW SHAMAN"],
    [28, "SLARDAR"],
    [29, "TIDEHUNTER"],
    [30, "WITCH DOCTOR"],
    [31, "LICH"],
    [32, "RIKI"],
    [33, "ENIGMA"],
    [34, "TINKER"],
    [35, "SNIPER"],
    [36, "NECROPHOS"],
    [37, "WARLOCK"],
    [38, "BEASTMASTER"],
    [39, "QUEEN OF PAIN"],
    [40, "VENOMANCER"],
    [41, "FACELESS VOID"],
    [42, "WRAITH KING"],
    [43, "DEATH PROPHET"],
    [44, "PHANTOM ASSASSIN"],
    [45, "PUGNA"],
    [46, "TEMPLAR ASSASSIN"],
    [47, "VIPER"],
    [48, "LUNA"],
    [49, "DRAGON KNIGHT"],
    [50, "DAZZLE"],
    [51, "CLOCKWERK"],
    [52, "LESHRAC"],
    [53, "NATURE'S PROPHET"],
    [54, "LIFESTEALER"],
    [55, "DARK SEER"],
    [56, "CLINKZ"],
    [57, "OMNIKNIGHT"],
    [58, "ENCHANTRESS"],
    [59, "HUSKAR"],
    [60, "NIGHT STALKER"],
    [61, "BROODMOTHER"],
    [62, "BOUNTY HUNTER"],
    [63, "WEAVER"],
    [64, "JAKIRO"],
    [65, "BATRIDER"],
    [66, "CHEN"],
    [67, "SPECTRE"],
    [68, "ANCIENT APPARITION"],
    [69, "DOOM"],
    [70, "URSA"],
    [71, "SPIRIT BREAKER"],
    [72, "GYROCOPTER"],
    [73, "ALCHEMIST"],
    [74, "INVOKER"],
    [75, "SILENCER"],
    [76, "OUTWORLD DESTROYER"],
    [77, "LYCAN"],
    [78, "BREWMASTER"],
    [79, "SHADOW DEMON"],
    [80, "LONE DRUID"],
    [81, "CHAOS KNIGHT"],
    [82, "MEEPO"],
    [83, "TREANT PROTECTOR"],
    [84, "OGRE MAGI"],
    [85, "UNDYING"],
    [86, "RUBICK"],
    [87, "DISRUPTOR"],
    [88, "NYX ASSASSIN"],
    [89, "NAGA SIREN"],
    [90, "KEEPER OF THE LIGHT"],
    [91, "IO"],
    [92, "VISAGE"],
    [93, "SLARK"],
    [94, "MEDUSA"],
    [95, "TROLL WARLORD"],
    [96, "CENTAUR WARRUNNER"],
    [97, "MAGNUS"],
    [98, "TIMBERSAW"],
    [99, "BRISTLEBACK"],
    [100, "TUSK"],
    [101, "SKYWRATH MAGE"],
    [102, "ABADDON"],
    [103, "ELDER TITAN"],
    [104, "LEGION COMMANDER"],
    [105, "TECHIES"],
    [106, "EMBER SPIRIT"],
    [107, "EARTH SPIRIT"],
    [108, "UNDERLORD"],
    [109, "TERRORBLADE"],
    [110, "PHOENIX"],
    [111, "ORACLE"],
    [112, "WINTER WYVERN"],
    [113, "ARC WARDEN"],
    [114, "MONKEY KING"],
    [119, "DARK WILLOW"],
    [120, "PANGOLIER"],
    [121, "GRIMSTROKE"],
    [123, "HOODWINK"],
    [126, "VOID SPIRIT"],
    [128, "SNAPFIRE"],
    [129, "MARS"],
    [135, "DAWNBREAKER"],
    [136, "MARCI"],
    [137, "PRIMAL BEAST"],
    [138, "MUERTA"],
    [145, "KEZ"],
    [155, "RINGMASTER"]
];


// ======================================================
// ОБЩИЕ ФУНКЦИИ
// ======================================================

function number(value) {
    const result = Number(value);

    return Number.isFinite(result)
        ? result
        : 0;
}


function sleep(ms) {
    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );
}


function sortByMatches(a, b) {
    return number(b.matchCount) -
        number(a.matchCount);
}


// ======================================================
// БОТИНКИ
// ======================================================

function buildBoots(rows) {

    const clean = (rows || [])
        .filter(row =>
            number(row.itemId) > 0 &&
            number(row.matchCount) >= 100
        )
        .sort(sortByMatches);

    if (!clean.length) {
        return null;
    }

    const best = clean[0];

    const matches =
        number(best.matchCount);

    const wins =
        number(best.winCount);

    return {
        itemId: number(best.itemId),

        matches,

        wins,

        winRate:
            matches > 0
                ? Number(
                    (
                        wins /
                        matches *
                        100
                    ).toFixed(2)
                )
                : 0,

        averageTime:
            Number(
                number(
                    best.timeAverage
                ).toFixed(1)
            )
    };
}


// ======================================================
// ОСНОВНЫЕ ПРЕДМЕТЫ
// ======================================================

function buildItems(rows) {

    const source = (rows || [])
        .filter(row =>
            number(row.itemId) > 0 &&
            number(row.matchCount) >= 100
        );

    const map = new Map();

    for (const row of source) {

        const itemId = number(row.itemId);
        const matches = number(row.matchCount);
        const wins = number(row.winCount);
        const time = number(row.time);

        if (!map.has(itemId)) {
            map.set(itemId, {
                itemId,
                matches: 0,
                wins: 0,
                weightedTime: 0
            });
        }

        const item = map.get(itemId);

        item.matches += matches;
        item.wins += wins;
        item.weightedTime += time * matches;
    }

    const allItems = [];

    for (const item of map.values()) {

        if (item.matches < 500) {
            continue;
        }

        const averageTime =
            item.matches > 0
                ? Math.round(
                    item.weightedTime /
                    item.matches
                )
                : 0;

        allItems.push({
            itemId: item.itemId,
            matches: item.matches,
            wins: item.wins,

            winRate:
                item.matches > 0
                    ? Number(
                        (
                            item.wins /
                            item.matches *
                            100
                        ).toFixed(2)
                    )
                    : 0,

            averageTime
        });
    }

    allItems.sort(
        (a, b) =>
            b.matches - a.matches
    );

    const early = [];
    const core = [];
    const late = [];

    for (const item of allItems) {

        const time = item.averageTime;

        if (time > 0 && time <= 12) {
            early.push(item);

        } else if (time > 12 && time <= 28) {
            core.push(item);

        } else if (time > 28) {
            late.push(item);
        }
    }

    const earlyItems =
        early.slice(0, 4);

    const coreItems =
        core.slice(0, 6);

    const lateItems =
        late.slice(0, 4);

    const usedIds = new Set([
        ...earlyItems.map(item => item.itemId),
        ...coreItems.map(item => item.itemId),
        ...lateItems.map(item => item.itemId)
    ]);

    const situationalItems = [];

    for (const item of allItems) {

        if (usedIds.has(item.itemId)) {
            continue;
        }

        situationalItems.push(item);

        if (situationalItems.length >= 6) {
            break;
        }
    }

    return {
        early: earlyItems,
        core: coreItems,
        situational: situationalItems,
        late: lateItems
    };
}

// ======================================================
// СПОСОБНОСТИ
// ======================================================

function buildAbilityData(
    minRows,
    maxRows,
    heroId
) {

    const hero =
        dotaHeroes[String(heroId)];

    const heroKey =
        hero?.name;

    const heroAbilityNames =
        dotaHeroAbilities[heroKey]
            ?.abilities || [];

    const abilityNameToId =
        new Map(
            Object.entries(
                dotaAbilityIds
            ).map(
                ([id, name]) => [
                    name,
                    Number(id)
                ]
            )
        );

    const validAbilityIds =
        new Set(
            heroAbilityNames
                .map(name =>
                    abilityNameToId.get(name)
                )
                .filter(id =>
                    Number.isFinite(id)
                )
        );


    /*
     * Подготавливаем строки STRATZ.
     *
     * ВАЖНО:
     * minRows и maxRows больше
     * не смешиваем до анализа.
     */

    function prepareRows(rows) {

        return (rows || [])
            .map(row => ({
                abilityId:
                    number(
                        row.abilityId
                    ),

                level:
                    number(
                        row.level
                    ),

                matches:
                    number(
                        row.matchCount
                    ),

                wins:
                    number(
                        row.winCount
                    )
            }))
            .filter(row =>
                row.abilityId > 0 &&
                validAbilityIds.has(
                    row.abilityId
                ) &&
                row.level > 0 &&
                row.matches >= 100
            );
    }


    const minData =
        prepareRows(minRows);

    const maxData =
        prepareRows(maxRows);


    /*
     * Объединённые данные оставляем
     * только для отображения статистики.
     */

    const combinedMap =
        new Map();

    for (
        const row
        of [
            ...minData,
            ...maxData
        ]
    ) {

        const key =
            `${row.abilityId}:${row.level}`;

        if (!combinedMap.has(key)) {

            combinedMap.set(
                key,
                {
                    abilityId:
                        row.abilityId,

                    level:
                        row.level,

                    matches: 0,
                    wins: 0
                }
            );
        }

        const entry =
            combinedMap.get(key);

        entry.matches +=
            row.matches;

        entry.wins +=
            row.wins;
    }


    const combined =
        [...combinedMap.values()];


    /*
     * Определяем ультимейт.
     *
     * Не полагаемся только на порядок
     * hero_abilities.
     *
     * У ультимейта должен быть сильный
     * пик первого изучения около 6 уровня.
     */

    const ultimateCandidates =
        [...validAbilityIds]
            .map(abilityId => {

                const rows =
                    minData.filter(
                        row =>
                            row.abilityId ===
                            abilityId
                    );

                const level6 =
                    rows.find(
                        row =>
                            row.level === 6
                    );

                return {
                    abilityId,
                    matches:
                        level6
                            ?.matches || 0
                };
            })
            .sort(
                (a, b) =>
                    b.matches -
                    a.matches
            );


    const ultimateId =
        ultimateCandidates[0]
            ?.matches > 0
            ? ultimateCandidates[0]
                .abilityId
            : null;


    /*
     * Обычные способности.
     */

    const normalAbilityIds =
        [...validAbilityIds]
            .filter(
                abilityId =>
                    abilityId !==
                    ultimateId
            );


    /*
     * Находим самый популярный уровень
     * ПЕРВОГО изучения способности.
     *
     * Здесь используем только minData.
     */

    function getFirstLevelStat(
        abilityId
    ) {

        const rows =
            minData
                .filter(
                    row =>
                        row.abilityId ===
                        abilityId
                )
                .sort(
                    (a, b) =>
                        b.matches -
                        a.matches
                );

        return rows[0] || null;
    }


    /*
     * Находим самый популярный уровень,
     * на котором способность обычно
     * достигает максимального ранга.
     *
     * Здесь используем только maxData.
     */

    function getMaxLevelStat(
        abilityId
    ) {

        const rows =
            maxData
                .filter(
                    row =>
                        row.abilityId ===
                        abilityId
                )
                .sort(
                    (a, b) =>
                        b.matches -
                        a.matches
                );

        return rows[0] || null;
    }


    /*
     * Приоритет первого изучения.
     */

    const firstOrder =
        normalAbilityIds
            .map(abilityId => ({
                abilityId,

                stat:
                    getFirstLevelStat(
                        abilityId
                    )
            }))
            .sort(
                (a, b) => {

                    if (
                        !a.stat &&
                        !b.stat
                    ) {
                        return 0;
                    }

                    if (!a.stat) {
                        return 1;
                    }

                    if (!b.stat) {
                        return -1;
                    }

                    if (
                        a.stat.level !==
                        b.stat.level
                    ) {
                        return (
                            a.stat.level -
                            b.stat.level
                        );
                    }

                    return (
                        b.stat.matches -
                        a.stat.matches
                    );
                }
            );


    /*
     * Приоритет максимизации.
     *
     * Чем раньше способность обычно
     * достигает максимума, тем выше
     * её приоритет.
     */

    const maxOrder =
        normalAbilityIds
            .map(abilityId => ({
                abilityId,

                stat:
                    getMaxLevelStat(
                        abilityId
                    )
            }))
            .sort(
                (a, b) => {

                    if (
                        !a.stat &&
                        !b.stat
                    ) {
                        return 0;
                    }

                    if (!a.stat) {
                        return 1;
                    }

                    if (!b.stat) {
                        return -1;
                    }

                    if (
                        a.stat.level !==
                        b.stat.level
                    ) {
                        return (
                            a.stat.level -
                            b.stat.level
                        );
                    }

                    return (
                        b.stat.matches -
                        a.stat.matches
                    );
                }
            );


    /*
     * Текущие ранги.
     */

    const abilityRanks =
        new Map();

    for (
        const abilityId
        of validAbilityIds
    ) {

        abilityRanks.set(
            abilityId,
            0
        );
    }


    const levelMap =
        new Map();


    /*
     * Получаем статистику для записи
     * конкретного пункта билда.
     */

    function getDisplayStat(
        abilityId,
        level
    ) {

        const exact =
            combined.find(
                row =>
                    row.abilityId ===
                        abilityId &&
                    row.level ===
                        level
            );

        if (exact) {
            return exact;
        }


        const rows =
            combined
                .filter(
                    row =>
                        row.abilityId ===
                        abilityId
                )
                .sort(
                    (a, b) => {

                        const da =
                            Math.abs(
                                a.level -
                                level
                            );

                        const db =
                            Math.abs(
                                b.level -
                                level
                            );

                        if (da !== db) {
                            return da - db;
                        }

                        return (
                            b.matches -
                            a.matches
                        );
                    }
                );


        return rows[0] || {
            abilityId,
            level,
            matches: 0,
            wins: 0
        };
    }


    function addAbility(
        level,
        abilityId
    ) {

        const stat =
            getDisplayStat(
                abilityId,
                level
            );

        levelMap.set(
            level,
            {
                level,

                abilityId,

                matches:
                    stat.matches,

                wins:
                    stat.wins
            }
        );

        abilityRanks.set(
            abilityId,
            (
                abilityRanks.get(
                    abilityId
                ) || 0
            ) + 1
        );
    }


    /*
     * 1–3 уровни.
     *
     * Стараемся сначала дать первое
     * очко разным способностям согласно
     * abilityMinLevel.
     */

    for (
        let level = 1;
        level <= 3;
        level++
    ) {

        const candidate =
            firstOrder.find(
                ability =>
                    (
                        abilityRanks.get(
                            ability.abilityId
                        ) || 0
                    ) === 0
            );

        if (candidate) {

            addAbility(
                level,
                candidate.abilityId
            );
        }
    }


    /*
     * Дальше используем порядок
     * максимизации из abilityMaxLevel.
     *
     * Ультимейт принудительно занимает
     * 6 и 12.
     *
     * 10 и 15 оставляем талантам.
     */

    for (
        let level = 4;
        level <= 18;
        level++
    ) {

        if (
            level === 10 ||
            level === 15
        ) {
            continue;
        }


        if (
            ultimateId &&
            (
                level === 6 ||
                level === 12 ||
                level === 18
            )
        ) {

            addAbility(
                level,
                ultimateId
            );

            continue;
        }


        const candidate =
            maxOrder.find(
                ability =>
                    (
                        abilityRanks.get(
                            ability.abilityId
                        ) || 0
                    ) < 4
            );


        if (!candidate) {
            continue;
        }


        addAbility(
            level,
            candidate.abilityId
        );
    }


    /*
     * Финальный abilityBuild.
     */

    const build =
        [...levelMap.values()]
            .sort(
                (a, b) =>
                    a.level -
                    b.level
            )
            .map(row => ({

                level:
                    row.level,

                abilityId:
                    row.abilityId,

                matches:
                    row.matches,

                winRate:
                    row.matches > 0
                        ? Number(
                            (
                                row.wins /
                                row.matches *
                                100
                            ).toFixed(2)
                        )
                        : 0
            }));


    /*
     * Статистика способности для
     * остальных частей guides-data.
     */

    const abilityMap =
        new Map();

    for (const row of combined) {

        if (
            !abilityMap.has(
                row.abilityId
            )
        ) {

            abilityMap.set(
                row.abilityId,
                []
            );
        }

        abilityMap
            .get(row.abilityId)
            .push(row);
    }


    const abilities = {};


    for (
        const [abilityId, rows]
        of abilityMap.entries()
    ) {

        rows.sort(
            (a, b) =>
                b.matches -
                a.matches
        );

        abilities[abilityId] =
            rows
                .slice(0, 8)
                .map(row => ({

                    level:
                        row.level,

                    matches:
                        row.matches,

                    winRate:
                        row.matches > 0
                            ? Number(
                                (
                                    row.wins /
                                    row.matches *
                                    100
                                ).toFixed(2)
                            )
                            : 0
                }));
    }


    return {
        build,
        abilities
    };
}


// ======================================================
// GRAPHQL
// ======================================================

function createQuery(heroId) {

    return `
    query {
        heroStats {

            itemBootPurchase(
                heroId: ${heroId}
            ) {
                heroId
                itemId
                instance
                time
                timeAverage
                matchCount
                winCount
                winAverage
            }

            itemFullPurchase(
                heroId: ${heroId}
            ) {
                heroId
                itemId
                instance
                time
                matchCount
                winCount
                winsAverage
            }

            abilityMinLevel(
                heroId: ${heroId}
            ) {
                heroId
                abilityId
                level
                matchCount
                winCount
            }

            abilityMaxLevel(
                heroId: ${heroId}
            ) {
                heroId
                abilityId
                level
                matchCount
                winCount
            }
        }
    }
    `;
}


// ======================================================
// ЗАПРОС ОДНОГО ГЕРОЯ
// ======================================================

async function requestHero(
    heroId,
    attempt = 1
) {

    const response =
        await fetch(
            API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "Authorization":
                        `Bearer ${STRATZ_TOKEN}`,

                    "User-Agent":
                        "Roshan-Dota-Guides"
                },

                body:
                    JSON.stringify({
                        query:
                            createQuery(
                                heroId
                            )
                    })
            }
        );


    const text =
        await response.text();


    if (!response.ok) {

        if (
            attempt <
            MAX_RETRIES
        ) {

            console.log(
                `HTTP ${response.status}. Retry ${attempt}/${MAX_RETRIES - 1}...`
            );

            await sleep(
                1500 * attempt
            );

            return requestHero(
                heroId,
                attempt + 1
            );
        }

        throw new Error(
            `STRATZ HTTP ${response.status}: ${text.slice(0, 300)}`
        );
    }


    const json =
        JSON.parse(text);


    if (json.errors?.length) {

        throw new Error(
            JSON.stringify(
                json.errors
            )
        );
    }


    const data =
        json?.data?.heroStats;


    if (!data) {
        throw new Error(
            "No heroStats returned."
        );
    }


    return data;
}


// ======================================================
// ОБРАБОТКА ОДНОГО ГЕРОЯ
// ======================================================

async function buildHeroGuide(
    heroId,
    heroName
) {

    const data =
        await requestHero(
            heroId
        );


    const boots =
        buildBoots(
            data.itemBootPurchase
        );


    const items =
        buildItems(
            data.itemFullPurchase
        );


    const abilityData =
    buildAbilityData(
        data.abilityMinLevel,
        data.abilityMaxLevel,
        heroId
    );


    return {
        heroId,
        name: heroName,

        boots,

        earlyItems: items.early,
coreItems: items.core,
situationalItems: items.situational,
lateItems: items.late,

        abilityBuild:
            abilityData.build,

        abilities:
            abilityData.abilities
    };
}


// ======================================================
// СТАРЫЙ JSON
// ======================================================

function loadPreviousHeroes() {

    if (
        !fs.existsSync(
            OUTPUT_FILE
        )
    ) {
        return {};
    }

    try {

        const oldData =
            JSON.parse(
                fs.readFileSync(
                    OUTPUT_FILE,
                    "utf8"
                )
            );

        return (
            oldData?.heroes || {}
        );

    } catch (error) {

        console.log(
            "Could not read previous guides-data.json."
        );

        return {};
    }
}


// ======================================================
// MAIN
// ======================================================

async function main() {

    console.log(
        "================================"
    );

    console.log(
        "ROSHAN — STRATZ GUIDE UPDATE"
    );

    console.log(
        "================================"
    );

    console.log(
        `Heroes: ${HEROES.length}`
    );

    console.log("");

  await loadDotaAbilityData();  

    const previousHeroes =
        loadPreviousHeroes();


    const heroes = {
        ...previousHeroes
    };


    let success = 0;
    let failed = 0;


    for (
        let i = 0;
        i < HEROES.length;
        i++
    ) {

        const [
            heroId,
            heroName
        ] = HEROES[i];


        const progress =
            `${i + 1}/${HEROES.length}`;


        process.stdout.write(
            `${progress} — ${heroName}... `
        );


        try {

            const guide =
                await buildHeroGuide(
                    heroId,
                    heroName
                );


            heroes[heroId] =
                guide;


            success++;


            console.log(
    `✓ early:${guide.earlyItems.length} core:${guide.coreItems.length} situational:${guide.situationalItems.length} late:${guide.lateItems.length} abilities:${guide.abilityBuild.length}`
);

        } catch (error) {

            failed++;


            if (
                previousHeroes[
                    heroId
                ]
            ) {

                console.log(
                    "⚠ failed — keeping previous data"
                );

            } else {

                console.log(
                    "✗ failed"
                );
            }


            console.error(
                `   ${String(
                    error.message ||
                    error
                ).slice(0, 300)}`
            );
        }


        if (
            i <
            HEROES.length - 1
        ) {
            await sleep(
                REQUEST_DELAY
            );
        }
    }


    // Не считаем обновление успешным,
    // если вообще ни одного героя получить не удалось.
    if (
        success === 0 &&
        Object.keys(heroes).length === 0
    ) {

        throw new Error(
            "No hero guides could be generated."
        );
    }


    const output = {

        ok: true,

        source:
            "STRATZ",

        updatedAt:
            new Date().toISOString(),

        heroCount:
            Object.keys(
                heroes
            ).length,

        updateStats: {
            success,
            failed
        },

        heroes
    };


    fs.writeFileSync(
        OUTPUT_FILE,

        JSON.stringify(
            output,
            null,
            2
        ) + "\n",

        "utf8"
    );


    console.log("");
    console.log(
        "================================"
    );

    console.log(
        "GUIDE UPDATE COMPLETE"
    );

    console.log(
        "================================"
    );

    console.log(
        `Updated: ${success}`
    );

    console.log(
        `Failed: ${failed}`
    );

    console.log(
        `Heroes in JSON: ${output.heroCount}`
    );

    console.log(
        `${OUTPUT_FILE} created successfully.`
    );
}


main().catch(error => {

    console.error(
        "Guide generation failed:"
    );

    console.error(error);

    process.exit(1);
});

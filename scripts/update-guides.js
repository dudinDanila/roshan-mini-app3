const fs = require("fs");

const STRATZ_TOKEN = process.env.STRATZ_TOKEN;

if (!STRATZ_TOKEN) {
    console.error("STRATZ_TOKEN is missing.");
    process.exit(1);
}

const API_URL = "https://api.stratz.com/graphql";

// Пока тестируем только Pudge
const HERO_ID = 14;
const HERO_NAME = "PUDGE";

const QUERY = `
query {
    heroStats {

        itemStartingPurchase(
            heroId: ${HERO_ID}
        ) {
            heroId
            itemId
            instance
            wasGiven
            matchCount
            winCount
            winsAverage
        }

        itemBootPurchase(
            heroId: ${HERO_ID}
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
            heroId: ${HERO_ID}
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
            heroId: ${HERO_ID}
        ) {
            heroId
            abilityId
            level
            matchCount
            winCount
        }

        abilityMaxLevel(
            heroId: ${HERO_ID}
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


// ======================================================
// ОБЩИЕ ФУНКЦИИ
// ======================================================

function number(value) {
    const result = Number(value);

    if (!Number.isFinite(result)) {
        return 0;
    }

    return result;
}


function sortByMatches(a, b) {
    return number(b.matchCount) - number(a.matchCount);
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

    return {
        itemId: number(best.itemId),

        matches: number(best.matchCount),

        wins: number(best.winCount),

        winRate:
            number(best.matchCount) > 0
                ? Number(
                    (
                        number(best.winCount) /
                        number(best.matchCount) *
                        100
                    ).toFixed(2)
                )
                : 0,

        averageTime:
            Number(
                number(best.timeAverage).toFixed(1)
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

    /*
        Один и тот же itemId может встречаться
        несколько раз на разных таймингах.

        Поэтому сначала объединяем статистику
        одного предмета.
    */

    const map = new Map();

    for (const row of source) {

        const itemId = number(row.itemId);

        if (!map.has(itemId)) {
            map.set(itemId, {
                itemId,
                matches: 0,
                wins: 0,
                weightedTime: 0
            });
        }

        const item = map.get(itemId);

        const matches = number(row.matchCount);
        const wins = number(row.winCount);
        const time = number(row.time);

        item.matches += matches;
        item.wins += wins;

        item.weightedTime +=
            time * matches;
    }

    const result = [];

    for (const item of map.values()) {

        if (item.matches < 500) {
            continue;
        }

        result.push({

            itemId: item.itemId,

            matches: item.matches,

            wins: item.wins,

            winRate:
                Number(
                    (
                        item.wins /
                        item.matches *
                        100
                    ).toFixed(2)
                ),

            averageTime:
                item.matches > 0
                    ? Math.round(
                        item.weightedTime /
                        item.matches
                    )
                    : 0
        });
    }

    /*
        Нам нужны популярные предметы,
        а не предметы с максимальным WR.
    */

    result.sort(
        (a, b) =>
            b.matches - a.matches
    );

    return result.slice(0, 12);
}


// ======================================================
// СПОСОБНОСТИ
// ======================================================

function buildAbilityData(minRows, maxRows) {

    const allRows = [
        ...(minRows || []),
        ...(maxRows || [])
    ];

    /*
        Отбрасываем совсем редкие варианты.
    */

    const clean = allRows.filter(row =>
        number(row.abilityId) > 0 &&
        number(row.level) > 0 &&
        number(row.matchCount) >= 100
    );

    /*
        STRATZ может вернуть одинаковую
        способность + уровень несколько раз.

        Складываем количество матчей.
    */

    const map = new Map();

    for (const row of clean) {

        const abilityId = number(row.abilityId);
        const level = number(row.level);

        const key =
            `${abilityId}:${level}`;

        if (!map.has(key)) {

            map.set(key, {
                abilityId,
                level,
                matches: 0,
                wins: 0
            });
        }

        const entry = map.get(key);

        entry.matches +=
            number(row.matchCount);

        entry.wins +=
            number(row.winCount);
    }

    const combined =
        [...map.values()];

    /*
        Для каждого уровня выбираем вариант,
        который встречался чаще всего.
    */

    const levelMap = new Map();

    for (const row of combined) {

        const current =
            levelMap.get(row.level);

        if (
            !current ||
            row.matches > current.matches
        ) {
            levelMap.set(
                row.level,
                row
            );
        }
    }

    const build = [
        ...levelMap.values()
    ]
        .sort(
            (a, b) =>
                a.level - b.level
        )
        .map(row => ({
            level: row.level,

            abilityId: row.abilityId,

            matches: row.matches,

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
        Также сохраняем популярные уровни
        каждой способности. Это пригодится,
        когда будем подключать guides.js.
    */

    const abilityMap = new Map();

    for (const row of combined) {

        if (!abilityMap.has(row.abilityId)) {
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
                b.matches - a.matches
        );

        abilities[abilityId] =
            rows.slice(0, 8).map(row => ({

                level: row.level,

                matches: row.matches,

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
// ЗАПРОС STRATZ
// ======================================================

async function loadStratz() {

    console.log(
        "Loading Pudge data from STRATZ..."
    );

    const response = await fetch(
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

            body: JSON.stringify({
                query: QUERY
            })
        }
    );

    const text =
        await response.text();

    if (!response.ok) {

        console.error(
            `STRATZ HTTP ${response.status}`
        );

        console.error(text);

        process.exit(1);
    }

    const json =
        JSON.parse(text);

    if (json.errors?.length) {

        console.error(
            "STRATZ GraphQL errors:"
        );

        console.error(
            JSON.stringify(
                json.errors,
                null,
                2
            )
        );

        process.exit(1);
    }

    const data =
        json?.data?.heroStats;

    if (!data) {

        console.error(
            "No heroStats returned."
        );

        process.exit(1);
    }

    return data;
}


// ======================================================
// MAIN
// ======================================================

async function main() {

    const data =
        await loadStratz();

    console.log(
        "Processing Pudge guide..."
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
            data.abilityMaxLevel
        );


    const output = {

        ok: true,

        source: "STRATZ",

        updatedAt:
            new Date().toISOString(),

        heroes: {

            [HERO_ID]: {

                heroId:
                    HERO_ID,

                name:
                    HERO_NAME,

                boots,

                items,

                abilityBuild:
                    abilityData.build,

                abilities:
                    abilityData.abilities
            }
        }
    };


    fs.writeFileSync(
        "guides-data.json",

        JSON.stringify(
            output,
            null,
            2
        ) + "\n",

        "utf8"
    );


    console.log(
        "\n=============================="
    );

    console.log(
        "GUIDE CREATED"
    );

    console.log(
        "=============================="
    );

    console.log(
        `Hero: ${HERO_NAME}`
    );

    console.log(
        `Boots: ${boots?.itemId ?? "none"}`
    );

    console.log(
        `Items: ${items.length}`
    );

    console.log(
        `Ability build levels: ${abilityData.build.length}`
    );

    console.log(
        "\nguides-data.json created successfully."
    );
}


main().catch(error => {

    console.error(
        "Guide generation failed:"
    );

    console.error(error);

    process.exit(1);
});

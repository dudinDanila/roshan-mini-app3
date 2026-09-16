const STRATZ_TOKEN = process.env.STRATZ_TOKEN;

if (!STRATZ_TOKEN) {
    console.error("STRATZ_TOKEN is missing.");
    process.exit(1);
}

const API_URL = "https://api.stratz.com/graphql";

// Pudge
const HERO_ID = 14;

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

async function main() {

    console.log("Loading REAL Pudge guide data from STRATZ...");

    const response = await fetch(API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${STRATZ_TOKEN}`,
            "User-Agent": "Roshan-Dota-Guides"
        },

        body: JSON.stringify({
            query: QUERY
        })
    });

    const text = await response.text();

    if (!response.ok) {
        console.error(`STRATZ HTTP ${response.status}`);
        console.error(text);
        process.exit(1);
    }

    const json = JSON.parse(text);

    if (json.errors?.length) {
        console.error("STRATZ GraphQL errors:");
        console.error(
            JSON.stringify(json.errors, null, 2)
        );
        process.exit(1);
    }

    const data = json?.data?.heroStats;

    if (!data) {
        console.error("No heroStats returned.");
        process.exit(1);
    }

    console.log("\n==============================");
    console.log("PUDGE — HERO ID 14");
    console.log("==============================");

    console.log("\n=== STARTING ITEMS ===");
    console.log(
        JSON.stringify(
            (data.itemStartingPurchase || []).slice(0, 15),
            null,
            2
        )
    );

    console.log("\n=== BOOTS ===");
    console.log(
        JSON.stringify(
            (data.itemBootPurchase || []).slice(0, 15),
            null,
            2
        )
    );

    console.log("\n=== FULL ITEMS ===");
    console.log(
        JSON.stringify(
            (data.itemFullPurchase || []).slice(0, 25),
            null,
            2
        )
    );

    console.log("\n=== ABILITY MIN LEVEL ===");
    console.log(
        JSON.stringify(
            (data.abilityMinLevel || []).slice(0, 30),
            null,
            2
        )
    );

    console.log("\n=== ABILITY MAX LEVEL ===");
    console.log(
        JSON.stringify(
            (data.abilityMaxLevel || []).slice(0, 30),
            null,
            2
        )
    );
}

main().catch(error => {
    console.error("Pudge guide test failed:");
    console.error(error);
    process.exit(1);
});

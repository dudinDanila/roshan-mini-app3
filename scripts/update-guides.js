const STRATZ_TOKEN = process.env.STRATZ_TOKEN;

if (!STRATZ_TOKEN) {
    console.error("STRATZ_TOKEN is missing.");
    process.exit(1);
}

const API_URL = "https://api.stratz.com/graphql";

const QUERY = `
query {
    matchPlayer: __type(name: "MatchPlayerType") {
        name
        fields {
            name
            type {
                kind
                name
                ofType {
                    kind
                    name
                    ofType {
                        kind
                        name
                    }
                }
            }
        }
    }

    heroAbility: __type(name: "HeroAbilityType") {
        name
        fields {
            name
            type {
                kind
                name
                ofType {
                    kind
                    name
                    ofType {
                        kind
                        name
                    }
                }
            }
        }
    }

    heroAbilityTalent: __type(name: "HeroAbilityTalentType") {
        name
        fields {
            name
            type {
                kind
                name
                ofType {
                    kind
                    name
                    ofType {
                        kind
                        name
                    }
                }
            }
        }
    }
}
`;

async function main() {

    console.log("Checking abilities and MatchPlayer...");

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
        console.error(
            "STRATZ HTTP:",
            response.status
        );

        console.error(text);
        process.exit(1);
    }

    const json = JSON.parse(text);

    if (json.errors?.length) {
        console.error(
            JSON.stringify(json.errors, null, 2)
        );

        process.exit(1);
    }

    const data = json.data;

    console.log("\n=== MATCH PLAYER FIELDS ===");

    for (const field of data.matchPlayer?.fields || []) {
        const name = field.name.toLowerCase();

        if (
            name.includes("ability") ||
            name.includes("item") ||
            name.includes("talent") ||
            name.includes("level") ||
            name.includes("position") ||
            name.includes("role")
        ) {
            console.log(
                field.name,
                JSON.stringify(field.type)
            );
        }
    }

    console.log("\n=== HERO ABILITY TYPE ===");

    for (const field of data.heroAbility?.fields || []) {
        console.log(
            field.name,
            JSON.stringify(field.type)
        );
    }

    console.log("\n=== HERO ABILITY TALENT TYPE ===");

    for (
        const field
        of data.heroAbilityTalent?.fields || []
    ) {
        console.log(
            field.name,
            JSON.stringify(field.type)
        );
    }
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});

const STRATZ_TOKEN = process.env.STRATZ_TOKEN;

if (!STRATZ_TOKEN) {
    console.error("STRATZ_TOKEN is missing.");
    process.exit(1);
}

const API_URL = "https://api.stratz.com/graphql";

const TYPES = [
    "HeroItemPurchaseType",
    "HeroItemStartingPurchaseType",
    "HeroItemBootPurchaseType",
    "HeroAbilityMinType",
    "HeroAbilityMaxType"
];

function makeTypeQuery(name, index) {
    return `
        t${index}: __type(name: "${name}") {
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
    `;
}

const QUERY = `
query {
    ${TYPES.map(makeTypeQuery).join("\n")}
}
`;

function getTypeName(type) {
    if (!type) return "unknown";

    if (type.name) {
        return type.name;
    }

    if (type.ofType) {
        return getTypeName(type.ofType);
    }

    return type.kind || "unknown";
}

async function main() {

    console.log("Checking guide result fields...");

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
            `STRATZ HTTP ${response.status}`
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

    for (let i = 0; i < TYPES.length; i++) {

        const type = json.data[`t${i}`];

        console.log(
            `\n=== ${TYPES[i]} ===`
        );

        if (!type) {
            console.log("TYPE NOT FOUND");
            continue;
        }

        for (const field of type.fields || []) {
            console.log(
                `${field.name}: ${getTypeName(field.type)}`
            );
        }
    }
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});

const STRATZ_TOKEN = process.env.STRATZ_TOKEN;

if (!STRATZ_TOKEN) {
    console.error("STRATZ_TOKEN is missing.");
    process.exit(1);
}

const API_URL = "https://api.stratz.com/graphql";

const QUERY = `
query {
    queryType: __type(name: "Query") {
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
            args {
                name
                type {
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

    heroType: __type(name: "HeroType") {
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

function typeName(type) {
    if (!type) return "";

    if (type.name) {
        return type.name;
    }

    return typeName(type.ofType);
}

async function main() {

    console.log("Searching STRATZ hero list API...");

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
        console.error(
            JSON.stringify(json.errors, null, 2)
        );
        process.exit(1);
    }

    console.log("\n=== ROOT FIELDS RELATED TO HERO ===");

    const fields =
        json?.data?.queryType?.fields || [];

    for (const field of fields) {

        const name =
            String(field.name || "").toLowerCase();

        const resultType =
            typeName(field.type);

        if (
            name.includes("hero") ||
            resultType.includes("Hero")
        ) {
            console.log(
                `\n${field.name} -> ${resultType}`
            );

            if (field.args?.length) {
                console.log(
                    "args:",
                    field.args.map(arg =>
                        `${arg.name}: ${typeName(arg.type)}`
                    ).join(", ")
                );
            }
        }
    }


    console.log("\n=== HeroType FIELDS ===");

    const heroFields =
        json?.data?.heroType?.fields || [];

    for (const field of heroFields) {
        console.log(
            `${field.name}: ${typeName(field.type)}`
        );
    }
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});

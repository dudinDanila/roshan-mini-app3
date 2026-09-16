const STRATZ_TOKEN = process.env.STRATZ_TOKEN;

if (!STRATZ_TOKEN) {
    console.error("STRATZ_TOKEN is missing.");
    process.exit(1);
}

const API_URL = "https://api.stratz.com/graphql";

const QUERY = `
query {
    __type(name: "HeroStatsQuery") {
        name

        fields {
            name

            args {
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

    console.log("Checking HeroStatsQuery...");

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

    const type =
        json?.data?.__type;

    if (!type) {
        console.error(
            "HeroStatsQuery was not found."
        );

        process.exit(1);
    }

    console.log(
        "\n=== HERO STATS QUERY FIELDS ===\n"
    );

    for (const field of type.fields || []) {

        console.log(
            `FIELD: ${field.name}`
        );

        console.log(
            `RETURNS: ${getTypeName(field.type)}`
        );

        if (field.args?.length) {

            console.log("ARGS:");

            for (const arg of field.args) {
                console.log(
                    ` - ${arg.name}: ${getTypeName(arg.type)}`
                );
            }
        }

        console.log("----------------");
    }
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});

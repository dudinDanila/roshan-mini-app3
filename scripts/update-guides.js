const STRATZ_TOKEN = process.env.STRATZ_TOKEN;

if (!STRATZ_TOKEN) {
    console.error("STRATZ_TOKEN is missing.");
    process.exit(1);
}

const API_URL = "https://api.stratz.com/graphql";

const QUERY = `
query {
    __type(name: "Query") {
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

function typeName(type) {

    if (!type) {
        return "unknown";
    }

    if (type.name) {
        return type.name;
    }

    if (type.ofType) {
        return typeName(type.ofType);
    }

    return type.kind;
}

async function main() {

    console.log("Finding STRATZ guide queries...");

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

    const fields =
        json?.data?.__type?.fields || [];

    const interesting =
        fields.filter(field => {

            const name =
                field.name.toLowerCase();

            const result =
                typeName(field.type)
                    .toLowerCase();

            return (
                name.includes("guide") ||
                name.includes("ability") ||
                name.includes("talent") ||
                name.includes("item") ||
                name.includes("herostat") ||
                result.includes("guide") ||
                result.includes("ability") ||
                result.includes("talent")
            );
        });

    console.log(
        "\n=== RELEVANT QUERY FIELDS ===\n"
    );

    for (const field of interesting) {

        console.log(
            "QUERY:",
            field.name
        );

        console.log(
            "RETURNS:",
            typeName(field.type)
        );

        if (field.args.length) {

            console.log("ARGS:");

            for (const arg of field.args) {

                console.log(
                    " -",
                    arg.name,
                    ":",
                    typeName(arg.type)
                );
            }
        }

        console.log("----------------");
    }

    console.log(
        "Found:",
        interesting.length
    );
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});

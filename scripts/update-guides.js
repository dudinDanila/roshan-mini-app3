const STRATZ_TOKEN = process.env.STRATZ_TOKEN;

if (!STRATZ_TOKEN) {
    console.error("STRATZ_TOKEN is missing.");
    process.exit(1);
}

const API_URL = "https://api.stratz.com/graphql";

const QUERY = `
{
    __schema {
        types {
            name
        }
    }
}
`;

async function main() {

    console.log("Checking STRATZ GraphQL types...");

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
        throw new Error(
            `STRATZ HTTP ${response.status}: ${text.slice(0, 1000)}`
        );
    }

    const json = JSON.parse(text);

    if (json.errors?.length) {
        console.error(
            JSON.stringify(json.errors, null, 2)
        );
        process.exit(1);
    }

    const types =
        json?.data?.__schema?.types || [];

    const interesting = types
        .map(type => type.name)
        .filter(Boolean)
        .filter(name => {
            const value =
                name.toLowerCase();

            return (
                value.includes("hero") ||
                value.includes("item") ||
                value.includes("ability") ||
                value.includes("talent") ||
                value.includes("stat")
            );
        })
        .sort();

    console.log(
        "\n=== RELEVANT STRATZ TYPES ===\n"
    );

    interesting.forEach(name => {
        console.log("TYPE:", name);
    });

    console.log(
        "\nTotal relevant types:",
        interesting.length
    );
}

main().catch(error => {
    console.error(
        "Schema check failed:"
    );

    console.error(error);

    process.exit(1);
});

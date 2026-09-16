const STRATZ_TOKEN = process.env.STRATZ_TOKEN;

if (!STRATZ_TOKEN) {
    console.error("STRATZ_TOKEN is missing.");
    process.exit(1);
}

const API_URL = "https://api.stratz.com/graphql";

/*
    Первый тест:
    узнаём, какие поля реально доступны
    внутри HeroStatsType.
*/

const QUERY = `
{
    __type(name: "HeroStatsType") {
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
                }
            }
        }
    }
}
`;

async function main() {

    console.log("Checking STRATZ guide API...");

    const response = await fetch(
        API_URL,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${STRATZ_TOKEN}`,
                "User-Agent": "Roshan-Dota-Guides"
            },

            body: JSON.stringify({
                query: QUERY
            })
        }
    );

    const text = await response.text();

    if (!response.ok) {

        throw new Error(
            `STRATZ HTTP ${response.status}: ${text.slice(0, 1000)}`
        );
    }


    let json;

    try {

        json = JSON.parse(text);

    } catch {

        throw new Error(
            "STRATZ returned invalid JSON:\n" +
            text.slice(0, 1000)
        );
    }


    if (json.errors?.length) {

        console.error(
            "GraphQL errors:"
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


    const fields =
        json?.data?.__type?.fields;


    if (!fields) {

        console.log(
            "HeroStatsType was not found."
        );

        console.log(
            JSON.stringify(
                json,
                null,
                2
            )
        );

        return;
    }


    console.log(
        "\n=== HERO STATS FIELDS ===\n"
    );


    for (const field of fields) {

        console.log(
            "FIELD:",
            field.name
        );


        if (field.args?.length) {

            console.log(
                "ARGS:",
                field.args
                    .map(arg => arg.name)
                    .join(", ")
            );
        }


        console.log("----------------");
    }


    console.log(
        "\nSTRATZ schema check completed."
    );
}


main().catch(error => {

    console.error(
        "Guide API check failed:"
    );

    console.error(error);

    process.exit(1);
});

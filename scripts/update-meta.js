const fs = require("fs");

const STRATZ_TOKEN = process.env.STRATZ_TOKEN;

if (!STRATZ_TOKEN) {
  console.error("STRATZ_TOKEN is missing.");
  process.exit(1);
}

const API_URL = "https://api.stratz.com/graphql";

const POSITIONS = {
  carry: "POSITION_1",
  mid: "POSITION_2",
  offlane: "POSITION_3",
  support: "POSITION_4",
  hardSupport: "POSITION_5"
};

const QUERY = `
  query HeroMeta(
    $position: [MatchPlayerPositionType!]
    $brackets: [RankBracket!]
  ) {
    heroStats {
      winWeek(
        positionIds: $position
        bracketIds: $brackets
        take: 500
      ) {
        heroId
        matchCount
        winCount
      }
    }
  }
`;

async function requestStratz(position) {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${STRATZ_TOKEN}`,
      "User-Agent": "Roshan-Dota-Meta"
    },

    body: JSON.stringify({
      query: QUERY,

      variables: {
        position: [position],
        brackets: ["DIVINE", "IMMORTAL"]
      }
    })
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(
      `STRATZ HTTP ${response.status}: ${text.slice(0, 300)}`
    );
  }

  let json;

  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(
      `STRATZ returned invalid JSON: ${text.slice(0, 300)}`
    );
  }

  if (json.errors?.length) {
    throw new Error(
      json.errors.map(error => error.message).join(" | ")
    );
  }

  return json?.data?.heroStats?.winWeek || [];
}

function processHeroes(rows) {
  const heroes = new Map();

  for (const row of rows) {
    const heroId = Number(row.heroId);
    const matches = Number(row.matchCount) || 0;
    const wins = Number(row.winCount) || 0;

    if (!heroId || matches <= 0) {
      continue;
    }

    if (!heroes.has(heroId)) {
      heroes.set(heroId, {
        heroId,
        matches: 0,
        wins: 0
      });
    }

    const hero = heroes.get(heroId);

    hero.matches += matches;
    hero.wins += wins;
  }

  const merged = Array.from(heroes.values());

  if (merged.length === 0) {
    return [];
  }

  const maxMatches = Math.max(
    ...merged.map(hero => hero.matches)
  );

  const minimumMatches = Math.max(
    100,
    Math.floor(maxMatches * 0.05)
  );

  return merged
    .filter(hero => hero.matches >= minimumMatches)

    .map(hero => ({
      heroId: hero.heroId,
      matches: hero.matches,
      wins: hero.wins,

      winRate: Number(
        ((hero.wins / hero.matches) * 100).toFixed(2)
      )
    }))

    .sort((a, b) => {
      if (b.winRate !== a.winRate) {
        return b.winRate - a.winRate;
      }

      return b.matches - a.matches;
    })

    .slice(0, 30);
}

async function main() {
  console.log("Updating Roshan meta...");

  const roles = {};

  for (const [role, position] of Object.entries(POSITIONS)) {
    console.log(`Loading ${role}...`);

    const rows = await requestStratz(position);
    const heroes = processHeroes(rows);

    if (heroes.length === 0) {
      throw new Error(
        `No usable hero data returned for ${role}.`
      );
    }

    roles[role] = heroes;

    console.log(
      `${role}: ${heroes.length} heroes processed`
    );
  }

  const meta = {
    ok: true,
    source: "STRATZ",
    bracket: "Divine + Immortal",
    period: "Last 7 days",
    updatedAt: new Date().toISOString(),
    roles
  };

  fs.writeFileSync(
    "meta-data.json",
    JSON.stringify(meta, null, 2) + "\n",
    "utf8"
  );

  console.log("meta-data.json updated successfully.");
}

main().catch(error => {
  console.error("Meta update failed:");
  console.error(error);
  process.exit(1);
});

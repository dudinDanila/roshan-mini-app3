/* =========================================================
   ROSHAN — DOTA 2 GUIDES DATABASE
   Source: Dota2ProTracker
   Patch: 7.41e
========================================================= */

const D2PT_PATCH = "7.41e";

const d2ptGuides = {

    "ABADDON": {},
    "ALCHEMIST": {},
    "ANCIENT APPARITION": {},
    "ANTI-MAGE": {
    patch: "7.41e",

    builds: {
        carry: {
            role: "Carry",

            items: [
                {
                    name: "Magic Wand",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/magic_wand.png"
                },
                {
                    name: "Power Treads",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/power_treads.png"
                },
                {
                    name: "Battle Fury",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/bfury.png"
                },
                {
                    name: "Yasha",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/yasha.png"
                },
                {
                    name: "Manta Style",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/manta.png"
                },
                {
                    name: "Butterfly",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/butterfly.png"
                },
                {
                    name: "Skull Basher",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/basher.png"
                },
                {
                    name: "Eye of Skadi",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/skadi.png"
                },
                {
                    name: "Abyssal Blade",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/abyssal_blade.png"
                },
                {
                    name: "Black King Bar",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/black_king_bar.png"
                }
            ],

            skills: [
                {
                    name: "Mana Break",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/antimage_mana_break.png"
                },
                {
                    name: "Blink",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/antimage_blink.png"
                },
                {
                    name: "Mana Break",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/antimage_mana_break.png"
                },
                {
                    name: "Counterspell",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/antimage_counterspell.png"
                },
                {
                    name: "Mana Break",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/antimage_mana_break.png"
                },
                {
                    name: "Mana Void",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/antimage_mana_void.png"
                },
                {
                    name: "Blink",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/antimage_blink.png"
                },
                {
                    name: "Blink",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/antimage_blink.png"
                },
                {
                    name: "Blink",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/antimage_blink.png"
                },
                {
                    name: "Mana Break",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/antimage_mana_break.png"
                }
            ],

            talents: [
                [10, "+200 Mana Void Radius"],
                [15, "+0.2 Mana Void Damage Multiplier"],
                [20, "+125 Blink Cast Range"],
                [25, "-50s Mana Void Cooldown"]
            ]
        }
    }
},
    "ARC WARDEN": {},
    "AXE": {
    patch: "7.41e",

    builds: {

        offlane: {

            role: "Offlane",

            /* =========================
               STARTING ITEMS
            ========================= */

            startingItems: [
                {
                    name: "Gauntlets of Strength",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/gauntlets.png"
                },
                {
                    name: "Iron Branch",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/branches.png"
                },
                {
                    name: "Iron Branch",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/branches.png"
                },
                {
                    name: "Magic Stick",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/magic_stick.png"
                },
                {
                    name: "Tango",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/tango.png"
                }
            ],


            /* =========================
               EARLY GAME
            ========================= */

            earlyItems: [
                {
                    name: "Bracer",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/bracer.png"
                },
                {
                    name: "Magic Wand",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/magic_wand.png"
                },
                {
                    name: "Phase Boots",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/phase_boots.png"
                },
                {
                    name: "Vanguard",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/vanguard.png"
                }
            ],


            /* =========================
               CORE
            ========================= */

            coreItems: [
                {
                    name: "Blade Mail",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/blade_mail.png"
                },
                {
                    name: "Blink Dagger",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/blink.png"
                },
                {
                    name: "Black King Bar",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/black_king_bar.png"
                },
                {
                    name: "Aghanim's Shard",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/aghanims_shard.png"
                }
            ],


            /* =========================
               SITUATIONAL
            ========================= */

            situationalItems: [
                {
                    name: "Kaya and Sange",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/kaya_and_sange.png"
                },
                {
                    name: "Lotus Orb",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/lotus_orb.png"
                },
                {
                    name: "Crimson Guard",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/crimson_guard.png"
                },
                {
                    name: "Pipe of Insight",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/pipe.png"
                },
                {
                    name: "Shiva's Guard",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/shivas_guard.png"
                }
            ],


            /* =========================
               LATE GAME
            ========================= */

            lateItems: [
                {
                    name: "Heart of Tarrasque",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/heart.png"
                },
                {
                    name: "Boots of Travel",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/travel_boots.png"
                }
            ],


            /* Совместимость со старым интерфейсом.
               Позже этот массив можно удалить. */

            items: [
                {
                    name: "Phase Boots",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/phase_boots.png"
                },
                {
                    name: "Blade Mail",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/blade_mail.png"
                },
                {
                    name: "Blink Dagger",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/blink.png"
                },
                {
                    name: "Black King Bar",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/black_king_bar.png"
                },
                {
                    name: "Aghanim's Shard",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/aghanims_shard.png"
                }
            ],


            /* =========================
               SKILL BUILD
            ========================= */

            skills: [
                {
                    level: 1,
                    name: "Battle Hunger",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/axe_battle_hunger.png"
                },
                {
                    level: 2,
                    name: "Counter Helix",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/axe_counter_helix.png"
                },
                {
                    level: 3,
                    name: "Counter Helix",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/axe_counter_helix.png"
                },
                {
                    level: 4,
                    name: "Berserker's Call",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/axe_berserkers_call.png"
                },
                {
                    level: 5,
                    name: "Counter Helix",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/axe_counter_helix.png"
                },
                {
                    level: 6,
                    name: "Culling Blade",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/axe_culling_blade.png"
                },
                {
                    level: 7,
                    name: "Counter Helix",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/axe_counter_helix.png"
                },
                {
                    level: 8,
                    name: "Berserker's Call",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/axe_berserkers_call.png"
                },
                {
                    level: 9,
                    name: "Berserker's Call",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/axe_berserkers_call.png"
                },
                {
                    level: 10,
                    name: "Berserker's Call",
                    icon: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/axe_berserkers_call.png"
                }
            ],


            /* =========================
               TALENTS
            ========================= */

            talents: [
                {
                    level: 10,
                    recommended: "+8% Movement Speed per active Battle Hunger",
                    alternative: "+3s Culling Blade Kill Buff Bonus Duration"
                },
                {
                    level: 15,
                    recommended: "+8 Battle Hunger Damage Per Second",
                    alternative: "+10 Berserker's Call Armor"
                },
                {
                    level: 20,
                    recommended: "+40 Counter Helix Damage",
                    alternative: "+15 Strength"
                },
                {
                    level: 25,
                    recommended: "+85 Berserker's Call AoE",
                    alternative: "+150 Culling Blade Damage"
                }
            ]
        }
    }
},

    "BANE": {},
    "BATRIDER": {},
    "BEASTMASTER": {},
    "BLOODSEEKER": {},
    "BOUNTY HUNTER": {},
    "BREWMASTER": {},
    "BRISTLEBACK": {},
    "BROODMOTHER": {},

    "CENTAUR WARRUNNER": {},
    "CHAOS KNIGHT": {},
    "CHEN": {},
    "CLINKZ": {},
    "CLOCKWERK": {},
    "CRYSTAL MAIDEN": {},

    "DARK SEER": {},
    "DARK WILLOW": {},
    "DAWNBREAKER": {},
    "DAZZLE": {},
    "DEATH PROPHET": {},
    "DISRUPTOR": {},
    "DOOM": {},
    "DRAGON KNIGHT": {},
    "DROW RANGER": {},

    "EARTH SPIRIT": {},
    "EARTHSHAKER": {},
    "ELDER TITAN": {},
    "EMBER SPIRIT": {},
    "ENCHANTRESS": {},
    "ENIGMA": {},

    "FACELESS VOID": {},

    "GRIMSTROKE": {},
    "GYROCOPTER": {},

    "HOODWINK": {},
    "HUSKAR": {},

    "INVOKER": {},
    "IO": {},

    "JAKIRO": {},
    "JUGGERNAUT": {},

    "KEEPER OF THE LIGHT": {},
    "KEZ": {},
    "KUNKKA": {},

    "LEGION COMMANDER": {},
    "LESHRAC": {},
    "LICH": {},
    "LIFESTEALER": {},
    "LINA": {},
    "LION": {},
    "LONE DRUID": {},
    "LUNA": {},
    "LYCAN": {},

    "MAGNUS": {},
    "MARCI": {},
    "MARS": {},
    "MEDUSA": {},
    "MEEPO": {},
    "MIRANA": {},
    "MONKEY KING": {},
    "MUERTA": {},

    "NAGA SIREN": {},
    "NATURE'S PROPHET": {},
    "NECROPHOS": {},
    "NIGHT STALKER": {},
    "NYX ASSASSIN": {},

    "OGRE MAGI": {},
    "OMNIKNIGHT": {},
    "ORACLE": {},
    "OUTWORLD DESTROYER": {},

    "PANGOLIER": {},
    "PHANTOM ASSASSIN": {},
    "PHANTOM LANCER": {},
    "PHOENIX": {},
    "PRIMAL BEAST": {},
    "PUCK": {},
    "PUDGE": {},
    "PUGNA": {},

    "QUEEN OF PAIN": {},

    "RAZOR": {},
    "RIKI": {},
    "RINGMASTER": {},
    "RUBICK": {},

    "SAND KING": {},
    "SHADOW DEMON": {},
    "SHADOW FIEND": {},
    "SHADOW SHAMAN": {},
    "SILENCER": {},
    "SKYWRATH MAGE": {},
    "SLARDAR": {},
    "SLARK": {},
    "SNAPFIRE": {},
    "SNIPER": {},
    "SPECTRE": {},
    "SPIRIT BREAKER": {},
    "STORM SPIRIT": {},
    "SVEN": {},

    "TECHIES": {},
    "TEMPLAR ASSASSIN": {},
    "TERRORBLADE": {},
    "TIDEHUNTER": {},
    "TIMBERSAW": {},
    "TINKER": {},
    "TINY": {},
    "TREANT PROTECTOR": {},
    "TROLL WARLORD": {},
    "TUSK": {},

    "UNDERLORD": {},
    "UNDYING": {},
    "URSA": {},

    "VENGEFUL SPIRIT": {},
    "VENOMANCER": {},
    "VIPER": {},
    "VISAGE": {},
    "VOID SPIRIT": {},

    "WARLOCK": {},
    "WEAVER": {},
    "WINDRANGER": {},
    "WINTER WYVERN": {},
    "WITCH DOCTOR": {},
    "WRAITH KING": {},

    "ZEUS": {}

};


/* =========================================================
   GUIDE HELPERS
========================================================= */

function getHeroGuide(heroName){

    if(!heroName){
        return null;
    }

    const key =
        heroName
            .trim()
            .toUpperCase();

    return d2ptGuides[key] || null;
}


/* Проверяем, заполнен ли гайд */

function hasHeroGuide(heroName){

    const guide =
        getHeroGuide(heroName);

    if(!guide){
        return false;
    }

    return Object.keys(guide).length > 0;
}


/* Возвращает список доступных ролей */

function getHeroGuideRoles(heroName){

    const guide =
        getHeroGuide(heroName);

    if(
        !guide ||
        !guide.builds
    ){
        return [];
    }

    return Object.keys(
        guide.builds
    );
}


/* =========================================================
   EXPORT TO ROSHAN
========================================================= */

window.d2ptGuides =
    d2ptGuides;

window.getHeroGuide =
    getHeroGuide;

window.hasHeroGuide =
    hasHeroGuide;

window.getHeroGuideRoles =
    getHeroGuideRoles;

window.D2PT_PATCH =
    D2PT_PATCH;

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
                "Magic Wand",
                "Power Treads",
                "Battle Fury",
                "Yasha",
                "Manta Style",
                "Butterfly",
                "Skull Basher",
                "Eye of Skadi",
                "Abyssal Blade",
                "Black King Bar"
            ],

            skills: [
                "Mana Break",
                "Blink",
                "Mana Break",
                "Counterspell",
                "Mana Break",
                "Mana Void",
                "Blink",
                "Blink",
                "Blink",
                "Mana Break"
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
    "AXE": {},

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

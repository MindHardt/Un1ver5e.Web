const Stats = {
    str: "Str",
    dex: "Dex",
    con: "Con",
    int: "Int",
    wis: "Wis",
    cha: "Cha",
}
const StatLikes = {
    str: `${Stats.str}Like`,
    dex: `${Stats.dex}Like`,
    con: `${Stats.con}Like`,
    int: `${Stats.int}Like`,
    wis: `${Stats.wis}Like`,
    cha: `${Stats.cha}Like`,
}
const StatRaces = {
    str: `${Stats.str}Race`,
    dex: `${Stats.dex}Race`,
    con: `${Stats.con}Race`,
    int: `${Stats.int}Race`,
    wis: `${Stats.wis}Race`,
    cha: `${Stats.cha}Race`,
}
const StatTotals = {
    str: `${Stats.str}Total`,
    dex: `${Stats.dex}Total`,
    con: `${Stats.con}Total`,
    int: `${Stats.int}Total`,
    wis: `${Stats.wis}Total`,
    cha: `${Stats.cha}Total`,
}
const StatMods = {
    str: `${Stats.str}Mod`,
    dex: `${Stats.dex}Mod`,
    con: `${Stats.con}Mod`,
    int: `${Stats.int}Mod`,
    wis: `${Stats.wis}Mod`,
    cha: `${Stats.cha}Mod`,
}

/**
 * Checks if provided stat values are valid and forbids submit if not.
 * */
function checkStatsChoiceValid() {
    let choices = [];

    for (stat in Stats) {
        let choiceId = Stats[stat];
        let totalId = StatTotals[stat];
        let raceId = StatRaces[stat];
        let modId = StatMods[stat];

        let choice = document.getElementById(choiceId).value;

        let raceBonus = parseInt(document.getElementById(raceId).innerText || 0);

        let total = parseInt(choice || 10) + raceBonus;
        let mod = formatMod(getMod(total));

        document.getElementById(totalId).innerText = total;
        document.getElementById(modId).innerText = mod;

        choices.push(choice);
    }

    let values = choices.sort((a, b) => a - b).reverse().toString();
    let stats = document.getElementById('Stats').innerText;
    allPresent = (values === stats);

    document.getElementById('FormSubmit').disabled = !allPresent;
    document.getElementById('UniqueWarn').hidden = allPresent;
}
/**
 * Generates a new set of stats and replaces "Stats" Html 
 * element and all stat's selects options with new values.
 * */
function resetStats() {
    let stats = getFineStats();
    document.getElementById("Stats").innerText = stats.toString();

    replaceSelectOptions("Str", stats)
    replaceSelectOptions("Dex", stats)
    replaceSelectOptions("Con", stats)
    replaceSelectOptions("Int", stats)
    replaceSelectOptions("Wis", stats)
    replaceSelectOptions("Cha", stats)

    document.getElementById('FormSubmit').disabled = true;
    document.getElementById('UniqueWarn').hidden = false;
}
/**
 * Sets options for select specified by id.
 * @param {string} id
 * @param {string[]} options
 */
function replaceSelectOptions(id, options) {
    let select = document.getElementById(id);

    select.innerHTML = "";

    let dummyOption = document.createElement('option');
    dummyOption.disabled = true;
    dummyOption.selected = true;
    dummyOption.hidden = true;
    dummyOption.value = "";
    dummyOption.innerHTML = "---";
    select.appendChild(dummyOption);

    for (let i = 0; i < options.length; i++) {
        let option = document.createElement('option');
        let value = options[i];

        option.value = value;
        option.innerHTML = `${i + 1}) ${value}`;
        select.appendChild(option);
    }
}

//RECOMMENDATIONS
//---CLASS PREFERRED STATS
/**
 * Gets selected class and displays stats that are preferrable for it.
 * */
function showCurrentClassPreferredStats() {
    clearClassPreferredStats();

    let selectedClass = document.getElementById("Class").value;
    let bestStats = getBestStatsIds(selectedClass);

    for (let i = 0; i < bestStats.length; i++) {
        document.getElementById(bestStats[i]).innerText = "👍";
    }
}
/**
 * Removed any class preferred stat marks.
 * */
function clearClassPreferredStats() {
    for (let prop in StatLikes) {
        document.getElementById(StatLikes[prop]).innerText = "";
    }
}
/**
 * Gets ids of Html div's that correspond to preffered stats for specified class.
 * @param {string} className The class that is being checked.
 */
function getBestStatsIds(className) {
    var str = StatLikes.str;
    var dex = StatLikes.dex;
    var con = StatLikes.con;
    var int = StatLikes.int;
    var wis = StatLikes.wis;
    var cha = StatLikes.cha;
    switch (className) {
        case "🎓Алхимик":
            return [int, dex];
        case "🪕Бард":
            return [cha, dex];
        case "😡Варвар":
            return [str, con];
        case "⚔️Воин":
            return [str, con];
        case "📚Волшебник":
            return [int, dex];
        case "🍀Друид":
            return [wis, dex];
        case "📜Жрец":
            return [wis, cha];
        case "☄️Кинетик":
            return [dex, con];
        case "🧘Монах":
            return [dex, str];
        case "🛡Паладин":
            return [cha, str];
        case "🗡Плут":
            return [dex, wis];
        case "🦅Рейнджер":
            return [dex, wis];
        default:
            return [];
    }
}
//---RACE BONUSES
/**
 * Sets race bonus value to the chosen for human
 * */
function processHumanRaceBonus() {
    clearRaceBonuses();
    let id = document.getElementById('HumanRaceBonusSelect').value;

    document.getElementById(id).innerHTML = '<span style="color:lime">+2</span>';
    checkStatsChoiceValid();
}
/**
 * Gets selected race and displays which stats it affects and how.
 * */
function showCurrentRaceBonuses() {
    clearRaceBonuses();

    let race = document.getElementById('Race').value;

    if (race === '🧑Человек') {
        document.getElementById('HumanRaceBonusSelect').hidden = false;
        return;
    }
    else {
        document.getElementById('HumanRaceBonusSelect').hidden = true; 
    }
    let affectedStats = getRaceStatsIds(race);

    let add = '<span style="color:forestgreen">+2</span>';
    let sub = '<span style="color:red">-2</span>';

    document.getElementById(affectedStats[0]).innerHTML = add;
    document.getElementById(affectedStats[1]).innerHTML = add;
    document.getElementById(affectedStats[2]).innerHTML = sub;

    checkStatsChoiceValid();
}
/**
 * Removed any race bonus marks.
 * */
function clearRaceBonuses() {
    for (let prop in StatRaces) {
        document.getElementById(StatRaces[prop]).innerText = "";
    }
}
/**
 * Gets ids of Html div's that correspond to changed stats for specified race.
 * First 2 are highered and last is lowered. Humans and invalid values get an empty array.
 * @param {string} className The class that is being checked.
 */
function getRaceStatsIds(raceName) {
    var str = StatRaces.str;
    var dex = StatRaces.dex;
    var con = StatRaces.con;
    var int = StatRaces.int;
    var wis = StatRaces.wis;
    var cha = StatRaces.cha;
    switch (raceName) {
        case "🧝Эльф":
            return [dex, int, con];
        case "🧔Дварф":
            return [con, wis, cha];
        case "🦊Кицуне":
            return [dex, cha, str];
        case "♉Минас":
            return [str, con, int];
        case "🦎Серпент":
            return [con, int, wis];
        default:
            return [];
    }
}

//STATS GEN
/**
 * Gets an array of 6 filtered random-based stats. They are confirmed to be high enough
 * and are ordered by descending.
 * */
function getFineStats() {
    while (true) {
        let rawStats = getRawStats();

        if (Math.max(...rawStats) < 14) continue;

        let modSum = rawStats.reduce((s, e) => s + getMod(e), 0)

        if (modSum < 4) continue;

        return rawStats.sort((a, b) => a - b).reverse();
    }
}
/**
 * Gets an array of 6 unfiltered random-based stats.
 * */
function getRawStats() {
    return [getStat(), getStat(), getStat(), getStat(), getStat(), getStat()];
}
/**
 * Gets random-based stat that is in range 3..18 but is expected to be high in general.
 * */
function getStat() {
    let throws = [getd6(), getd6(), getd6(), getd6()];
    
    let sum = throws.reduce((s, e) => s + e, 0);
    let min = Math.min(...throws);

    return sum - min;
}
/**
 * Gets random integer in range 1..6.
 * */
function getd6() {
    return Math.floor(Math.random() * 6) + 1;
}
/**
 * Gets a modifier of a provided stat.
 * @param {number} stat
 * A stat. It is expected to be in range 1..
 */
function getMod(stat) {
    return Math.floor(stat / 2 - 5);
}

function formatMod(mod) {
    return mod < 0 ? mod.toString() : `+${mod}`;
}
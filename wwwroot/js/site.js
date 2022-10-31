// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var str = "StrLike";
var dex = "DexLike";
var con = "ConLike";
var int = "IntLike";
var wis = "WisLike";
var cha = "ChaLike";

/**
 * Gets selected class and displays stats that are preferrable for it.
 * */
function showBestStats() {
    let selectedClass = document.getElementById("Class").value;
    let bestStats = getBestStatsIds(selectedClass);
    

    document.getElementById(str).innerText = "";
    document.getElementById(dex).innerText = "";
    document.getElementById(con).innerText = "";
    document.getElementById(int).innerText = "";
    document.getElementById(wis).innerText = "";
    document.getElementById(cha).innerText = "";

    for (let i = 0; i < bestStats.length; i++) {
        document.getElementById(bestStats[i]).innerText = "👍";
    }
}

/**
 * Sets options for select specified by id.
 * @param {string} id
 * @param {string[]} options
 */
function replaceSelectOptions(id, options) {
    let select = document.getElementById(id);

    select.innerHTML = "";
    for (let i = 0; i < options.length; i++) {
        let option = document.createElement('option');
        let value = options[i];

        option.value = value;
        option.innerHTML = value;
        select.appendChild(option);
    }
    select.value = "---";
}

/**
 * Generates a new set of stats and replaces "Stats" Html 
 * element and all stat's selects options with new values.
 * */
function resetStats() {
    let stats = getFineStats();
    setStatSelects(stats);
}

/**
 * Sets all stat's selets options to a provided value.
 * @param {string[]} stats
 */
function setStatSelects(stats) {
    document.getElementById("Stats").innerText = stats.toString();

    replaceSelectOptions("Str", stats)
    replaceSelectOptions("Dex", stats)
    replaceSelectOptions("Con", stats)
    replaceSelectOptions("Int", stats)
    replaceSelectOptions("Wis", stats)
    replaceSelectOptions("Cha", stats)
}

/**
 * Gets ids of Html div's that correspond to preffered stats for specified class.
 * @param {string} className The class that is being checked.
 */
function getBestStatsIds(className) {
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
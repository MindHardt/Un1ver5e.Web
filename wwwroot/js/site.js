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
        rawStats.sort();
        rawStats.reverse();

        if (rawStats[5] < 14) continue;

        let modSum = 0;
        for (let i = 0; i < 6; i++) {
            modSum += getMod(rawStats[i]);
        }

        if (modSum < 3) continue;
        return rawStats;
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
    throws.sort();
    return throws[1] + throws[2] + throws[3];
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
    return stat / 2 - 5;
}
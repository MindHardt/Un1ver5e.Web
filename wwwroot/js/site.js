// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var str = "StrLike";
var dex = "DexLike";
var con = "ConLike";
var int = "IntLike";
var wis = "WisLike";
var cha = "ChaLike";

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

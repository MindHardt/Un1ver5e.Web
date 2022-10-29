// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const allStats = [str, dex, con, int, wis, cha];
const str = "StrLike";
const dex = "DexLike";
const con = "ConLike";
const int = "IntLike";
const wis = "WisLike";
const cha = "ChaLike";

function showBestStats() {
    let selectedClass = document.getElementById("Class").value;
    let bestStats = getBestStatsIds(selectedClass);
    alert("test");

    for (let i = 0; i < allStats.length; i++) {
        document.getElementById(allStats[i]).innerText = "";
    }
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

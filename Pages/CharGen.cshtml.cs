﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Text;

namespace Un1ver5e.ru.Pages
{
    public class CharGenModel : PageModel
    {
        [BindProperty]
        public string? Name { get; set; }
        [BindProperty]
        public string? Race { get; set; }
        [BindProperty]
        public string? Class { get; set; }
        [BindProperty]
        public string? Gender { get; set; }
        [BindProperty]
        public string? Alignment { get; set; }

        [BindProperty]
        public int? Strength { get; set; }
        [BindProperty]
        public int? Dexterity { get; set; }
        [BindProperty]
        public int? Constitution { get; set; }
        [BindProperty]
        public int? Intelligence { get; set; }
        [BindProperty]
        public int? Wisdom { get; set; }
        [BindProperty]
        public int? Charisma { get; set; }

        public Guid SessionGuid { get; set; } = Guid.NewGuid();

        public IActionResult OnPost()
        {
            SessionGuid = Guid.NewGuid();
            if (Request.Form["action"] == "🔄")
            {
                return RedirectToPage();
            }
            if (Request.Form["action"] == "Автоматически")
            {
                AutoGenerateStats();
                return RedirectToPage();
            }    

            StringBuilder svg = new(_rawSvg);

            svg.Replace("%NAME%", Name);
            svg.Replace("%RACE%", Race);
            svg.Replace("%CLASS%", Class);
            svg.Replace("%GENDER%", Gender);
            svg.Replace("%ALIGNMENT%", Alignment);
            //💪
            svg.Replace("%STR%", Strength?.ToString() ?? "10");
            svg.Replace("%STRM%", FormatMod(Strength ?? 10));
            //🏃‍
            svg.Replace("%DEX%", Dexterity?.ToString() ?? "10");
            svg.Replace("%DEXM%", FormatMod(Dexterity ?? 10));
            //🩸
            svg.Replace("%CON%", Constitution?.ToString() ?? "10");
            svg.Replace("%CONM%", FormatMod(Constitution ?? 10));
            //🧠
            svg.Replace("%INT%", Intelligence?.ToString() ?? "10");
            svg.Replace("%INTM%", FormatMod(Intelligence ?? 10));
            //🦉
            svg.Replace("%WIS%", Wisdom?.ToString() ?? "10");
            svg.Replace("%WISM%", FormatMod(Wisdom ?? 10));
            //👄
            svg.Replace("%CHA%", Charisma?.ToString() ?? "10");
            svg.Replace("%CHAM%", FormatMod(Charisma ?? 10));

            Stream result = new MemoryStream(Encoding.UTF8.GetBytes(svg.ToString()));

            return Request.Form["action"] == "Сохранить" ?
                File(result, "application/octet-stream", $"{Name}.svg") :   //Download
                File(result, "image/svg+xml");                              //Display
            
        }

        public SelectList Races => new(_races);
        private readonly static string[] _races =
        {
            "🧑Человек",
            "🧝Эльф",
            "🧔Дварф",
            "🦊Кицуне",
            "♉Минас",
            "🦎Серпент"
        };

        public SelectList Classes => new(_classes);
        private readonly static string[] _classes =
        {
            "🎓Алхимик",
            "🪕Бард",
            "😡Варвар",
            "⚔️Воин",
            "📚Волшебник",
            "🍀Друид",
            "📜Жрец",
            "☄️Кинетик",
            //"👹Колдун",
            "🧘Монах",
            "🛡Паладин",
            "🗡Плут",
            "🦅Рейнджер",
        };

        public SelectList Genders => new(_genders);
        private readonly static string[] _genders =
        {
            "♂️Мужской", "♀️Женский"
        };

        public SelectList Alignments => new(_alignments);
        private readonly static string[] _alignments =
        {
            "[LG] Законно-добрый",
            "[NG] Нейтрально-добрый",
            "[CG] Хаотично-добрый",
            "[LN] Законно-нейтральный",
            "[N] Нейтральный",
            "[CN] Хаотично-нейтральный",
            "[LE] Законно-злой",
            "[NE] Нейтрально-злой",
            "[CE] Хаотично-злой",
        };

        public SelectList Stats => new(_currentStats);
        private readonly int[] _currentStats = GetRandomStats();
        private static int[] GetRandomStats()
        {
            int[] rawResults = new int[6];

            for (int s = 0; s < 6; s++)
            {
                Random rnd = Random.Shared;
                int[] throws = { rnd.Next(1, 7), rnd.Next(1, 7), rnd.Next(1, 7), rnd.Next(1, 7) };

                rawResults[s] = throws.Sum() - throws.Min();
            }
            if (rawResults.Select(s => GetMod(s)).Sum() < 3 || rawResults.Max() < 14) 
                return GetRandomStats(); //Filter out low results, their chances are not really high

            Array.Sort(rawResults);
            Array.Reverse(rawResults);
            return rawResults;
        }
        private static int GetMod(int stat) => stat / 2 - 5;
        private static string FormatMod(int stat) 
            => GetMod(stat) > -1 ? 
            $"+{GetMod(stat)}" :
            GetMod(stat).ToString();
        
        private void AutoGenerateStats()
        {
            int?[] statsPriority = GetStatsPriorityArray();

            for (int i = 0; i < statsPriority.Length; i++)
            {
                statsPriority[i] = _currentStats[i];
            }
        }

        private int?[] GetStatsPriorityArray() => Class switch
        {
            "🎓Алхимик"
            => new int?[] { Intelligence, Dexterity, Wisdom, Constitution, Strength, Charisma },

            "🪕Бард"
            => new int?[] { Charisma, Dexterity, Wisdom, Intelligence, Strength, Constitution },

            "😡Варвар"
            => new int?[] { Strength, Constitution, Dexterity, Wisdom, Charisma, Intelligence },

            "⚔️Воин"
            => new int?[] { Strength, Constitution, Dexterity, Intelligence, Wisdom, Charisma },

            "📚Волшебник"
            => new int?[] { Intelligence, Dexterity, Constitution, Wisdom, Charisma, Strength },

            "🍀Друид"
            => new int?[] { Wisdom, Dexterity, Constitution, Intelligence, Charisma, Strength },

            "📜Жрец"
            => new int?[] { Wisdom, Charisma, Constitution, Strength, Dexterity, Intelligence },

            "☄️Кинетик"
            => new int?[] { Dexterity, Constitution, Wisdom, Strength, Intelligence, Charisma },

            //"👹Колдун" 
            //=> new int?[] { },

            "🧘Монах"
            => new int?[] { Dexterity, Strength, Wisdom, Constitution, Charisma, Intelligence },

            "🛡Паладин"
            => new int?[] { Charisma, Strength, Constitution, Wisdom, Dexterity, Intelligence },

            "🗡Плут"
            => new int?[] { Dexterity, Wisdom, Intelligence, Strength, Constitution, Charisma },

            "🦅Рейнджер"
            => new int?[] { Dexterity, Wisdom, Strength, Constitution, Intelligence, Charisma },

            _ => throw new ArgumentNullException("Выберите класс чтобы распределить статы.")
        };

        private readonly static string _rawSvg = System.IO.File.ReadAllText("wwwroot/Files/RawChar.svg");
    }
}

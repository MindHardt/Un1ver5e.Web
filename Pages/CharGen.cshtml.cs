using Microsoft.AspNetCore.Mvc;
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
        public int? StrTotal { get; set; }
        [BindProperty]
        public int? DexTotal { get; set; }
        [BindProperty]
        public int? ConTotal { get; set; }
        [BindProperty]
        public int? IntTotal { get; set; }
        [BindProperty]
        public int? WisTotal { get; set; }
        [BindProperty]
        public int? ChaTotal { get; set; }

        public IActionResult OnPost()
        {
            return File(PrepareSvgFile(), "application/octet-stream", $"{Name ?? "template"}.svg");
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

        public SelectList HumanRaceBonuses => new(_humanRaceBonuses, "Value", "Text");
        private readonly static SelectListItem[] _humanRaceBonuses =
        {
            new("💪", "StrRace"),
            new("🏃‍", "DexRace"),
            new("🩸", "ConRace"),
            new("🧠", "IntRace"),
            new("🦉", "WisRace"),
            new("👄", "ChaRace"),
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

        private static int GetMod(int stat) => stat / 2 - 5;
        private static string FormatMod(int stat) 
            => GetMod(stat) > -1 ? 
            $"+{GetMod(stat)}" :
            GetMod(stat).ToString();
        
        private Stream PrepareSvgFile()
        {
            StringBuilder svg = new(_rawSvg);

            svg.Replace("%NAME%", Name);
            svg.Replace("%RACE%", Race);
            svg.Replace("%CLASS%", Class);
            svg.Replace("%GENDER%", Gender);
            svg.Replace("%ALIGNMENT%", Alignment);
            //💪
            int str = StrTotal ?? 10;
            svg.Replace("%STR%", str.ToString());
            svg.Replace("%STRM%", FormatMod(str));
            //🏃‍
            int dex = DexTotal ?? 10;
            svg.Replace("%DEX%", dex.ToString());
            svg.Replace("%DEXM%", FormatMod(dex));
            //🩸
            int @con = ConTotal ?? 10;
            svg.Replace("%CON%", con.ToString());
            svg.Replace("%CONM%", FormatMod(con));
            //🧠
            int @int = IntTotal ?? 10;
            svg.Replace("%INT%", @int.ToString());
            svg.Replace("%INTM%", FormatMod(@int));
            //🦉
            int wis = WisTotal ?? 10;
            svg.Replace("%WIS%", wis.ToString());
            svg.Replace("%WISM%", FormatMod(wis));
            //👄
            int cha = ChaTotal ?? 10;
            svg.Replace("%CHA%", cha.ToString());
            svg.Replace("%CHAM%", FormatMod(cha));

            return new MemoryStream(Encoding.UTF8.GetBytes(svg.ToString()));
        }

        private readonly static string _rawSvg = System.IO.File.ReadAllText("wwwroot/Files/RawChar.svg");
    }
}

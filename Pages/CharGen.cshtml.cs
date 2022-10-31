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
        public int? Str { get; set; }
        [BindProperty]
        public int? Dex { get; set; }
        [BindProperty]
        public int? Con { get; set; }
        [BindProperty]
        public int? Int { get; set; }
        [BindProperty]
        public int? Wis { get; set; }
        [BindProperty]
        public int? Cha { get; set; }

        public IActionResult OnPost()
        {
            return Request.Form["action"].ToString() switch
            {
                "💾" => File(PrepareSvgFile(), "application/octet-stream", $"{Name ?? "template"}.svg"),
                "👀" => File(PrepareSvgFile(), "image/svg+xml"),

                _ => RedirectToPage()
            };
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
            svg.Replace("%STR%", Str?.ToString() ?? "10");
            svg.Replace("%STRM%", FormatMod(Str ?? 10));
            //🏃‍
            svg.Replace("%DEX%", Dex?.ToString() ?? "10");
            svg.Replace("%DEXM%", FormatMod(Dex ?? 10));
            //🩸
            svg.Replace("%CON%", Con?.ToString() ?? "10");
            svg.Replace("%CONM%", FormatMod(Con ?? 10));
            //🧠
            svg.Replace("%INT%", Int?.ToString() ?? "10");
            svg.Replace("%INTM%", FormatMod(Int ?? 10));
            //🦉
            svg.Replace("%WIS%", Wis?.ToString() ?? "10");
            svg.Replace("%WISM%", FormatMod(Wis ?? 10));
            //👄
            svg.Replace("%CHA%", Cha?.ToString() ?? "10");
            svg.Replace("%CHAM%", FormatMod(Cha ?? 10));

            return new MemoryStream(Encoding.UTF8.GetBytes(svg.ToString()));
        }

        private readonly static string _rawSvg = System.IO.File.ReadAllText("wwwroot/Files/RawChar.svg");
    }
}

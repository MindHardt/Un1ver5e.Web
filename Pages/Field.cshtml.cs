using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Un1ver5e.ru.Pages
{
    public class FieldModel : PageModel
    {
        public readonly static List<SelectListItem> Maps = Directory.EnumerateFiles("./wwwroot/Files/").Select(f =>
        {
            return new SelectListItem()
            {
                Text = f,
                Value = f,
            };
        }).ToList();

        [BindProperty]
        public string SelectedMap { get; set; } = Maps[0].Value;
        public void OnGet()
        {

        }

        public void OnPost()
        {

        }


    }
}

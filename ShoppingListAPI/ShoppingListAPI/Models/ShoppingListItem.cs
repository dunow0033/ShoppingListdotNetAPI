using System.ComponentModel;

namespace ShoppingListAPI.Models
{
    public class ShoppingListItem
    {
        public int Id { get; set; }
        public string ItemName { get; set; }

        [DefaultValue(false)]
        public bool IsPickedUp { get; set; }
    }
}

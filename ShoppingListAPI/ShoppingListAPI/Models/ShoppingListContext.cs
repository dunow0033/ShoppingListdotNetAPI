using Microsoft.EntityFrameworkCore;

namespace ShoppingListAPI.Models;

public class ShoppingListContext : DbContext
{
    public ShoppingListContext(DbContextOptions<ShoppingListContext> options) : base(options)
    {
        
    }

    public DbSet<ShoppingListItem> ShoppingListItems { get; set; }
}

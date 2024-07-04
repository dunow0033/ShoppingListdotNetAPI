using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingListAPI.Models;

namespace ShoppingListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingListController : ControllerBase
    {
        private readonly ShoppingListContext _context;

        public ShoppingListController(ShoppingListContext context)
        {
            _context = context;
        }

        // GET: api/ShoppingList
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShoppingListItem>>> GetShoppingListItems()
        {
            return await _context.ShoppingListItems.ToListAsync();
        }

        // GET: api/ShoppingList/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<ShoppingListItem>> GetShoppingListItem(int id)
        //{
        //    var shoppingListItem = await _context.ShoppingListItems.FindAsync(id);

        //    if (shoppingListItem == null)
        //    {
        //        return NotFound();
        //    }

        //    return shoppingListItem;
        //}

        //// PUT: api/ShoppingList/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutShoppingListItem(int id, ShoppingListItem shoppingListItem)
        //{
        //    if (id != shoppingListItem.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(shoppingListItem).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ShoppingListItemExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        [HttpPatch("{id}")]
        public async Task<IActionResult> TogglePickedUp(int id, bool isPickedUp)
        {
            var shoppingListItem = await _context.FindAsync<ShoppingListItem>(id);

            if (shoppingListItem == null)
            {
                return NoContent();
            }

            shoppingListItem.IsPickedUp = isPickedUp;
            _context.Entry(shoppingListItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetShoppingListItems", new { id = shoppingListItem.Id }, shoppingListItem);
            }
            catch(DbUpdateConcurrencyException) 
            {
                if(!ShoppingListItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        private bool ShoppingListItemExists(int id)
        {
            return _context.ShoppingListItems.Any(e => e.Id == id);
        }

        //// POST: api/ShoppingList
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ShoppingListItem>> PostShoppingListItem(ShoppingListItem shoppingListItem)
        {
            _context.ShoppingListItems.Add(shoppingListItem);
            await _context.SaveChangesAsync();

            return StatusCode(200);
        }

        // DELETE: api/ShoppingList/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShoppingListItem(int id)
        {
            var shoppingListItem = await _context.ShoppingListItems.FindAsync(id);
            if (shoppingListItem == null)
            {
                return NotFound();
            }

            _context.ShoppingListItems.Remove(shoppingListItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

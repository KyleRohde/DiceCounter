using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend_dice_counter.Models;

namespace backend_dice_counter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiceItemsController : ControllerBase
    {
        private readonly DiceContext _context;

        public DiceItemsController(DiceContext context)
        {
            _context = context;
        }

        // GET: api/DiceItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DiceItem>>> GetDiceItems()
        {
            return await _context.DiceItems.ToListAsync();
        }

        // GET: api/DiceItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DiceItem>> GetDiceItem(long id)
        {
            var diceItem = await _context.DiceItems.FindAsync(id);

            if (diceItem == null)
            {
                return NotFound();
            }

            return diceItem;
        }

        // PUT: api/DiceItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDiceItem(long id, DiceItem diceItem)
        {
            if (id != diceItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(diceItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiceItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DiceItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DiceItem>> PostDiceItem(DiceItem diceItem)
        {
            _context.DiceItems.Add(diceItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDiceItem), new { id = diceItem.Id }, diceItem);
        }

        // DELETE: api/DiceItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DiceItem>> DeleteDiceItem(long id)
        {
            var diceItem = await _context.DiceItems.FindAsync(id);
            if (diceItem == null)
            {
                return NotFound();
            }

            _context.DiceItems.Remove(diceItem);
            await _context.SaveChangesAsync();

            return diceItem;
        }

        private bool DiceItemExists(long id)
        {
            return _context.DiceItems.Any(e => e.Id == id);
        }
    }
}

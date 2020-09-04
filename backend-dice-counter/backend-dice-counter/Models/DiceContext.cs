using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend_dice_counter.Models
{
    public class DiceContext : DbContext
    {
        public DiceContext(DbContextOptions<DiceContext> options) : base(options) { }

        public DbSet<DiceItem> DiceItems { get; set; }
    }
}

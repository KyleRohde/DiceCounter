using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend_dice_counter.Models
{
    public class DiceItem
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public byte Faces { get; set; }
        public string RollHistory { get; set; }
    }
}

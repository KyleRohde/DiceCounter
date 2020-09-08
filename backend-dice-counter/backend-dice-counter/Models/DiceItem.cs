using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend_dice_counter.Models
{
    [Table("Dice")]
    public class DiceItem
    {
        public long Id { get; set; }
        [StringLength(60, ErrorMessage = "Description can be up to 60 characters")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Number of dice faces required")]
        public byte Faces { get; set; }
        public string Roll_History { get; set; }
    }
}

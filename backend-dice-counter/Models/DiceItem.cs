using System;

namespace backend_dice_counter
{
    public class DiceItem
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public int Faces { get; set; }

        public string RollHistory { get; set; }
    }
}
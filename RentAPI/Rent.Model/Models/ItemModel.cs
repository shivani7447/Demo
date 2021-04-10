using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rent.Model.Models
{
    


    public class ItemModel
    {
        public ItemModel()
        {
            Data = new Item();
        }
        public bool Status { get; set; }
        public string Message { get; set; }
        public Item Data { get; set; }
    }
    public class ItemList
    {
        public ItemList()
        {
            Data = new List<Item>();
        }
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<Item> Data { get; set; }
    }
}

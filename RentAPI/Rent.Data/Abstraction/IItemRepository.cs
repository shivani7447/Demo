using Rent.Model;
using Rent.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rent.Data.Abstraction
{
  

    public interface IItemRepository
    {
        ItemModel Post(Item item);
        ItemModel Put(Item item, int id);
        ItemModel Get(int id);
        ItemModel Delete(int id);
        ItemList GetAll();
        ItemList GetItems(int areaId);
    }
}

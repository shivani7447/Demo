using Rent.Model;
using Rent.Model.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Rent.Service.Abstraction
{
    

    public interface IItemService
    {
        ItemModel Post(Item item);
        ItemModel Put(Item item, int id);
        ItemModel Get(int id);
        ItemModel Delete(int id);
        ItemList GetAll();
        ItemList GetItems(int areaId);

    }
}

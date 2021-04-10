using Rent.Data.Abstraction;
using Rent.Model;
using Rent.Model.Models;
using Rent.Service.Abstraction;
using System;
using System.Collections.Generic;
using System.Text;


namespace Rent.Service
{
   

    public class ItemService : IItemService
    {
        IItemRepository _itemRepository;
        public ItemService(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }
        public ItemModel Post(Item item)
        {
            return _itemRepository.Post(item);
        }
        public ItemModel Put(Item item, int id)
        {
            return _itemRepository.Put(item, id);
        }
        public ItemModel Get(int id)
        {
            return _itemRepository.Get(id);
        }
        public ItemModel Delete(int id)
        {
            return _itemRepository.Delete(id);
        }
        public ItemList GetAll()
        {
            return _itemRepository.GetAll();
        }
        public ItemList GetItems(int areaId)
        {
            return _itemRepository.GetItems(areaId);
        }

    }
}

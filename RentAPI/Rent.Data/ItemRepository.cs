using Rent.Data.Abstraction;
using Rent.Data.DB;
using Rent.Model;
using Rent.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rent.Data
{


    public class ItemRepository : IItemRepository
    {
        private RentDBContext rentContext;
        public ItemRepository(RentDBContext db)
        {
            rentContext = db;
        }
        public ItemModel Post(Item item)
        {
            ItemModel statusResponse = new ItemModel();

            item.IsActive = true;
            item.CreatedOn = DateTime.Now;
            rentContext.item.Add(item);
            rentContext.SaveChanges();
            statusResponse.Status = true; statusResponse.Message = "Item Registered successful";


            return statusResponse;
        }
        public ItemModel Put(Item item, int id)
        {
            ItemModel statusResponse = new ItemModel();

            var result = rentContext.item.Where(x => x.Id == id).FirstOrDefault();
            result.ApprovalNo = item.ApprovalNo;
            result.AreaId = item.AreaId;
            result.ArticleName = item.ArticleName;
            result.CpNo = item.CpNo;
            result.Date = item.Date;
            result.Quantity = item.Quantity;
            result.Remarks = item.Remarks;
            result.SpNo = item.SpNo;
            rentContext.SaveChanges();
            statusResponse.Status = true; statusResponse.Message = "Item updated successful";


            return statusResponse;
        }
        public ItemModel Get(int id)
        {
            ItemModel statusResponse = new ItemModel();
            var data = rentContext.item.Where(x => x.Id == id).FirstOrDefault();
            if (data != null)
            {
                statusResponse.Status = true; statusResponse.Message = "Item details"; statusResponse.Data = data;
            }
            else
            {
                statusResponse.Status = false; statusResponse.Message = "Item details not found";
            }

            return statusResponse;
        }
        public ItemModel Delete(int id)
        {
            ItemModel statusResponse = new ItemModel();
            var data = rentContext.item.Where(x => x.Id == id).FirstOrDefault();
            if (data != null)
            {
                rentContext.item.Remove(data);
                rentContext.SaveChanges();
                statusResponse.Status = true; statusResponse.Message = "Item deleted";
            }
            else
            {
                statusResponse.Status = false; statusResponse.Message = "Item details not found";
            }

            return statusResponse;
        }
        public ItemList GetAll()
        {
            ItemList statusResponse = new ItemList();
            var data = rentContext.item.OrderByDescending(x => x.CreatedOn).ToList();
            if (data.Count > 0)
            {
                statusResponse.Status = true; statusResponse.Message = "Item list"; statusResponse.Data = data;
            }
            else
            {
                statusResponse.Status = false; statusResponse.Message = "Item not found";
            }

            return statusResponse;
        }


        public ItemList GetItems(int areaId)
        {
            ItemList statusResponse = new ItemList();
            var data = rentContext.item.Where(x=>x.AreaId==areaId).OrderByDescending(x => x.CreatedOn).ToList();
            if (data.Count > 0)
            {
                statusResponse.Status = true; statusResponse.Message = "Item list"; statusResponse.Data = data;
            }
            else
            {
                statusResponse.Status = false; statusResponse.Message = "Item not found";
            }

            return statusResponse;
        }

    }
}

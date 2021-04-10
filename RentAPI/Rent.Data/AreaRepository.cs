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
     
    public class AreaRepository : IAreaRepository
    {
        private RentDBContext rentContext;
        public AreaRepository(RentDBContext db)
        {
            rentContext = db;
        }
        public AreaModel Post(Area area)
        {
            AreaModel statusResponse = new AreaModel();
            var data = rentContext.area.Where(x => x.Name == area.Name).FirstOrDefault();
            if (data != null)
            {
                statusResponse.Status = false; statusResponse.Message = "Area name already exists";
            }

            if (data == null)
            {
                area.IsActive = true;
                area.CreatedOn = DateTime.Now;
                rentContext.area.Add(area);
                rentContext.SaveChanges();
                statusResponse.Status = true; statusResponse.Message = "Area Registered successful";
            }

            return statusResponse;
        }
        public AreaModel Put(Area area, int id)
        {
            AreaModel statusResponse = new AreaModel();
            var data = rentContext.area.Where(x => x.Name == area.Name  && x.Id != id).FirstOrDefault();
            if (data != null)
            {
                statusResponse.Status = false; statusResponse.Message = "Area name already exists";
            }

            if (data == null)
            {
                var result = rentContext.area.Where(x => x.Id == id).FirstOrDefault();
                result.Name = area.Name;
                rentContext.SaveChanges();
                statusResponse.Status = true; statusResponse.Message = "Area updated successful";
            }

            return statusResponse;
        }
        public AreaModel Get(int id)
        {
            AreaModel statusResponse = new AreaModel();
            var data = rentContext.area.Where(x => x.Id == id).FirstOrDefault();
            if (data != null)
            {
                statusResponse.Status = true; statusResponse.Message = "Area details"; statusResponse.Data = data;
            }
            else
            {
                statusResponse.Status = false; statusResponse.Message = "Area details not found";
            }

            return statusResponse;
        }
        public AreaModel Delete(int id)
        {
            AreaModel statusResponse = new AreaModel();
            var data = rentContext.area.Where(x => x.Id == id).FirstOrDefault();
            if (data != null)
            {
                rentContext.area.Remove(data);
                rentContext.SaveChanges();
                statusResponse.Status = true; statusResponse.Message = "Area deleted";
            }
            else
            {
                statusResponse.Status = false; statusResponse.Message = "Area details not found";
            }

            return statusResponse;
        }
        public AreaList GetAll()
        {
            AreaList statusResponse = new AreaList();
            var data = rentContext.area.OrderByDescending(x => x.CreatedOn).ToList();
            if (data.Count > 0)
            {
                statusResponse.Status = true; statusResponse.Message = "Area list"; statusResponse.Data = data;
            }
            else
            {
                statusResponse.Status = false; statusResponse.Message = "Area not found";
            }

            return statusResponse;
        }



    }
}

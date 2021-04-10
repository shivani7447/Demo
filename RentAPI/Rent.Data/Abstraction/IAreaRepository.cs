using Rent.Model;
using Rent.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rent.Data.Abstraction
{
    
    public interface IAreaRepository
    {
        AreaModel Post(Area area);
        AreaModel Put(Area area, int id);
        AreaModel Get(int id);
        AreaModel Delete(int id);
        AreaList GetAll();
    }
}

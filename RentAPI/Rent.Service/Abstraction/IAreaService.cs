using Rent.Model;
using Rent.Model.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Rent.Service.Abstraction
{
    
    public interface IAreaService
    {
        AreaModel Post(Area area);
        AreaModel Put(Area area, int id);
        AreaModel Get(int id);
        AreaModel Delete(int id);
        AreaList GetAll();

    }
}

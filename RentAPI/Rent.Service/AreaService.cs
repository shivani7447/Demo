using Rent.Data.Abstraction;
using Rent.Model;
using Rent.Model.Models;
using Rent.Service.Abstraction;
using System;
using System.Collections.Generic;
using System.Text;

namespace Rent.Service
{
    
    public class AreaService : IAreaService
    {
        IAreaRepository _areaRepository;
        public AreaService(IAreaRepository areaRepository)
        {
            _areaRepository = areaRepository;
        }
        public AreaModel Post(Area area)
        {
            return _areaRepository.Post(area);
        }
        public AreaModel Put(Area area, int id)
        {
            return _areaRepository.Put(area, id);
        }
        public AreaModel Get(int id)
        {
            return _areaRepository.Get(id);
        }
        public AreaModel Delete(int id)
        {
            return _areaRepository.Delete(id);
        }
        public AreaList GetAll()
        {
            return _areaRepository.GetAll();
        }


    }
}

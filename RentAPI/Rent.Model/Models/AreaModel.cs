using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rent.Model.Models
{
    

    public class AreaModel
    {
        public AreaModel()
        {
            Data = new Area();
        }
        public bool Status { get; set; }
        public string Message { get; set; }
        public Area Data { get; set; }
    }
    public class AreaList
    {
        public AreaList()
        {
            Data = new List<Area>();
        }
        public bool Status { get; set; }
        public string Message { get; set; }
        public List<Area> Data { get; set; }
    }
}

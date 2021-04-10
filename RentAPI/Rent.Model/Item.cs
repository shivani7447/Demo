using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rent.Model
{
   public class Item
    {
        public int Id { get; set; }
        public int AreaId { get; set; }
        public string ArticleName { get; set; }
        public string Quantity { get; set; }
        public string ApprovalNo { get; set; }
        public DateTime Date { get; set; }
        public string CpNo { get; set; }
        public string SpNo { get; set; }
        public string Remarks { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rent.Model.Models
{
   public class AccountModel
    {
        public AccountModel()
        {
            Data = new Users();
        }
        public bool Status { get; set; }
        public string Message { get; set; }
        public Users Data { get; set; }
    }
}

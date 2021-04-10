using Rent.Model;
using Rent.Model.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Rent.Service.Abstraction
{
    public interface IAccountService
    {
       
        AccountModel Register(Users users);
        AccountModel Login(Users users);

        
    }
}

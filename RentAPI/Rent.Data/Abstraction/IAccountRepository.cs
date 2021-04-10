using Rent.Model;
using Rent.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rent.Data.Abstraction
{
    public interface IAccountRepository
    {
        AccountModel Register(Users users);
        AccountModel Login(Users users);
    }
}

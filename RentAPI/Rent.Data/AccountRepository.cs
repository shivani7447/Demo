using Rent.Data.Abstraction;
using Rent.Data.DB;
using Rent.Data.Helper;
using Rent.Model;
using Rent.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rent.Data
{
    public class AccountRepository : IAccountRepository
    {
        private RentDBContext rentContext;
        public AccountRepository(RentDBContext db)
        {
            rentContext = db;
        }
       
        public AccountModel Register(Users users)
        {
            AccountModel statusResponse = new AccountModel();
            var phone = rentContext.users.Where(x => x.Phone == users.Phone).FirstOrDefault();
            if (phone != null)
            {
                statusResponse.Status = false; statusResponse.Message = "Phone already exists";
            }
            var email = rentContext.users.Where(x => x.Email == users.Email).FirstOrDefault();
            if (email != null)
            {
                statusResponse.Status = false; statusResponse.Message = "Email already exists";
            }
            if (phone == null && email == null)
            {
                users.IsActive = true;
                users.CreatedOn = DateTime.Now;
                users.Password = EncryptPassword.EncodePasswordToBase64(users.Password);
                rentContext.users.Add(users);
                rentContext.SaveChanges();
                statusResponse.Status = true; statusResponse.Message = "Registration successful"; statusResponse.Data = users;
            }

            return statusResponse;
        }

        public AccountModel Login(Users users)
        {
            AccountModel statusResponse = new AccountModel();
            users.Password = EncryptPassword.EncodePasswordToBase64(users.Password);
            var result = rentContext.users.Where(x => x.Email == users.Email && x.Password == users.Password).FirstOrDefault();
            if (result != null)
            {
                statusResponse.Status = true; statusResponse.Message = "Login successful"; statusResponse.Data = result;
            }
            else
            {
                statusResponse.Status = false; statusResponse.Message = "Invalid credentials";
            }

            return statusResponse;
        }

       
    }
}

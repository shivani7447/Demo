using Rent.Data.Abstraction;
using Rent.Model;
using Rent.Model.Models;
using Rent.Service.Abstraction;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Rent.Service
{
    public class AccountService : IAccountService
    {
        IAccountRepository _accountRepository;
        public AccountService(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }
       
        public AccountModel Register(Users users)
        {
            return _accountRepository.Register(users);
        }
        public AccountModel Login(Users users)
        {
            return _accountRepository.Login(users);
        }
        
    }
}

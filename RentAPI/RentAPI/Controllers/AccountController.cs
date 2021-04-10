using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rent.Model;
using Rent.Model.Models;
using Rent.Service.Abstraction;
using RentAPI.Models;

namespace RentAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

       

        [HttpPost]
        [Route("register")]
        public IActionResult Register(Users users)
        {
            try
            {
                var response = _accountService.Register(users);
                if (response.Status)
                {
                    return Ok(new ApiResponse<Users>()
                    {
                        Status = response.Status,
                        Message = response.Message,
                        Data = response.Data
                    });
                }
                else
                {
                    return Ok(new ApiResponse<Users>()
                    {
                        Status = response.Status,
                        Message = response.Message,
                    });
                }
               
            }
            catch (Exception ex)
            {
                return BadRequest(new { Success = false, Message = ex.Message });
            }
        }
       
        [HttpPost]
        [Route("login")]
        public IActionResult Login(Users users)
        {
            try
            {
                var response = _accountService.Login(users);
                if (response.Status)
                {
                    return Ok(new ApiResponse<Users>()
                    {
                        Status = response.Status,
                        Message = response.Message,
                        Data = response.Data
                    });
                }
                else
                {
                    return Ok(new ApiResponse<Users>()
                    {
                        Status = response.Status,
                        Message = response.Message,
                    });
                }

            }
            catch (Exception ex)
            {
                return BadRequest(new { Success = false, Message = ex.Message });
            }
        }


       
    }
}
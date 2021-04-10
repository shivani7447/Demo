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
    public class ItemsController : ControllerBase
    {
        private IItemService _itemService;

        public ItemsController(IItemService itemService)
        {
            _itemService = itemService;
        }


        [HttpPost]
        public IActionResult Post(Item item)
        {
            try
            {
                var response = _itemService.Post(item);
                if (response.Status)
                {
                    return Ok(new ApiResponse<Item>()
                    {
                        Status = response.Status,
                        Message = response.Message,
                    });
                }
                else
                {
                    return Ok(new ApiResponse<Item>()
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

        [HttpPut]
        [Route("{id}")]
        public IActionResult Put(Item item, int id)
        {
            try
            {
                var response = _itemService.Put(item, id);
                if (response.Status)
                {
                    return Ok(new ApiResponse<Item>()
                    {
                        Status = response.Status,
                        Message = response.Message,
                    });
                }
                else
                {
                    return Ok(new ApiResponse<Item>()
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

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var response = _itemService.Get(id);
                if (response.Status)
                {
                    return Ok(new ApiResponse<Item>()
                    {
                        Status = response.Status,
                        Message = response.Message,
                        Data = response.Data
                    });
                }
                else
                {
                    return Ok(new ApiResponse<Item>()
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

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var response = _itemService.Delete(id);
                if (response.Status)
                {
                    return Ok(new ApiResponse<Item>()
                    {
                        Status = response.Status,
                        Message = response.Message,
                    });
                }
                else
                {
                    return Ok(new ApiResponse<Item>()
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

        [HttpGet]
        [Route("getAll")]
        public IActionResult GetAll()
        {
            try
            {
                var response = _itemService.GetAll();
                if (response.Status)
                {
                    return Ok(new ApiResponse<IEnumerable<Item>>()
                    {
                        Status = response.Status,
                        Message = response.Message,
                        Data = response.Data
                    });
                }
                else
                {
                    return Ok(new ApiResponse<Item>()
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

        [HttpGet]
        [Route("getItem/{areaId}")]
        public IActionResult GetItems(int areaId)
        {
            try
            {
                var response = _itemService.GetItems(areaId);
                if (response.Status)
                {
                    return Ok(new ApiResponse<IEnumerable<Item>>()
                    {
                        Status = response.Status,
                        Message = response.Message,
                        Data = response.Data
                    });
                }
                else
                {
                    return Ok(new ApiResponse<Item>()
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

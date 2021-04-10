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
    public class AreasController : ControllerBase
    {
        private IAreaService _areaService;

        public AreasController(IAreaService areaService)
        {
            _areaService = areaService;
        }


        [HttpPost]
        public IActionResult Post(Area area)
        {
            try
            {
                var response = _areaService.Post(area);
                if (response.Status)
                {
                    return Ok(new ApiResponse<Area>()
                    {
                        Status = response.Status,
                        Message = response.Message,
                    });
                }
                else
                {
                    return Ok(new ApiResponse<Area>()
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
        public IActionResult Put(Area area, int id)
        {
            try
            {
                var response = _areaService.Put(area, id);
                if (response.Status)
                {
                    return Ok(new ApiResponse<Area>()
                    {
                        Status = response.Status,
                        Message = response.Message,
                    });
                }
                else
                {
                    return Ok(new ApiResponse<Area>()
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
                var response = _areaService.Get(id);
                if (response.Status)
                {
                    return Ok(new ApiResponse<Area>()
                    {
                        Status = response.Status,
                        Message = response.Message,
                        Data = response.Data
                    });
                }
                else
                {
                    return Ok(new ApiResponse<Area>()
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
                var response = _areaService.Delete(id);
                if (response.Status)
                {
                    return Ok(new ApiResponse<Area>()
                    {
                        Status = response.Status,
                        Message = response.Message,
                    });
                }
                else
                {
                    return Ok(new ApiResponse<Area>()
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
                var response = _areaService.GetAll();
                if (response.Status)
                {
                    return Ok(new ApiResponse<IEnumerable<Area>>()
                    {
                        Status = response.Status,
                        Message = response.Message,
                        Data = response.Data
                    });
                }
                else
                {
                    return Ok(new ApiResponse<Area>()
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

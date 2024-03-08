
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

using ReactApp2.Server.Models;
using ReactApp2.Server.Respository;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;

namespace ReactApp2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvisorController : ControllerBase
    {
        private readonly AdvisorDataAccess _dataAccess;

        public AdvisorController(AdvisorDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        //Working
        [HttpPost("Experience")]
        public ActionResult InsertAdvisorExp([FromBody] AdvisorExp advisorExp)
        {
            try
            {
                // Retrieve the advisor id from the session
                int advisorId = HttpContext.Session.GetInt32("AdvisorID").Value;

                _dataAccess.InsertAdvisorExp(advisorId, advisorExp.Qualifications, advisorExp.ExperienceYears);
                return Ok();
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        //Working
        [HttpPost("AssignCustomer/{customerId}")]
        public ActionResult AssignAdvisorToCustomer(int customerId)
        {
            try
            {
                // Retrieve the advisor id from the session
                int advisorId = HttpContext.Session.GetInt32("AdvisorID").Value;

                _dataAccess.AssignAdvisorToCustomer(advisorId, customerId);
                return Ok();
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        //Working
        [HttpGet("Customers")]
        public ActionResult<List<Portfolio>> GetCustomersByAdvisor()
        {
            try
            {
                int advisorId = HttpContext.Session.GetInt32("AdvisorID").Value;
                var portfolios = _dataAccess.GetCustomersByAdvisor(advisorId);
                return Ok(portfolios);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        //Working
        [HttpPost("UpdatePlan/{customerId}")]
        public ActionResult UpdateAdvisorPlan(int customerId, [FromBody] AdvisorPlan plan)
        {
            try
            {
                _dataAccess.UpdateAdvisorPlan(customerId, plan);
                return Ok();
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        //Working
        [HttpGet("AvailableAssets")]
        public ActionResult<List<Market>> GetAvailableAssets()
        {
            try
            {
                var assets = _dataAccess.GetAvailableAssets();
                return Ok(assets);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        //Working
        [HttpPost("AddInvestments")]
        public ActionResult AddInvestments([FromBody] List<int> assetIds)
        {
            try
            {
                // Retrieve the advisor id from the session
                int advisorId = HttpContext.Session.GetInt32("AdvisorID").Value;

                _dataAccess.AddInvestments(advisorId, assetIds);
                return Ok();
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Advisor> GetAdvisor(int id)
        {
            // TODO: Implement this method
            return NotFound();
        }

       


    }
}

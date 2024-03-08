
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

using ReactApp2.Server.Models;
using ReactApp2.Server.Respository;
using System.Security.Claims;

namespace ReactApp2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly CustomerDataAccess _dataAccess;

        public ClientController(CustomerDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        //Working
        [HttpPost("{id}/RiskType")]
        public ActionResult UpdateRiskType(int id, [FromBody] string riskType)
        {
            try
            {
                _dataAccess.UpdateRiskType(id, riskType);
                return Ok();
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        //Working
        [HttpGet]
        public ActionResult<List<Customer>> GetAllClients()
        {
            try
            {
                var customers = _dataAccess.GetAllClients();
                return Ok(customers);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        //Working
        [HttpGet("{id}/AdvisorPlan")]
        public ActionResult<AdvisorPlan> GetAdvisorPlanByCustomer(int id)
        {
            try
            {
                var advisorPlan = _dataAccess.GetAdvisorPlanByCustomer(id);
                return Ok(advisorPlan);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        //Working
        [HttpPost("{id}/AdvisorPlanApproval")]
        public ActionResult UpdateAdvisorPlanApproval(int id, [FromBody] int approval)
        {
            try
            {
                _dataAccess.UpdateAdvisorPlanApproval(id, approval);
                return Ok();
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        //Working
        [HttpGet("Investments")]
        public ActionResult<List<Investment>> GetInvestmentsByCustomer()
        {
            try
            {
                // Retrieve the customer id from the session
                int customerId = HttpContext.Session.GetInt32("ClientID").Value;

                var investments = _dataAccess.GetInvestmentsByCustomer(customerId);
                return Ok(investments);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }


    }
}

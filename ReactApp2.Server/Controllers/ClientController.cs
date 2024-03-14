
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

        [HttpGet("Customers")]
        public ActionResult<List<Portfolio>> GetCustomersByCustomerID()
       {
            try
            {
                int customerId = HttpContext.Session.GetInt32("ClientID").Value;
                var portfolios = _dataAccess.GetCustomersByCustomerID(customerId);
                return Ok(portfolios);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        //Working
        [HttpPost("RiskType")]
        public ActionResult UpdateRiskType([FromBody] RiskResultModel RiskResult)
        {
            try
            {
                int customerId = HttpContext.Session.GetInt32("ClientID").Value;
                _dataAccess.UpdateRiskType(customerId, RiskResult);
                return Ok(new { message = "Risk type updated successfully" });
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

        [HttpGet("AdvisorPlan")]
        public ActionResult<List<AdvisorPlan>> GetAdvisorPlanByCustomer()
        {
            try
            {
                int customerId = HttpContext.Session.GetInt32("ClientID").Value;
                var advisorPlans = _dataAccess.GetAdvisorPlanByCustomer(customerId);
                return Ok(advisorPlans);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        //Working
        [HttpPost("AdvisorPlanApproval")]
        public ActionResult UpdateAdvisorPlanApproval([FromBody] int approval)
        {
            try
            {
                int customerId = HttpContext.Session.GetInt32("ClientID").Value;
                _dataAccess.UpdateAdvisorPlanApproval(customerId, approval);
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
        public ActionResult<List<InvestmentDetail>> GetInvestmentsByCustomer()
        {
            try
            {
                // Retrieve the customer id from the session
                int customerId = HttpContext.Session.GetInt32("ClientID").Value;

                var investmentDetail = _dataAccess.GetInvestmentsByCustomer(customerId);
                return Ok(investmentDetail);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("ClientInfo")]
        public ActionResult<User> GetClientInfo()
        {
            try
            {
                int customerId = HttpContext.Session.GetInt32("ClientID").Value;
                var clientInfo = _dataAccess.GetClientInfo(customerId);
                return Ok(clientInfo);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

    }
}

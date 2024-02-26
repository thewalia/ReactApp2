
using Microsoft.AspNetCore.Mvc;

using ReactApp2.Server.Models;
using ReactApp2.Server.Respository;

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

        [HttpPost("Register")]
        public ActionResult Register(Advisor advisor)
        {
            // TODO: Add validation here

            _dataAccess.RegisterAdvisor(advisor);

            return CreatedAtAction(nameof(GetAdvisor), new { id = advisor.AdvisorId }, advisor);
        }

        [HttpGet("{id}")]
        public ActionResult<Advisor> GetAdvisor(int id)
        {
            // TODO: Implement this method
            return NotFound();
        }

        // Login method
        [HttpPost("Login")]
        public ActionResult Login(Advisor advisor)
        {
            var dbAdvisor = _dataAccess.ValidateAdvisor(advisor);

            if (dbAdvisor == null)
            {
                return Unauthorized();
            }

            return Ok();
        }
    }
}

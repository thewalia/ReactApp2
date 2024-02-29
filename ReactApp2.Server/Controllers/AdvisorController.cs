
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

        [HttpPost("Register")]
        public ActionResult Register(Advisor advisor)
        {
            // TODO: Add validation here

            _dataAccess.RegisterAdvisor(advisor);

            return CreatedAtAction(nameof(GetAdvisor), new { id = advisor.AdvisorID }, advisor);
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

            // Store the username in the session
            HttpContext.Session.SetInt32("AdvisorID", dbAdvisor.AdvisorID);

            return Ok();
        }

        [HttpGet("LoginWithGoogle")]
        public IActionResult LoginWithGoogle()
        {
            var properties = new AuthenticationProperties { RedirectUri = Url.Action("GoogleResponse") };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("GoogleResponse")]
        public async Task<IActionResult> GoogleResponse()
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            if (result?.Succeeded != true)
            {
                return BadRequest();
            }

            // Extract the user's email from the claims
            var email = result.Principal.FindFirstValue(ClaimTypes.Email);

            // Look up the advisor in your database
            var advisor = _dataAccess.GetAdvisorByEmail(email);

            // If the advisor doesn't exist, create a new advisor
            if (advisor == null)
            {
                advisor = new Advisor { Email = email, Password = "333" };
                _dataAccess.RegisterAdvisor(advisor);
            }

            advisor = _dataAccess.GetAdvisorByEmail(email);
            // Store the advisor's username in the session
            HttpContext.Session.SetInt32("AdvisorID", advisor.AdvisorID);

            return Ok("Google authentication successful with Advisor ID: " + advisor.AdvisorID + " " + email);
        }


    }
}


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

        [HttpPost("Register")]
        public ActionResult Register(Customer client)
        {
            // TODO: Add validation here

            _dataAccess.RegisterClient(client);

            return CreatedAtAction(nameof(GetClient), new { id = client.CustomerID }, client);
        }

        [HttpGet("{id}")]
        public ActionResult<Customer> GetClient(int id)
        {
            // TODO: Implement this method
            return NotFound();
        }

        // Login method
        [HttpPost("Login")]
        public ActionResult Login(Customer client)
        {
            var dbClient = _dataAccess.ValidateClient(client);

            if (dbClient == null)
            {
                return Unauthorized();
            }

            HttpContext.Session.SetInt32("ClientID", dbClient.CustomerID);

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
            var client = _dataAccess.GetClientByEmail(email);

            // If the advisor doesn't exist, create a new advisor
            if (client == null)
            {
                client = new Customer { Email = email, Password = "333" };
                _dataAccess.RegisterClient(client);
            }

            client = _dataAccess.GetClientByEmail(email);

            // Store the advisor's username in the session
            HttpContext.Session.SetInt32("CustomerID", client.CustomerID);

            return Ok("Google authentication successful with Customer ID: " + client.CustomerID + " " + email);
        }
    }
}

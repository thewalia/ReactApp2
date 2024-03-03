using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactApp2.Server.Models;
using ReactApp2.Server.Respository;
using System.Net;
using System.Security.Claims;

namespace ReactApp2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly CustomerDataAccess _customerDataAccess;
        private readonly AdvisorDataAccess _advisorDataAccess;

        public AuthenticationController(CustomerDataAccess customerDataAccess, AdvisorDataAccess advisorDataAccess)
        {
            _customerDataAccess = customerDataAccess;
            _advisorDataAccess = advisorDataAccess;
        }

        [HttpPost("Register/{userType}")]
        public ActionResult Register(string userType, User user)
        {
            // TODO: Add validation here

            if (userType.ToLower() == "client")
            {
                var client = new Customer { LastName=user.LastName, FirstName=user.FirstName ,Email = user.Email, Password = user.Password };
                _customerDataAccess.RegisterClient(client);
                return CreatedAtAction(nameof(Register), new { id = client.CustomerID }, client);
            }
            else if (userType.ToLower() == "advisor")
            {
                var advisor = new Advisor { LastName = user.LastName, FirstName = user.FirstName, Email = user.Email, Password = user.Password };
                _advisorDataAccess.RegisterAdvisor(advisor);
                return CreatedAtAction(nameof(Register), new { id = advisor.AdvisorID }, advisor);
            }

            return BadRequest("Invalid user type");
        }

        // TODO: Implement GetClient and GetAdvisor methods

        [HttpPost("Login/{userType}")]
        public ActionResult Login(string userType, User user)
        {
            if (userType.ToLower() == "client")
            {
                var client = new Customer { Email = user.Email, Password = user.Password };
                var dbClient = _customerDataAccess.ValidateClient(client);

                if (dbClient == null)
                {
                    return Unauthorized();
                }

                HttpContext.Session.SetInt32("ClientID", dbClient.CustomerID);
                return Ok(new { id = dbClient.CustomerID });
            }
            else if (userType.ToLower() == "advisor")
            {
                var advisor = new Advisor { Email = user.Email, Password = user.Password };
                var dbAdvisor = _advisorDataAccess.ValidateAdvisor(advisor);

                if (dbAdvisor == null)
                {
                    return Unauthorized();
                }

                HttpContext.Session.SetInt32("AdvisorID", dbAdvisor.AdvisorID);
                return Ok(new { id = dbAdvisor.AdvisorID });
            }
            else
            {
                return BadRequest("Invalid user type");
            }

            return Ok();
        }

        [HttpGet("LoginWithGoogle/{userType}")]
        public IActionResult LoginWithGoogle(string userType)
        {
            if (userType.ToLower() != "client" && userType.ToLower() != "advisor")
            {
                return BadRequest("Invalid user type");
            }

            var properties = new AuthenticationProperties { RedirectUri = Url.Action("GoogleResponse", new { userType = userType }) };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("GoogleResponse")]
        public async Task<IActionResult> GoogleResponse(string userType)
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            if (result?.Succeeded != true)
            {
                return BadRequest();
            }

            // Extract the user's email from the claims
            var email = result.Principal.FindFirstValue(ClaimTypes.Email);

            if (userType.ToLower() == "client")
            {
                // Look up the client in your database
                var client = _customerDataAccess.GetClientByEmail(email);

                // If the client doesn't exist, create a new client
                if (client == null)
                {
                    client = new Customer { Email = email, Password = "333" };
                    _customerDataAccess.RegisterClient(client);
                }

                client = _customerDataAccess.GetClientByEmail(email);

                // Store the client's username in the session
                HttpContext.Session.SetInt32("CustomerID", client.CustomerID);

                return Ok("Google authentication successful with Customer ID: " + client.CustomerID + " " + email);
            }
            else if (userType.ToLower() == "advisor")
            {
                // Look up the advisor in your database
                var advisor = _advisorDataAccess.GetAdvisorByEmail(email);

                // If the advisor doesn't exist, create a new advisor
                if (advisor == null)
                {
                    advisor = new Advisor { Email = email, Password = "333" };
                    _advisorDataAccess.RegisterAdvisor(advisor);
                }

                advisor = _advisorDataAccess.GetAdvisorByEmail(email);

                // Store the advisor's username in the session
                HttpContext.Session.SetInt32("AdvisorID", advisor.AdvisorID);

                return Ok("Google authentication successful with Advisor ID: " + advisor.AdvisorID + " " + email);
            }
            else
            {
                return BadRequest("Invalid user type");
            }
        }

        [HttpDelete("DeleteUser/{userType}/{id}")]
        public ActionResult Delete(string userType, int id)
        {
            if (userType.ToLower() == "advisor")
            {
                _advisorDataAccess.DeleteAdvisor(id);
                HttpContext.Session.Clear();
                return NoContent();
            }
            else if (userType.ToLower() == "client")
            {
                _customerDataAccess.DeleteCustomer(id);
                HttpContext.Session.Clear();
                return NoContent();
            }
            else
            {
                return BadRequest("Invalid user type");
            }
        }

    }
}

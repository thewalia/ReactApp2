using Microsoft.AspNetCore.Mvc;

namespace ReactApp2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionTestingController : ControllerBase
    {
        [HttpGet("get-session")]
        public IActionResult GetSession()
        {
            var sessionValue = HttpContext.Session.GetString("username");
            if (sessionValue == null)
            {
                return NotFound("No session found");
            }

            return Ok($"Session value: {sessionValue}");
        }
    }
}


using Microsoft.AspNetCore.Mvc;

using ReactApp2.Server.Models;
using ReactApp2.Server.Respository;

namespace ReactApp2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ClientDataAccess _dataAccess;

        public ClientController(ClientDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        [HttpPost("register")]
        public ActionResult Register(Client client)
        {
            // TODO: Add validation here

            _dataAccess.RegisterClient(client);

            return CreatedAtAction(nameof(GetClient), new { id = client.ClientId }, client);
        }

        [HttpGet("{id}")]
        public ActionResult<Client> GetClient(int id)
        {
            // TODO: Implement this method
            return NotFound();
        }

        // Login method
        [HttpPost("login")]
        public ActionResult Login(Client client)
        {
            var dbClient = _dataAccess.ValidateClient(client);

            if (dbClient == null)
            {
                return Unauthorized();
            }

            return Ok();
        }
    }
}

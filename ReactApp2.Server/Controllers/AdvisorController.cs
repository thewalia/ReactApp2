using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactApp2.Server.Data;
using ReactApp2.Server.Models;

namespace ReactApp2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvisorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdvisorController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Advisor>> Register(Advisor advisor)
        {
            // TODO: Add validation here

            _context.Advisors.Add(advisor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAdvisor), new { id = advisor.Id }, advisor);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Advisor>> GetAdvisor(int id)
        {
            var advisor = await _context.Advisors.FindAsync(id);

            if (advisor == null)
            {
                return NotFound();
            }

            return advisor;
        }

        // TODO: Add a login method
    }
}

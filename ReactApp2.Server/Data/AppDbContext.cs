

using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Models;

namespace ReactApp2.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Advisor> Advisors { get; set; }
        public DbSet<Client> Clients { get; set; }
    }
}

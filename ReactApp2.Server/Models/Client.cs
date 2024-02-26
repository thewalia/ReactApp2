using System.ComponentModel.DataAnnotations;

namespace ReactApp2.Server.Models
{
    public class Client
    {
        public int ClientId { get; set; }

        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}

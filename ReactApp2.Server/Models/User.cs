using System.ComponentModel.DataAnnotations;

namespace ReactApp2.Server.Models
{
    public class User
    {
        public User()
        {
            FirstName = string.Empty;
            LastName = string.Empty;
            UserType = string.Empty;
    }

        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string UserType { get; set; }
    }
}

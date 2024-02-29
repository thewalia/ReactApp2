using System.ComponentModel.DataAnnotations;

namespace ReactApp2.Server.Models
{
    public class Advisor
    {
        public Advisor()
        {
            // Set default values
            Qualifications = string.Empty;
            FirstName = string.Empty;
            LastName = string.Empty;
        }

        public int AdvisorID { get; set; }
        public int ExperienceYears { get; set; }
        public string Qualifications { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}

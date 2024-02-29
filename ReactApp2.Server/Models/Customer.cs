using System.ComponentModel.DataAnnotations;

namespace ReactApp2.Server.Models
{
    public class Customer
    {

        public Customer() {
        
            RiskTolerance = string.Empty;
            FirstName = string.Empty;
            LastName = string.Empty;
        }
        public int CustomerID { get; set; }
        public string RiskTolerance { get; set; }
        public decimal NetWorth { get; set; }
        public decimal InvestingAmount { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}

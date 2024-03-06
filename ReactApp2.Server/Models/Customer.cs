using System.ComponentModel.DataAnnotations;

namespace ReactApp2.Server.Models
{
    public class Customer
    {

        public int CustomerID { get; set; }

        public int UserID { get; set; }

        public string RiskType { get; set; } 

    }
}

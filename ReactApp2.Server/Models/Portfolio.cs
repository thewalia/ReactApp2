namespace ReactApp2.Server.Models
{
    public class Portfolio
    {
        public int PortfolioID { get; set; }
        public int CustomerID { get; set; }
        public int AdvisorID { get; set; }
        public string PortfolioName { get; set; }
        public string RiskType { get; set;}
        public int CurrentValue { get; set; }

        public int TotalInvestedValue { get; set; }

    }
}

namespace ReactApp2.Server.Models
{
    public class Investment
    {
        public int InvestmentId { get; set; }
        public int PortfolioId { get; set; }
        public int AssetId { get; set; }
        public int PurchasePrice { get; set; }
        public int Quantity { get; set; }
    }
}

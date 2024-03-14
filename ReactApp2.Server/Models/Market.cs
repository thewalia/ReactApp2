namespace ReactApp2.Server.Models
{

    public class Market
    {
        public int AssetId { get; set; }
        public string AssetType { get; set; }
        public string Symbol { get; set; }
        public string Name { get; set; }
        public double CurrentPrice { get; set; }
    }

}

using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using ReactApp2.Server.Models;
using ReactApp2.Server.Respository;
using System.Collections.Generic;
using Hangfire;

[Route("api/[controller]")]
[ApiController]
public class MarketController : ControllerBase
{
    private readonly string _apiUrl = "https://financialmodelingprep.com/api/v3/symbol/NSE?apikey=YgD04G0Ddqkn7ykjptpggnMaZgxuXhc3";
    private readonly HttpClient _httpClient;
    private readonly AdvisorDataAccess _dataAccess;

    // Modify the constructor like this
    private readonly IBackgroundJobClient _backgroundJobClient;
    public MarketController(AdvisorDataAccess dataAccess, IBackgroundJobClient backgroundJobClient)
    {
        _httpClient = new HttpClient();
        _dataAccess = dataAccess;
        _backgroundJobClient = backgroundJobClient;
    }

    // Modify the UpdateMarketData method like this
    [HttpGet("UpdateMarketData")]
    public ActionResult UpdateMarketData()
    {
        _backgroundJobClient.Enqueue(() => UpdateMarketDataJob());
        return Ok();
    }

    // Add this method to the controller
    [ApiExplorerSettings(IgnoreApi = true)]
    public async Task UpdateMarketDataJob()
    {
        HttpResponseMessage response = await _httpClient.GetAsync(_apiUrl);
        if (response.IsSuccessStatusCode)
        {
            var apiResponse = await response.Content.ReadAsStringAsync();
            var marketData = JsonSerializer.Deserialize<List<MarketIn>>(apiResponse);
            var limitedMarketData = marketData.Take(10).ToList(); // Take only first 10 items
            _dataAccess.UpdateMarketData(limitedMarketData);
        }
        else
        {
            throw new Exception("Error fetching data from API");
        }
    }

}

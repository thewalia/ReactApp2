
using Hangfire;
using Hangfire.SqlServer;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using ReactApp2.Server.Respository;


namespace ReactApp2.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            
            builder.Services.AddControllers();
            builder.Services.AddDistributedMemoryCache(); // Adds a default in-memory implementation of IDistributedCache
            builder.Services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(30); // You can set the timeout here
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("https://localhost:5173") // Replace with your React app's URL
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                });
            });


            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            // Register AdvisorDataAccess as a singleton
            builder.Services.AddSingleton(new AdvisorDataAccess(connectionString));
            builder.Services.AddSingleton(new CustomerDataAccess(connectionString));

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
            })
            .AddCookie()
            .AddGoogle(options =>
            {
                options.ClientId = "1024970798393-k1531gdt02tce8dp029hh1qdd2ka08bm.apps.googleusercontent.com";
                options.ClientSecret = "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";
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            var hangfireConnection = builder.Configuration.GetConnectionString("HangfireConnection");
            // Add this inside the Main method, after builder.Services.AddSwaggerGen();
            builder.Services.AddHangfire(configuration => configuration
                .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
                .UseSimpleAssemblyNameTypeSerializer()
                .UseRecommendedSerializerSettings()
                .UseSqlServerStorage(hangfireConnection, new SqlServerStorageOptions
                {
                    CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
                    SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
                    QueuePollInterval = TimeSpan.Zero,
                    UseRecommendedIsolationLevel = true,
                    DisableGlobalLocks = true
                })); // Use the same connection string as your application


            // Add authentication
            // Add Hangfire server
            builder.Services.AddHangfireServer();

            var app = builder.Build();
            // Add this inside the Main method, after var app = builder.Build();

            // Add this line to schedule the job every hour
            var recurringJobManager = app.Services.GetService<IRecurringJobManager>();
            recurringJobManager.AddOrUpdate<MarketController>("UpdateMarketDataJob", x => x.UpdateMarketDataJob(), Cron.Hourly);

            app.UseHangfireDashboard();
            app.UseSession();
            app.UseCors();
            app.UseAuthentication();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}

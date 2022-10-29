using Serilog;
using Un1ver5e.ru;

Host.CreateDefaultBuilder(args)
    .ConfigureAppConfiguration(config =>
    {
        config.AddJsonFile("appsettings.json");
    })
    .UseSerilog((ctx, logger) =>
    {
        logger.ReadFrom.Configuration(ctx.Configuration);
    })
    .ConfigureWebHostDefaults(webBuilder =>
    {
        webBuilder.UseStartup<Startup>();
    })
    .Build()
    .Run();
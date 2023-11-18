using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using TodoList.Services.Profiles;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddScoped<IUserRepository, UsersSqliteSevices>(); // For registering a scoped service for user-related database operations.
builder.Services.AddScoped<IAuthRepository, AuthServices>(); // For registering a scoped service for authentication-related operations.
builder.Services.AddScoped<ITodoRepository, TodosSqliteSevices>(); // For registering a scoped service for todo-related database operations.

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies()); // For configuring AutoMapper to automatically discover and register mappings.

builder.Services.AddControllersWithViews(); // To adding MVC services to the service collection.

// To configuring authentication with JWT Bearer authentication.
builder.Services.AddAuthentication(options => 
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    // To configuring JWT Bearer authentication parameters.
    o.TokenValidationParameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Auth:JwtSecretKey"])),
        ValidIssuer = builder.Configuration["Auth:Issuer"],
        ValidAudience = builder.Configuration["Auth:Audiance"]
    };
});

builder.Services.AddAuthorization(); // For adding authorization services.

// To adding JSON options for controllers to preserve references in JSON serialization.
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
});

// To configuring CORS policy.
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    // For allowing requests from any origin, with any method and any header.
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app cors
app.UseHttpsRedirection();

app.UseRouting(); // For configuring the application to use routing.

app.UseCors("corsapp"); // To applying CORS policy.

app.UseAuthentication(); // For configuring the application to use authentication.

app.UseAuthorization();

app.MapControllers();

app.Run();

using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TodoList.Models;


namespace TodoList.Services.Profiles
{
    public class AuthServices : IAuthRepository // For Implementation of IAuthRepository interface for handling authentication operations
    {
        public readonly IUserRepository _userService; // For initiate reference to the user service implementing IUserRepository
        public readonly IConfiguration _configuration; // For initiate reference to the configuration for accessing application settings.

        public AuthServices(IUserRepository userService, IConfiguration configuration) // Created constructor for AuthServices, injecting IUserRepository and IConfiguration
        {
            _userService = userService;
            _configuration = configuration;
        }

        public string CreateToken(User user) // Created and returned a JWT token based on the provided user information
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.FirstName +  " " + user.LastName),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is my custom Secret key for authentication Secret Key to genrate token")); // Created a symmetric security key based on a custom secret key.

            //_configuration.GetSection("Auth:JwtSecretKey").Value)

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature); // For retrieve issuer, audience, and secret key from application configuration.
            var token = new JwtSecurityToken(
               _configuration.GetSection("Auth:Issuer").Value,
               _configuration.GetSection("Auth:Audiance").Value,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(2),
                signingCredentials: cred
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token); // To generate the JWT token as a string.
            return jwt;
        } 

        public string GetAuthToken(string email, string pw) //To retrieves an authentication token for the provided email and password
        {
            User user = _userService.GetByCredentials(email, pw); // For retrieve user information based on provided credentials.
            if (user == null) // Check if user is  not found, return an empty string.
            {
                return string.Empty;
            }
            else //otherwise, return a JWT token.
            {
                return CreateToken(user);
            }
        }
    }
}

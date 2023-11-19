using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Security.Claims;
using TodoList.Models;
using TodoList.Services.Profiles;


namespace TodoList.Controllers
{
    [Route("api/users")] // To specifies this controller handles requests under the "api/users" route.
    [ApiController]
    public class UsersController : ControllerBase // For indicates that this class is an API controller.
    {
        private readonly IAuthRepository _authService; // For Reference to the authentication service implementing IAuthRepository.

        public UsersController(IAuthRepository authService) // Constructor for UsersController, injecting IAuthRepository.
        {
            _authService = authService;
        }

        [HttpGet] // HTTP GET method to retrieve an authentication token based on provided email and password.
        public IActionResult Get(string email, string pw)
        {
            try
            {
                string result = _authService.GetAuthToken(email, pw); // Invoke the authentication service to retrieve an authentication token.
                var tokenObject = new { token = result }; // Create an object with the token for the response.
                return Ok(tokenObject); // Return a successful response with the token.
            }
            catch (Exception ex)
            {
                return BadRequest("INVALIED_EMAIL_OR_PASSWORD\n" + ex.Message); // Return a bad request response with an error message in case of an exception.
            }

        }

        [HttpGet("{Email}")]
        public IActionResult GetName(string email) // To retrieves a specific user by login email
        {
            try
            {
                Claim? claimEmail = User?.FindFirst(ClaimTypes.Email); // To retrieve user email from the claims.
                if (claimEmail == null)
                {
                    return NotFound("User not found.");
                }
                string user = _authService.GetFullName(claimEmail.Value); // To get a specific user"s fullName for the authenticated user.
                var responseObject = new { user = user };
                return Ok(responseObject);

            }
            catch (Exception ex)
            {
                return BadRequest("Error occured.\n" + ex.Message);
            }


        }
    }
}

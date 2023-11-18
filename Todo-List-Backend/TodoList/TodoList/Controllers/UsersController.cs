using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using TodoList.Services.Profiles;


namespace TodoList.Controllers
{
    [Route("api/users")] // Specifies this controller handles requests under the "api/users" route.
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

    }
}

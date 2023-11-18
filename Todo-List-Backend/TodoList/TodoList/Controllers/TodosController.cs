using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using TodoList.Models;
using TodoList.Services.Profiles;
using TodoList.Services.ViewModels;

namespace TodoList.Controllers
{
    [Route("api/todos")] // To specifies this controller handles requests under the "api/todos" route.
    [ApiController]
    [Authorize] // To required authentication for accessing any action in this controller
    public class TodosController : ControllerBase
    {
        private IConfiguration _configuration;
        private ITodoRepository _todoService;
        public TodosController(IConfiguration configuration, ITodoRepository todoService) // Constructor to initialize the controller with services
        {
            _todoService = todoService;
            _configuration = configuration;
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetTodo(int id) // To retrieves a specific Todo by ID
        {
            try
            {
                Claim? claimEmail = User?.FindFirst(ClaimTypes.Email); // To retrieve user email from the claims.
                if (claimEmail == null)
                {
                    return NotFound("User not found.");
                }
                Todo? todo = _todoService.GetTodo(claimEmail.Value , id); // To get a specific Todo for the authenticated user.
                var responseObject = new { todo = todo };
                return Ok(responseObject);

            }
            catch (Exception ex)
            {
                return BadRequest("Error occured.\n" + ex.Message);
            }


        }
        [Route("")]
        [HttpGet]
        public IActionResult Get()  // To retrieves all Todos for the authenticated user.
        {
            try
            {
                Claim? claimEmail = User?.FindFirst(ClaimTypes.Email); // To retrieve user email from the claims
                if (claimEmail == null)
                {
                    return NotFound("User not found.");
                }
                List<Todo>? todos = _todoService.GetTodos(claimEmail.Value); // For get all Todos for the authenticated user.
                var responseObject = new { todos = todos };
                return Ok(responseObject);

            }
            catch (Exception ex)
            {
                return BadRequest("Error occured\n" + ex.Message);
            }


        }

        [HttpPost]
        public IActionResult Create(TodoDto todoDto) // To creates a new Todo for the authenticated user.
        {
            try
            {
                Claim? claimEmail = User?.FindFirst(ClaimTypes.Email); // To retrieve user email from the claims.
                if (claimEmail == null)
                {
                    return NotFound("User not found");
                }
                Todo? todo = _todoService.Create(claimEmail.Value, todoDto); // For create a new Todo for the authenticated user.
                return Ok(todo);
            }
            catch (Exception ex)
            {
                return BadRequest("Error occured.\n" + ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Update(int id , TodoDto todoDto) // For updates an existing Todo for the authenticated user.
        {
            try
            {
                Claim? claimEmail = User?.FindFirst(ClaimTypes.Email); // For retrieve user email from the claims
                if (claimEmail == null)
                {
                    return NotFound("User not found");
                }
                Todo? todo = _todoService.Update(id , todoDto); // To update an existing Todo for the authenticated user.
                return Ok(todo);
            }
            catch (Exception ex)
            {
                return BadRequest("Error occured.\n" + ex.Message);
            }
        }

        [HttpDelete]
        public IActionResult Delete(int id) // To deletes a Todo by ID for the authenticated user.
        {
            try
            {
                Claim? claimEmail = User?.FindFirst(ClaimTypes.Email); // To retrieve user email from the claims.
                if (claimEmail == null)
                {
                    return NotFound("User not found.");
                }
                Todo? todo = _todoService.Delete(id); // To delete a Todo by ID for the authenticated user.
                var responseObject = new { todo = todo };
                return Ok(responseObject);

            }
            catch (Exception ex)
            {
                return BadRequest("Error occured.\n" + ex.Message);
            }
        }
    }
}

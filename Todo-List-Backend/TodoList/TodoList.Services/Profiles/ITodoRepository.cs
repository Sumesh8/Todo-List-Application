using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoList.Models;
using TodoList.Services.ViewModels;

namespace TodoList.Services.Profiles
{
    public interface ITodoRepository
    {
        public Todo? Create(string userEmail, TodoDto toDoDto); // To creates a new Todo for the user with the specified email.
       
        public List<Todo>? GetTodos(string userEmail); // For retrieves a list of Todos for the user with the specified email
        
        public Todo? GetTodo(string userEmail, int todoId); // For retrieves a specific Todo for the user with the specified email and Todo ID
        //public string GetTodos(string userEmail);

        public Todo? Delete(int todoId); // For deletes a specific Todo for the user with the specified Todo ID

        public Todo? Update(int todoId, TodoDto toDoDto); // For updates a specific Todo for the user with the specified Todo ID.
    }
}

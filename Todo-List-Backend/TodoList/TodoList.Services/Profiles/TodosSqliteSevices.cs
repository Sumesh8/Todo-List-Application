using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoList.DataAccess;
using TodoList.Models;
using TodoList.Services.ViewModels;

namespace TodoList.Services.Profiles
{
    public class TodosSqliteSevices : ITodoRepository // For implementing the ITodoRepository interface
    {
        private TodoListDbContext _context = new TodoListDbContext(); // For initiate database context
        private IMapper _mapper;
        public TodosSqliteSevices(IMapper mapper) // Constructor to taking an IMapper dependency for object mapping
        {
            _mapper = mapper;
        }

        public List<Todo>? GetTodos(string userEmail) // To retrieves a list of Todos for a user with the specified email.
        {

            var user = _context.Users
                .Include(u => u.Todos)
                .SingleOrDefault(u => u.Email == userEmail);
            var todos = user?.Todos.ToList(); // To extracts the list of Todos for the user
            return todos; // To return the list of Todos for the user.
        }

        public Todo? GetTodo(string userEmail, int todoId) // For retrieves a specific Todo for a user with the specified email and TodoID.
        {

            var user = _context.Users
                .Include(u => u.Todos)
                .SingleOrDefault(u => u.Email == userEmail);
            if (user != null)
            {
                Todo? todo = user.Todos.FirstOrDefault(t => t.Id == todoId); // To finds the specific Todo for the user
                return todo; // For returns the specific Todo for the user
            }
            return null; // For return null object
        }

        public Todo? Create(string userEmail, TodoDto todoDto)  //  To creates a new Todo for a user with the specified email.
        {
            User? user = _context.Users.SingleOrDefault(u => u.Email == userEmail);
            Todo todo = _mapper.Map<Todo>(todoDto);

            user?.Todos.Add(todo); // For adds the new Todo to the user's Todos 
            _context.SaveChanges(); // For saves changes to the database
            return todo;
        }

        public Todo? Delete(int todoId) // To Deletes a specific Todo by ID
        {
            Todo todo = _context.Todos.First(todo => todo.Id == todoId);
            _context.Todos.Remove(todo); // To remove the Todo from the context 
            _context.SaveChanges(); // To saves changes to the database
            return todo;
        }

        public Todo? Update(int todoId, TodoDto todoDto) // To updates a specific Todo by ID with the provided TodoDto 
        {
            Todo? todoSelected = _context.Todos.SingleOrDefault(u => u.Id == todoId);
            //Todo todoToUpdate = _mapper.Map<Todo>(todoDto);

            //todoSelected?.Todos.Update(todoToUpdate);
            _mapper.Map(todoDto, todoSelected); // To maps the data from TodoDto to the existing Todo entity 
            _context.SaveChanges(); // To save changes to the database.
            return todoSelected;
        }
    }
}

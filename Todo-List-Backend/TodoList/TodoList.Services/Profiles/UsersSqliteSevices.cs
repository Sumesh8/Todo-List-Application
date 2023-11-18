using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoList.DataAccess;
using TodoList.Models;

namespace TodoList.Services.Profiles
{
    public class UsersSqliteSevices : IUserRepository // For implementation of the IUserRepository interface for database operations.
    {
        private readonly TodoListDbContext _context = new TodoListDbContext(); // For initiate database context.

        public User GetByCredentials(string email, string pw) // For retrieves a user based on provided email and password credentials.
        {
            return _context.Users.Where(user => user.Email.Equals(email) && user.Password.Equals(pw)).First(); // For cheack email and password validation.

        }

    }
}

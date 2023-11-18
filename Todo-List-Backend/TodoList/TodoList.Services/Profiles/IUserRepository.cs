using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoList.Models;

namespace TodoList.Services.Profiles
{
    public interface IUserRepository
    {
        public User GetByCredentials(string email, string pw); // For authontication validation.
    }
}

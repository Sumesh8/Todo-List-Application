using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoList.Models;

namespace TodoList.Services.Profiles
{
    public interface IAuthRepository
    {
        public string GetAuthToken(string email, string pw); // For return authuntication token

        public string CreateToken(User user); // For create token.

        public string GetFullName(string email); // For get user full name
    }
}

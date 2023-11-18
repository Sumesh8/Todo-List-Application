using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoList.Services.ViewModels
{
    public class UserAuthDto
    {
        public string Email { get; set; } // For initiate email for intract with the frontend
        public string Password { get; set; } // For initiate password for intract with the frontend
    }
}

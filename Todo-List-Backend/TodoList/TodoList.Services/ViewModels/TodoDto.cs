using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoList.Services.ViewModels
{
    public class TodoDto
    {
        public string Tittle { get; set; } // For Tittle email for intract with the frontend

        public string Description { get; set; } // For initiate Description for intract with the frontend

        public int Status { get; set; } // For Status email for intract with the frontend

    }
}

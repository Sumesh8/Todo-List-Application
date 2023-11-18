using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoList.Models
{
    public class User
    {
        [Key] // For Id assign to primary key
        [Required] // For assign email as not null
        [MaxLength(50)] // for assign max length to the Email
        public string Email { get; set; }
        [Required] // For assign FirstName as not null
        [MaxLength(30)] // for assign max length to the FirstName
        public string FirstName { get; set; } = string.Empty;
        [Required] // For assign LasttName as not null
        [MaxLength(30)] // for assign max length to the LastName
        public string LastName { get; set; } = string.Empty;
        [Required] // For assign Password as not null
        [MaxLength(12)] // for assign max length to the Password
        public string Password { get; set; } = string.Empty;

        public ICollection<Todo> Todos { get; } = new List<Todo>();
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace TodoList.Models
{
    public class Todo
    {
        [Key] // For Id assign to primary key
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // For Id assign to the auto increment
        public int Id { get; set; }
        [Required] // For Tittle FirstName as not null
        public string Tittle { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }
        public string UserEmail { get; set; }
        [JsonIgnore] // To ignored during JSON serialization.
        public User User { get; set; }

    }
}

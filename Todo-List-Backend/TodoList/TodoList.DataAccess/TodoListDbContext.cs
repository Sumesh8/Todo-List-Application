using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TodoList.Models;

namespace TodoList.DataAccess
{
    public class TodoListDbContext : DbContext // For representing the database context for TodoList application, derived from DbContext.
    {
        public DbSet<User> users { get; set; } // For representing the 'users' table in the database.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) // Configures the database connection and provider.
        {
            optionsBuilder.UseSqlite("Data Source = C:\\Users\\Sumesh\\Desktop\\Todo-List-Assignment\\Todo-List-Backend\\TodoList\\TodoList.DataAccess\\TodoListDb.db"); // Using SQLite as the database provider with the specified file path.
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) // Configures the model and initializes data when the database is created.
        {
            modelBuilder.Entity<User>().HasData(new User[]
            {
                new User { FirstName = "Sumesh" , LastName = "Akalanka" , Email = "kvsumeshakalanka@gmail.com" , Password = "123" },
                new User { FirstName = "Sudesh" , LastName = "Anuradha" , Email = "kvsudeshanuradha@gmail.com" , Password = "123"},
                new User { FirstName = "Megha" , LastName = "Thilini" , Email = "kvmeghathilini@gmail.com" , Password = "123"},
                new User { FirstName = "Medha" , LastName = "Thisari" , Email = "kvmedhathisari@gmail.com" , Password = "123"}
            }); // For seed initial user data into the 'users' table.

        }
    }
}

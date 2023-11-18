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
        public DbSet<User> Users { get; set; } // For representing the 'Users' table in the database.
        public DbSet<Todo> Todos { get; set; } // For representing the 'Todos' table in the database.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) // Configures the database connection and provider.
        {
            optionsBuilder.UseSqlite("Data Source = C:\\Users\\Sumesh\\Desktop\\Todo-List-Assignment\\Todo-List-Backend\\TodoList\\TodoList.DataAccess\\TodoListDb.db"); // Using SQLite as the database provider with the specified file path.
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) // Configures the model and initializes data when the database is created.
        {
            modelBuilder.Entity<User>()
                .HasMany(e => e.Todos)
                .WithOne(e => e.User)
                .HasForeignKey(e => e.UserEmail)
                .IsRequired();

            modelBuilder.Entity<User>().HasData(new User[]
            {
                new User { FirstName = "Sumesh" , LastName = "Akalanka" , Email = "kvsumeshakalanka@gmail.com" , Password = "123" },
                new User { FirstName = "Sudesh" , LastName = "Anuradha" , Email = "kvsudeshanuradha@gmail.com" , Password = "123"},
                new User { FirstName = "Megha" , LastName = "Thilini" , Email = "kvmeghathilini@gmail.com" , Password = "123"},
                new User { FirstName = "Medha" , LastName = "Thisari" , Email = "kvmedhathisari@gmail.com" , Password = "123"}
            }); // For seed initial user data into the 'Users' table.

        

        
            modelBuilder.Entity<Todo>().HasData(new Todo[]
            {
                new Todo { Id =1 , Tittle = "Do assignments" , Description = "blaaaa1" , Status = 1 , UserEmail = "kvsumeshakalanka@gmail.com" },
                new Todo { Id =2 , Tittle = "Do execices" , Description = "blaaaa2" , Status = 0 , UserEmail = "kvsumeshakalanka@gmail.com"},
                new Todo { Id =3 , Tittle = "Do busness" , Description = "blaaaa3" , Status = 0 , UserEmail = "kvsudeshanuradha@gmail.com"},
                new Todo { Id =4 , Tittle = "Go to weding" , Description = "blaaaa4" , Status = 1 , UserEmail = "kvsudeshanuradha@gmail.com"}
            }); // For seed initial todo data into the 'Todos' table.

        }
    }
}

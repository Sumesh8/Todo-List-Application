﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TodoList.DataAccess;

#nullable disable

namespace TodoList.DataAccess.Migrations
{
    [DbContext(typeof(TodoListDbContext))]
    [Migration("20231118072358_Initial migrations")]
    partial class Initialmigrations
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.14");

            modelBuilder.Entity("TodoList.Models.User", b =>
                {
                    b.Property<string>("Email")
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(12)
                        .HasColumnType("TEXT");

                    b.HasKey("Email");

                    b.ToTable("users");

                    b.HasData(
                        new
                        {
                            Email = "kvsumeshakalanka@gmail.com",
                            FirstName = "Sumesh",
                            LastName = "Akalanka",
                            Password = "123"
                        },
                        new
                        {
                            Email = "kvsudeshanuradha@gmail.com",
                            FirstName = "Sudesh",
                            LastName = "Anuradha",
                            Password = "123"
                        },
                        new
                        {
                            Email = "kvmeghathilini@gmail.com",
                            FirstName = "Megha",
                            LastName = "Thilini",
                            Password = "123"
                        },
                        new
                        {
                            Email = "kvmedhathisari@gmail.com",
                            FirstName = "Medha",
                            LastName = "Thisari",
                            Password = "123"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
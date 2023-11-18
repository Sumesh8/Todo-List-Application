using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using TodoList.Models;
using TodoList.Services.ViewModels;

namespace TodoList.Services.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile() // Constructor for MappingProfile.
        {
            CreateMap<TodoDto , Todo>(); // For instructs  to AutoMapper on how to map properties from TodoDto to Todo
        }
    }
}

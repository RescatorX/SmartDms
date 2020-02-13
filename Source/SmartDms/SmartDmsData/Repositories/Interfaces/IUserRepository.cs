using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.EntityFrameworkCore;

using SmartDmsData.Entities;

namespace SmartDmsData.Repositories.Interfaces
{
    public interface IUserRepository
    {
        DbSet<User> GetQuery();

        IEnumerable<User> GetUsers();

        User GetUserById(string id);

        User CreateUser(User user);

        User UpdateUser(User user);

        User DeleteUser(string userId);
    }
}

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

        User Add(User user);

        IEnumerable<User> GetAll();
    }
}

using System;
using System.Collections.Generic;
using System.Text;

using SmartDmsData.Entities;

namespace SmartDmsData.Repositories.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAll();
    }
}

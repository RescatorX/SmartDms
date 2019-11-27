using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using SmartDmsData.Entities;
using SmartDmsData.Repositories.Interfaces;

namespace SmartDmsData.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly SmartDmsDbContext _db;

        public UserRepository(SmartDmsDbContext db)
        {
            _db = db;
        }

        public IEnumerable<User> GetAll() => _db.Users.ToList();
    }
}

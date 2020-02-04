using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.EntityFrameworkCore;

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

        public DbSet<User> GetQuery()
        {
            return _db.Users;
        }

        public User Add(User user)
        {
            _db.Users.Add(user);
            _db.SaveChanges();

            return user;
        }

        public IEnumerable<User> GetAll() => _db.Users.ToList();
    }
}

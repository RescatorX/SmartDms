using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
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

        public IEnumerable<User> GetUsers() => _db.Users.ToList();

        public User GetUserById(string id)
        {
            return _db.Users.FirstOrDefault(u => u.Id == id);
        }

        public User CreateUser(User user)
        {
            _db.Users.Add(user);
            _db.SaveChanges();

            return user;
        }

        public User UpdateUser(User user)
        {
            User updatingUser = _db.Users.FirstOrDefault(u => u.Id == user.Id);
            if (updatingUser != null)
            {
                _db.Update<User>(user);
                _db.SaveChanges();

                return user;
            }
            else
            {
                return null;
            }
        }

        public User DeleteUser(string userId)
        {
            User deletingUser = _db.Users.FirstOrDefault(u => u.Id == userId);
            if (deletingUser != null)
            {
                _db.Remove<User>(deletingUser);
                _db.SaveChanges();

                return deletingUser;
            }
            else
            {
                return null;
            }
        }
    }
}

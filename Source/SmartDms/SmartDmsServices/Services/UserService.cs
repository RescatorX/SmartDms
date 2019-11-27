using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

using SmartDmsData;
using SmartDmsData.Entities;
using SmartDmsServices.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace SmartDmsServices.Services
{
    public class UserService : IUserService
    {
        private readonly IServiceScopeFactory serviceScopeFactory;
        protected SmartDmsDbContext dbContext;

        public UserService(IServiceScopeFactory serviceScopeFactory)
            : base()
        {
            this.serviceScopeFactory = serviceScopeFactory;
            using (var scope = this.serviceScopeFactory.CreateScope())
            {
                this.dbContext = scope.ServiceProvider.GetRequiredService<SmartDmsDbContext>();
            }
        }

        public async Task<User> GetAllowedUser(string userName)
        {
            return await this.dbContext.Users.FirstOrDefaultAsync(u => u.UserName.Equals(userName, StringComparison.InvariantCultureIgnoreCase));
        }

        public async Task<List<Microsoft.AspNetCore.Identity.IdentityUserRole<string>>> GetUserRoles(string userId)
        {
            return await this.dbContext.UserRoles.Where(ur => ur.UserId.Equals(userId)).Select(ur => ur as Microsoft.AspNetCore.Identity.IdentityUserRole<string>).ToListAsync();
        }
    }
}

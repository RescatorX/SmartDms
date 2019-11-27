using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

using SmartDmsCommon.Extensions;
using SmartDmsCommon.Utils;
using SmartDmsData.Entities;
using SmartDmsData.Enums;

namespace SmartDmsData
{
    public class SmartDmsDbSeed
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<SmartDmsDbContext>();
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();

            context.Database.EnsureCreated();

            string adminRoleName = "Admin";
            bool roleCheck = await roleManager.RoleExistsAsync(adminRoleName);
            if (!roleCheck)
            {
                Role role = new Role();
                role.Name = adminRoleName;
                role.Description = "Administrator";
                role.Status = RoleStatus.Enabled;

                IdentityResult result = roleManager.CreateAsync(role).Result;
                //IdentityResult roleResult = await roleManager.CreateAsync(new IdentityRole<int>(roleName));
            }

            string adminUserName = "SmartAdmin";
            User adminUser = await userManager.FindByNameAsync(adminUserName);
            if (adminUser == null)
            {
                User user = new User()
                {
                    Id = Guid.NewGuid().ToString("D"),
                    Email = "info@smartdms.cz",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = "SmartAdmin",
                    PasswordHash = Constants.DefaultAdminPassword.ComputeSHA256Hash(),
                    FirstName = "Miroslav",
                    LastName = "Kalina",
                    Created = DateTime.Now,
                    Status = UserStatus.Created
                };

                IdentityResult result = await userManager.CreateAsync(user, "adminadmin");
                if (result.Succeeded)
                {
                    user = await userManager.FindByNameAsync(adminUserName);
                    if (user != null)
                    {
                        result = await userManager.AddToRoleAsync(user, adminRoleName);
                        if (result.Succeeded)
                        {
                        }
                    }
                }
            }
        }
    }
}

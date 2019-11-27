using System;
using System.Collections.Generic;

using Microsoft.AspNetCore.Identity;

using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Created { get; set; }
        public UserStatus Status { get; set; }
        public string DefaultColor { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
    }

    public class Role : IdentityRole
    {
        public string Description { get; set; }
        public RoleStatus Status { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
    }

    public class UserRole : IdentityUserRole<string>
    {
        public DateTime Added { get; set; }

        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}

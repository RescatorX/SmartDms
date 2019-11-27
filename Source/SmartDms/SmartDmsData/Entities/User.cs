﻿using System;
using System.Collections.Generic;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNetCore.Identity;

using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class User : Microsoft.AspNetCore.Identity.IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Created { get; set; }
        public UserStatus Status { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
    }

    public class Role : Microsoft.AspNetCore.Identity.IdentityRole
    {
        public string Description { get; set; }
        public RoleStatus Status { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
    }

    public class UserRole : Microsoft.AspNetCore.Identity.IdentityUserRole<string>
    {
        public DateTime Added { get; set; }

        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}

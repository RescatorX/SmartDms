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
        public virtual ICollection<UserGroup> UserGroups { get; set; }

        public override string ToString()
        {
            return "User: [ Id=" + this.Id
                + " ]";
        }
    }
}

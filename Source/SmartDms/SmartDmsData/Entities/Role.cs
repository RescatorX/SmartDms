using System;
using System.Collections.Generic;

using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class Role : Microsoft.AspNetCore.Identity.IdentityRole<Guid>
    {
        public string Description { get; set; }
        public RoleStatus Status { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
        public virtual ICollection<RoleClaim> RoleClaims { get; set; }

        public override string ToString()
        {
            return "Role: [ Id=" + this.Id
                + " ]";
        }
    }
}

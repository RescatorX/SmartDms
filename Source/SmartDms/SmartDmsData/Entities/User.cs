using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class User : Microsoft.AspNetCore.Identity.IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Created { get; set; }
        public UserStatus Status { get; set; }

        public virtual ICollection<UserClaim> Claims { get; set; }
        public virtual ICollection<UserLogin> Logins { get; set; }
        public virtual ICollection<UserToken> Tokens { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
        public virtual ICollection<UserGroup> UserGroups { get; set; }

        public override string ToString()
        {
            return "User: [ Id=" + this.Id
                + " ]";
        }
    }

    public class UserClaim : IdentityUserClaim<Guid>
    {
        public virtual User User { get; set; }
    }

    public class UserLogin : IdentityUserLogin<Guid>
    {
        public virtual User User { get; set; }
    }

    public class RoleClaim : IdentityRoleClaim<Guid>
    {
        public virtual Role Role { get; set; }
    }

    public class UserToken : IdentityUserToken<Guid>
    {
        public virtual User User { get; set; }
    }
}

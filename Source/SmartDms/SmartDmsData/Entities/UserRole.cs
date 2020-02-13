using System;
using System.Collections.Generic;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNetCore.Identity;

using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class UserRole : Microsoft.AspNetCore.Identity.IdentityUserRole<string>
    {
        public DateTime Added { get; set; }

        public virtual User User { get; set; }
        public virtual Role Role { get; set; }

        public override string ToString()
        {
            return "UserRole: [ Id=" + this.Id
                + " ]";
        }
    }
}

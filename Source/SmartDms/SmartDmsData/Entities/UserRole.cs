using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartDmsData.Entities
{
    public class UserRole : Microsoft.AspNetCore.Identity.IdentityUserRole<Guid>
    {
        public DateTime Added { get; set; }

        public virtual User User { get; set; }

        public virtual Role Role { get; set; }

        public override string ToString()
        {
            return "UserRole: [ UserId=" + this.UserId + ", RoleId= " + this.RoleId
                + " ]";
        }
    }
}

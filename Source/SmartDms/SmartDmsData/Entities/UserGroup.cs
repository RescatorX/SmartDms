using System;
using System.Collections.Generic;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNetCore.Identity;

using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class UserGroup : BaseEntity
    {
        public DateTime Added { get; set; }

        public virtual User User { get; set; }
        public virtual Group Group { get; set; }

        public override string ToString()
        {
            return "UserGroup: [ Id=" + this.Id
                + " ]";
        }
    }
}

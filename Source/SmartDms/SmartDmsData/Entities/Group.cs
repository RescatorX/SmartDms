using System;
using System.Collections.Generic;

using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class Group : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Group ParentGroup { get; set; }
        public RoleStatus Status { get; set; }

        public virtual ICollection<UserGroup> UserGroups { get; set; }

        public override string ToString()
        {
            return "Group: [ Id=" + this.Id
                + " ]";
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

using SmartDmsCommon.Extensions;
using SmartDmsData.Entities.Registers;
using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class Acl : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public AclPermissionLevel Level { get; set; }
        public UserRole UserRole { get; set; }
        public UserGroup UserGroup { get; set; }

        public override string ToString()
        {
            return "Acl: [ Id=" + this.Id
                + " ]";
        }
    }
}

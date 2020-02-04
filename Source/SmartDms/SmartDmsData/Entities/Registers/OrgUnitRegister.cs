using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using SmartDmsCommon.Extensions;

namespace SmartDmsData.Entities.Registers
{
    public class OrgUnitRegister : BaseRegister
    {
        public string Group { get; set; }

        public override string ToString()
        {
            return "OrgUnitRegister: [ Id=" + this.Id
                + ", Active=" + this.Active
                + ", Code=" + this.Code
                + ", Name=" + this.Name
                + ", Note=" + this.Note
                + ", Group=" + this.Group
                + " ]";
        }
    }
}

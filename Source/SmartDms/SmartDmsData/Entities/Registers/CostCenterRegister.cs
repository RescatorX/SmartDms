using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using SmartDmsCommon.Extensions;

namespace SmartDmsData.Entities.Registers
{
    public class CostCenterRegister : BaseRegister
    {
        public string Group { get; set; }

        public override string ToString()
        {
            return "CostCenterRegister: [ Code=" + this.Code
                + ", Name=" + this.Name
                + ", Active=" + this.Active
                + ", Note=" + this.Note
                + ", Group=" + this.Group
                + " ]";
        }
    }
}

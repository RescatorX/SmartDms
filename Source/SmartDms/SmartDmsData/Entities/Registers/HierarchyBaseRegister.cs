using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using SmartDmsCommon.Extensions;

namespace SmartDmsData.Entities.Registers
{
    public class HierarchyBaseRegister : BaseRegister
    {
        public BaseRegister ParentRegister { get; set; }
        public List<BaseRegister> ChildRegisters { get; set; }
        
        public override string ToString()
        {
            return "HierarchyBaseRegister: [ Code=" + this.Code
                + ", Name=" + this.Name
                + ", Active=" + this.Active
                + ", Note=" + this.Note
                + ", ParentRegister=" + ((this.ParentRegister != null) ? this.ParentRegister.ToString() : "NULL")
                + ", ChildRegisters=" + ((this.ChildRegisters != null) ? this.ChildRegisters.ToString() : "NULL")
                + " ]";
        }
    }
}

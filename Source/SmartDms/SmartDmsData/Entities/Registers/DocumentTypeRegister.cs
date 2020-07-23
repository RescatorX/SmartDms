using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Entities.Registers
{
    public class DocumentTypeRegister : HierarchyBaseRegister
    {
        public override string ToString()
        {
            return "HierarchyBaseRegister: [ Id=" + this.Id
                + ", Active=" + this.Active
                + ", Code=" + this.Code
                + ", Name=" + this.Name
                + ", Note=" + this.Note
                + ", ParentRegister=" + ((this.ParentRegister != null) ? this.ParentRegister.ToString() : "NULL")
                + ", ChildRegisters=" + ((this.ChildRegisters != null) ? this.ChildRegisters.ToString() : "NULL")
                + " ]";
        }
    }
}

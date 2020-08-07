using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Entities.Registers
{
    public class DocumentTypeRegister : HierarchyBaseRegister
    {
        public ICollection<Document> Documents { get; set; }

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

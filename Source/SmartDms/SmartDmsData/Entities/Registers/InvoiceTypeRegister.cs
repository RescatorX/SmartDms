using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Entities.Registers
{
    public class InvoiceTypeRegister : BaseRegister
    {
        public override string ToString()
        {
            return "InvoiceTypeRegister: [ Code=" + this.Code
                + ", Name=" + this.Name
                + ", Active=" + this.Active
                + ", Note=" + this.Note
                + " ]";
        }
    }
}

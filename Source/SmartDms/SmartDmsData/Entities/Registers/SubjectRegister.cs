using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Entities.Registers
{
    public class SubjectRegister : BaseRegister
    {
        public string RegNumber { get; set; }
        public string VatNumber { get; set; }

        public override string ToString()
        {
            return "SubjectRegister: [ Code=" + this.Code
                + ", Name=" + this.Name
                + ", Active=" + this.Active
                + ", Note=" + this.Note
                + ", RegNumber=" + this.RegNumber
                + ", VatNumber=" + this.VatNumber
                + " ]";
        }
    }
}

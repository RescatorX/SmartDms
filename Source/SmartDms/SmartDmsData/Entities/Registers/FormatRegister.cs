using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Entities.Registers
{
    public class FormatRegister : BaseRegister
    {
        public string MimeType { get; set; }
        public string DosExtension { get; set; }

        public override string ToString()
        {
            return "FormatRegister: [ Code=" + this.Code
                + ", Name=" + this.Name
                + ", Active=" + this.Active
                + ", Note=" + this.Note
                + ", MimeType=" + this.MimeType
                + ", DosExtension=" + this.DosExtension
                + " ]";
        }
    }
}

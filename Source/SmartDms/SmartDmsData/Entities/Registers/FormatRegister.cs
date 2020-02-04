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
            return "FormatRegister: [ Id=" + this.Id
                + ", Active=" + this.Active
                + ", Code=" + this.Code
                + ", Name=" + this.Name
                + ", Note=" + this.Note
                + ", MimeType=" + this.MimeType
                + ", DosExtension=" + this.DosExtension
                + " ]";
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Entities.Registers
{
    public class KindTypeRegister : BaseRegister
    {
        public override string ToString()
        {
            return "KindTypeRegister: [ Id=" + this.Id
                + ", Active=" + this.Active
                + ", Code=" + this.Code
                + ", Name=" + this.Name
                + ", Note=" + this.Note
                + " ]";
        }
    }
}

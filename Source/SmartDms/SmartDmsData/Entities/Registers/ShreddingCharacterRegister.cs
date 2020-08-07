using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Entities.Registers
{
    public class ShreddingCharacterRegister : BaseRegister
    {
        public override string ToString()
        {
            return "ShreddingCharacterRegister: [ Code=" + this.Code
                + ", Name=" + this.Name
                + ", Active=" + this.Active
                + ", Note=" + this.Note
                + " ]";
        }
    }
}

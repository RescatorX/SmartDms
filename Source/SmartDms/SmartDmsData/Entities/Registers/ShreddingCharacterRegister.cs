using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Entities.Registers
{
    public class ShreddingCharacterRegister : BaseRegister
    {
        public override string ToString()
        {
            return "ShreddingCharacterRegister: [ Id=" + this.Id
                + ", Active=" + this.Active
                + ", Code=" + this.Code
                + ", Name=" + this.Name
                + ", Note=" + this.Note
                + " ]";
        }
    }
}

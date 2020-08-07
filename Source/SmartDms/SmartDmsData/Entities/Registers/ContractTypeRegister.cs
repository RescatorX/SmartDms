using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Entities.Registers
{
    public class ContractTypeRegister : BaseRegister
    {
        public override string ToString()
        {
            return "ContractTypeRegister: [ Code=" + this.Code
                + ", Name=" + this.Name
                + ", Active=" + this.Active
                + ", Note=" + this.Note
                + " ]";
        }
    }
}

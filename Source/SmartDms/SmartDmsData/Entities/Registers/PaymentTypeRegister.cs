using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Entities.Registers
{
    public class PaymentTypeRegister : BaseRegister
    {
        public override string ToString()
        {
            return "PaymentTypeRegister: [ Code=" + this.Code
                + ", Name=" + this.Name
                + ", Active=" + this.Active
                + ", Note=" + this.Note
                + " ]";
        }
    }
}

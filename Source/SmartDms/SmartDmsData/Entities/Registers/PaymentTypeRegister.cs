using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Entities.Registers
{
    public class PaymentTypeRegister : BaseRegister
    {
        public override string ToString()
        {
            return "PaymentTypeRegister: [ Id=" + this.Id
                + ", Active=" + this.Active
                + ", Code=" + this.Code
                + ", Name=" + this.Name
                + ", Note=" + this.Note
                + " ]";
        }
    }
}

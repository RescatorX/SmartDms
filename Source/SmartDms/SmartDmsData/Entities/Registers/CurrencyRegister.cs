using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using SmartDmsCommon.Extensions;

namespace SmartDmsData.Entities.Registers
{
    public class CurrencyRegister : BaseRegister
    {
        public override string ToString()
        {
            return "CurrencyRegister: [ Id=" + this.Id
                + ", Active=" + this.Active
                + ", Code=" + this.Code
                + ", Name=" + this.Name
                + ", Note=" + this.Note
                + " ]";
        }
    }
}

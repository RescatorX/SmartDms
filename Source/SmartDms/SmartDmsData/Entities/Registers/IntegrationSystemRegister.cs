using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Entities.Registers
{
    public class IntegrationSystemRegister : BaseRegister
    {
        public override string ToString()
        {
            return "IntegrationSystemRegister: [ Code=" + this.Code
                + ", Name=" + this.Name
                + ", Active=" + this.Active
                + ", Note=" + this.Note
                + " ]";
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

using SmartDmsData.Enums;

namespace SmartDmsData.Entities.Registers
{
    public class StorageSystemRegister : BaseRegister
    {
        public StorageType StorageType { get; set; }

        public override string ToString()
        {
            return "StorageSystemRegister: [ Code=" + this.Code
                + ", Name=" + this.Name
                + ", Active=" + this.Active
                + ", Note=" + this.Note
                + ", StorageType=" + this.StorageType.ToString()
                + " ]";
        }
    }
}

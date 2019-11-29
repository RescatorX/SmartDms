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
            return "StorageSystemRegister: [ Id=" + this.Id
                + ", Active=" + this.Active
                + ", Code=" + this.Code
                + ", Name=" + this.Name
                + ", Note=" + this.Note
                + ", StorageType=" + this.StorageType.ToString()
                + " ]";
        }
    }
}

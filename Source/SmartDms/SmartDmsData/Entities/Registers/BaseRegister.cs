using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using SmartDmsCommon.Extensions;

namespace SmartDmsData.Entities.Registers
{
    public class BaseRegister : BaseEntity
    {
        public bool Active { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Note { get; set; }

        public override string ToString()
        {
            return "Register: [ Id=" + this.Id
                + ", Active=" + this.Active
                + ", Code=" + this.Code
                + ", Name=" + this.Name
                + ", Note=" + this.Note
                + " ]";
        }
    }
}

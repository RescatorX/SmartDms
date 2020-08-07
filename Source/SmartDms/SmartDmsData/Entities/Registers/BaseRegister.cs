using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

using SmartDmsCommon.Extensions;

namespace SmartDmsData.Entities.Registers
{
    public abstract class BaseRegister
    {
        [Key]
        [DataMember(Name = "code", Order = 1)]
        public virtual string Code { get; set; }
        public virtual string Name { get; set; }
        public virtual bool Active { get; set; }
        public virtual string Note { get; set; }

        public abstract override string ToString();
    }
}

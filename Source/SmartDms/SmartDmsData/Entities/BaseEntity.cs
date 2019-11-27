using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace SmartDmsData.Entities
{
    public abstract class BaseEntity
    {
        [Key]
        [DataMember(Name = "id", Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual string Id { get; set; }

        public abstract override string ToString();
    }
}

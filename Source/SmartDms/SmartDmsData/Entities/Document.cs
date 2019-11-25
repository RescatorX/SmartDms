using System;
using System.Collections.Generic;
using System.Text;

using SmartDmsCommon.Extensions;

namespace SmartDmsData.Entities
{
    public class Document : BaseEntity
    {
        public string Name { get; set; }

        public string OriginalName { get; set; }

        public string Barcode { get; set; }

        public User User { get; set; }
        public string Operation { get; set; }
        public string Detail { get; set; }
        public DateTime Created { get; set; }

        public override string ToString()
        {
            return "AuditTrail: [ Id=" + this.Id
                + ", Name=" + this.Name
                + ", User=" + this.User.ToString()
                + ", Operation=" + this.Operation
                + ", Detail=" + this.Detail
                + ", Created=" + this.Created.ToCzString()
                + " ]";
        }
    }
}

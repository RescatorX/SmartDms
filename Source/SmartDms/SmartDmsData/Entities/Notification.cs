using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using SmartDmsCommon.Extensions;

namespace SmartDmsData.Entities
{
    public class Notification : BaseEntity
    {
        public string Title { get; set; }
        public User User { get; set; }
        public string Operation { get; set; }
        public string Detail { get; set; }
        public DateTime Created { get; set; }

        public override string ToString()
        {
            return "Notification: [ Id=" + this.Id
                + ", Title=" + this.Title
                + ", User=" + this.User.ToString()
                + ", Operation=" + this.Operation
                + ", Detail=" + this.Detail
                + ", Created=" + this.Created.ToCzString()
                + " ]";
        }
    }
}

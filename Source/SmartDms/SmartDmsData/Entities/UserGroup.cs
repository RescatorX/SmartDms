using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartDmsData.Entities
{
    public class UserGroup : BaseEntity
    {
        public DateTime Added { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("Group")]
        public Guid GroupId { get; set; }
        public virtual Group Group { get; set; }

        public override string ToString()
        {
            return "UserGroup: [ Id=" + this.Id
                + " ]";
        }
    }
}

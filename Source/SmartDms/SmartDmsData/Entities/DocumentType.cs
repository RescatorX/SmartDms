using System;
using System.Collections.Generic;
using System.Text;

using SmartDmsCommon.Extensions;
using SmartDmsData.Entities.Registers;
using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class DocumentType : BaseEntity
    {
        public string Name { get; set; }
        public string Parent { get; set; }
        public string Code { get; set; }
        public StorageType StorageType { get; set; }
        public int DeletingPeriod { get; set; }
        public bool Active { get; set; }
        public Acl Acl { get; set; }

        public override string ToString()
        {
            return "DocumentType: [ Id=" + this.Id
                + " ]";
        }
    }
}

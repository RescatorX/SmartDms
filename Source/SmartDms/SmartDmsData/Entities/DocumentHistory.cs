using System;
using System.Collections.Generic;
using System.Text;

using SmartDmsCommon.Extensions;
using SmartDmsData.Entities.Registers;
using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class DocumentHistory : Document
    {
        public IntegrationSystemRegister ChangerSystem { get; set; }
        public DateTime HistoryCreated { get; set; }
        public User HistoryCreatedBy { get; set; }

        public override string ToString()
        {
            return "DocumentHistory: [ Id=" + this.Id
                + " ]";
        }
    }
}

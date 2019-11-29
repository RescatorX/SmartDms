using System;
using System.Collections.Generic;
using System.Linq;

using SmartDmsCommon.Extensions;
using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class Log : BaseEntity
    {
        public string Title { get; set; }
        public IEnumerable<string> Source { get; set; }
        public LogSeverityType Severity { get; set; }
        public string Detail { get; set; }
        public LogType LogType { get; set; }

        public override string ToString()
        {
            return "Log: [ Id=" + this.Id
                + ", Title=" + this.Title
                + ", Source=" + ((this.Source != null) ? string.Join(",", this.Source) : "NULL")
                + ", Severity=" + this.Severity.ToString()
                + ", Detail=" + this.Detail
                + ", LogType=" + this.LogType.ToString()
                + " ]";
        }
    }
}

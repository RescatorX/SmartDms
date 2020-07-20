using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Structures
{
    public class DocumentCount
    {
        public string DocumentType { get; set; }
        public uint Count { get; set; }
    }

    public class DashboardData
    {
        public Guid UserId { get; set; }

        public IEnumerable<DocumentCount> Documents { get; set; }

        public uint Tasks { get; set; }

        public uint Notifications { get; set; }
    }
}

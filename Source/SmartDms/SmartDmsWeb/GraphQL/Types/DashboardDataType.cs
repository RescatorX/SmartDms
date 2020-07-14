using GraphQL.Types;
using SmartDmsData.Entities;
using SmartDmsData.Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartDmsWeb.GraphQL.Types
{
    public class DashboardDataType : ObjectGraphType<DashboardData>
    {
        public DashboardDataType()
        {
            Field(x => x.Documents, type: typeof(ListGraphType<DocumentCountType>)).Description("User documents counts by their types.");
            Field(x => x.Tasks, type: typeof(DecimalGraphType)).Description("User tasks count.");
            Field(x => x.Notifications, type: typeof(DecimalGraphType)).Description("User notifications count.");
        }
    }
}

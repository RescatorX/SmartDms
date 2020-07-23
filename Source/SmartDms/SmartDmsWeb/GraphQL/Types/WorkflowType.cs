using GraphQL.Types;
using SmartDmsData.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartDmsWeb.GraphQL.Types
{
    public class WorkflowType : ObjectGraphType<Workflow>
    {
        public WorkflowType()
        {
            Field(x => x.Id, type: typeof(IdGraphType)).Description("Id property from the workflow object.");
        }
    }
}

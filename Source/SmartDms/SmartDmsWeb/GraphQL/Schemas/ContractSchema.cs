using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using GraphQL;
using GraphQL.Types;

using SmartDmsWeb.GraphQL.Queries;

namespace SmartDmsWeb.GraphQL.Schemas
{
    public class ContractSchema : Schema
    {
        public ContractSchema(IDependencyResolver resolver)
            : base(resolver)
        {
            Query = resolver.Resolve<ContractQuery>();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using GraphQL;
using GraphQL.Types;

using SmartDmsWeb.GraphQL.Mutations;
using SmartDmsWeb.GraphQL.Queries;

namespace SmartDmsWeb.GraphQL.Schemas
{
    public class RootSchema : Schema
    {
        public RootSchema(IDependencyResolver resolver)
            : base(resolver)
        {
            Query = resolver.Resolve<RootQuery>();
            Mutation = resolver.Resolve<RootMutation>();
        }
    }
}

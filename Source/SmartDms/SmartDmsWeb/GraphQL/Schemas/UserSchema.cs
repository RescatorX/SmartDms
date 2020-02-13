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
    public class UserSchema : Schema
    {
        public UserSchema(IDependencyResolver resolver)
            : base(resolver)
        {
            Query = resolver.Resolve<UserQuery>();
            Mutation = resolver.Resolve<UserMutation>();
        }
    }
}

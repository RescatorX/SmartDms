using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using GraphQL;
using GraphQL.Types;

namespace SmartDmsWeb.GraphQL.Schemas
{
    public class UserSchema : Schema
    {
        public UserSchema(IDependencyResolver resolver)
            : base(resolver)
        {
            Query = resolver.Resolve<UserQuery>();
        }
    }
}

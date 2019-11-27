using GraphQL.Types;
using SmartDmsData.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartDmsWeb.GraphQL.Types
{
    public class UserType : ObjectGraphType<User>
    {
        public UserType()
        {
            Field(x => x.Id, type: typeof(IdGraphType)).Description("Id property from the user object.");
            Field(x => x.FirstName).Description("FirstName property from the user object.");
            Field(x => x.LastName).Description("LastName property from the user object.");
        }
    }
}

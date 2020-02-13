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
            Field(x => x.UserName).Description("UserName property from the user object.");
            Field(x => x.Email).Description("Email property from the user object.");
            Field(x => x.PhoneNumber).Description("PhoneNumber property from the user object.");
            Field(x => x.AccessFailedCount).Description("AccessFailedCount property from the user object.");
            Field(x => x.Created).Description("Created property from the user object.");
            Field(x => x.Status).Description("Status property from the user object.");
            Field(x => x.UserRoles).Description("UserRoles property from the user object.");
            Field(x => x.UserGroups).Description("UserGroups property from the user object.");
        }
    }
}

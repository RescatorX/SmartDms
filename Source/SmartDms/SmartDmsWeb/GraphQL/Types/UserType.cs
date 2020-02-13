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
            Field(x => x.FirstName, type: typeof(StringGraphType)).Description("FirstName property from the user object.");
            Field(x => x.LastName, type: typeof(StringGraphType)).Description("LastName property from the user object.");
            Field(x => x.UserName, type: typeof(StringGraphType)).Description("UserName property from the user object.");
            Field(x => x.Email, type: typeof(StringGraphType)).Description("Email property from the user object.");
            Field(x => x.PhoneNumber, type: typeof(StringGraphType)).Description("PhoneNumber property from the user object.");
            Field(x => x.AccessFailedCount, type: typeof(DecimalGraphType)).Description("AccessFailedCount property from the user object.");
            Field(x => x.Created, type: typeof(DateTimeGraphType)).Description("Created property from the user object.");
            Field(x => x.Status, type: typeof(UserStatusType)).Description("Status property from the user object.");
            Field(x => x.UserRoles, type: typeof(ListGraphType<UserRoleType>)).Description("UserRoles property from the user object.");
            Field(x => x.UserGroups, type: typeof(ListGraphType<UserGroupType>)).Description("UserGroups property from the user object.");
        }
    }
}

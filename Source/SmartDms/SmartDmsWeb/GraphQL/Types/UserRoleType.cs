using GraphQL.Types;
using SmartDmsData.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartDmsWeb.GraphQL.Types
{
    public class UserRoleType : ObjectGraphType<UserRole>
    {
        public UserRoleType()
        {
            Field(x => x.UserId, type: typeof(IdGraphType)).Description("UserId property from the user role object.");
            Field(x => x.RoleId, type: typeof(IdGraphType)).Description("RoleId property from the user role object.");
            Field(x => x.User, type: typeof(UserType)).Description("User property from the user role object.");
            Field(x => x.Role, type: typeof(RoleType)).Description("Role property from the user role object.");
            Field(x => x.Added, type: typeof(DateTimeGraphType)).Description("Added property from the user role object.");
        }
    }
}

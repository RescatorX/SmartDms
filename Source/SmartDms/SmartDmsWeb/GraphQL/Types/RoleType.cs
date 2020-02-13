using GraphQL.Types;
using SmartDmsData.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartDmsWeb.GraphQL.Types
{
    public class RoleType : ObjectGraphType<Role>
    {
        public RoleType()
        {
            Field(x => x.Id, type: typeof(IdGraphType)).Description("Id property from the role object.");
            Field(x => x.Name).Description("Name property from the role object.");
            Field(x => x.Description).Description("Description property from the role object.");
            Field(x => x.Status, type: typeof(RoleStatusType)).Description("Status property from the role object.");
            Field(x => x.UserRoles, type: typeof(ListGraphType<UserRoleType>)).Description("UserRoles property from the role object.");
        }
    }
}

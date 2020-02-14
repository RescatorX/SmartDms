using GraphQL.Types;
using SmartDmsData.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartDmsWeb.GraphQL.Types
{
    public class UserGroupType : ObjectGraphType<UserGroup>
    {
        public UserGroupType()
        {
            Field(x => x.UserId, type: typeof(IdGraphType)).Description("UserId property from the user group object.");
            Field(x => x.GroupId, type: typeof(IdGraphType)).Description("GroupId property from the user group object.");
            Field(x => x.User, type: typeof(UserType)).Description("User property from the user group object.");
            Field(x => x.Group, type: typeof(GroupType)).Description("Group property from the user group object.");
            Field(x => x.Added, type: typeof(DateTimeGraphType)).Description("Added property from the user group object.");
        }
    }
}

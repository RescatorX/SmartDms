using GraphQL.Types;
using SmartDmsData.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartDmsWeb.GraphQL.Types
{
    public class GroupType : ObjectGraphType<Group>
    {
        public GroupType()
        {
            Field(x => x.Id, type: typeof(IdGraphType)).Description("Id property from the group object.");
            Field(x => x.Name).Description("Name property from the group object.");
            Field(x => x.Description).Description("Description property from the group object.");
            Field(x => x.Status, type: typeof(GroupStatusType)).Description("Status property from the group object.");
            Field(x => x.UserGroups, type: typeof(ListGraphType<UserGroupType>)).Description("UserGroups property from the group object.");
        }
    }
}

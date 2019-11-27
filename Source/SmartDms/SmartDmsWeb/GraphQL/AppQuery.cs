using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using GraphQL.Types;

using SmartDmsData.Repositories.Interfaces;
using SmartDmsWeb.GraphQL.Types;

namespace SmartDmsWeb.GraphQL
{
    public class AppQuery : ObjectGraphType
    {
        public AppQuery(IUserRepository repository)
        {
            Field<ListGraphType<UserType>>(
               "users",
               resolve: context => repository.GetAll()
           );
        }
    }
}

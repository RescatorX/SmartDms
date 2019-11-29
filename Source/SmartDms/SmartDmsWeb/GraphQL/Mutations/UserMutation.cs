using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using GraphQL.Types;

using SmartDmsData.Entities;
using SmartDmsData.Repositories.Interfaces;
using SmartDmsWeb.GraphQL.Types;

namespace SmartDmsWeb.GraphQL.Mutations
{
    public class UserMutation : ObjectGraphType
    {
        public UserMutation(IUserRepository userRepository)
        {
            Name = "UserMutation";

            Field<UserType>(
                  "createUser",
                  arguments: new QueryArguments(
                  new QueryArgument<NonNullGraphType<UserType>> { Name = "user" }
            ),
            resolve: context =>
            {
                var user = context.GetArgument<User>("user");
                return userRepository.Add(user);
            });
        }
    }
}

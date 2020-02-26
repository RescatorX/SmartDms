using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL;
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
                  new QueryArgument<NonNullGraphType<UserInputType>> { Name = "user" }
            ),
            resolve: context =>
            {
                var user = context.GetArgument<User>("user");
                return userRepository.CreateUser(user);
            });

            Field<UserType>(
                  "updateUser",
                  arguments: new QueryArguments(
                  new QueryArgument<NonNullGraphType<UserInputType>> { Name = "user" }
            ),
            resolve: context =>
            {
                User updatedUser = null;
                User updatingUser = context.GetArgument<User>("user");
                if (updatingUser == null)
                {
                    context.Errors.Add(new ExecutionError("Error getting updating user object"));
                }
                else
                {
                    updatedUser = userRepository.UpdateUser(updatingUser);
                    if (updatedUser == null)
                    {
                        context.Errors.Add(new ExecutionError("Error updating user"));
                    }
                }

                return updatedUser;
            });

            Field<StringGraphType>(
                  "deleteUser",
                  arguments: new QueryArguments(
                  new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "userId" }
            ),
            resolve: context =>
            {
                User deletedUser = null;
                Guid deletingUserId = Guid.Parse(context.GetArgument<string>("userId"));
                if (deletingUserId == null)
                {
                    context.Errors.Add(new ExecutionError("Error getting deleting user ID"));
                }
                else
                {
                    deletedUser = userRepository.DeleteUser(deletingUserId);
                    if (deletedUser == null)
                    {
                        context.Errors.Add(new ExecutionError("Error deleting user"));
                    }
                }

                return deletedUser;
            });
        }
    }
}

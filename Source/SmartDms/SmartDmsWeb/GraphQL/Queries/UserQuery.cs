using System;
using System.Collections.Generic;
using System.Linq;

using GraphQL.Types;
using Microsoft.EntityFrameworkCore;
using SmartDmsData.Entities;
using SmartDmsData.Enums;
using SmartDmsData.Repositories.Interfaces;
using SmartDmsWeb.GraphQL.Types;

namespace SmartDmsWeb.GraphQL.Queries
{
    public class UserQuery : ObjectGraphType
    {
        public UserQuery(IUserRepository userRepository)
        {
            Field<ListGraphType<UserType>>("users",
                arguments: new QueryArguments(new List<QueryArgument>
                {
                    new QueryArgument<IdGraphType>
                    {
                        Name = "id"
                    },
                    new QueryArgument<StringGraphType>
                    {
                        Name = "firstName"
                    },
                    new QueryArgument<StringGraphType>
                    {
                        Name = "lastName"
                    },
                    new QueryArgument<StringGraphType>
                    {
                        Name = "userName"
                    },
                    new QueryArgument<StringGraphType>
                    {
                        Name = "email"
                    },
                    new QueryArgument<StringGraphType>
                    {
                        Name = "phoneNumber"
                    },
                    new QueryArgument<DecimalGraphType>
                    {
                        Name = "accessFailedCount"
                    },
                    new QueryArgument<DateGraphType>
                    {
                        Name = "created"
                    },
                    new QueryArgument<UserStatusType>
                    {
                        Name = "status"
                    },
                    new QueryArgument<ListGraphType<UserRoleType>>
                    {
                        Name = "userRoles"
                    },
                    new QueryArgument<ListGraphType<UserGroupType>>
                    {
                        Name = "userGroups"
                    }
                }),
                resolve: context =>
                {
                    var query = userRepository.GetQuery();

                    Guid userId = context.GetArgument<Guid>("id");
                    if (userId != Guid.Empty)
                    {
                        return userRepository.GetQuery().Include(u => u.UserRoles).Include(u => u.UserGroups).Where(r => r.Id == userId);
                    }

                    string userFirstName = context.GetArgument<string>("firstName");
                    if (!string.IsNullOrEmpty(userFirstName))
                    {
                        return userRepository.GetQuery().Include(u => u.UserRoles).Include(u => u.UserGroups).Where(r => r.FirstName == userFirstName);
                    }

                    string userLastName = context.GetArgument<string>("lastName");
                    if (!string.IsNullOrEmpty(userLastName))
                    {
                        return userRepository.GetQuery().Include(u => u.UserRoles).Include(u => u.UserGroups).Where(r => r.LastName == userLastName);
                    }

                    string userUserName = context.GetArgument<string>("userName");
                    if (!string.IsNullOrEmpty(userUserName))
                    {
                        return userRepository.GetQuery().Include(u => u.UserRoles).Include(u => u.UserGroups).Where(r => r.UserName == userUserName);
                    }

                    string userEmail = context.GetArgument<string>("email");
                    if (!string.IsNullOrEmpty(userEmail))
                    {
                        return userRepository.GetQuery().Include(u => u.UserRoles).Include(u => u.UserGroups).Where(r => r.Email == userEmail);
                    }

                    DateTime? userCreated = context.GetArgument<DateTime?>("created");
                    if (userCreated.HasValue)
                    {
                        return userRepository.GetQuery().Include(u => u.UserRoles).Include(u => u.UserGroups).Where(r => r.Created.Date == userCreated.Value.Date);
                    }

                    UserStatus? userStatus = context.GetArgument<UserStatus?>("status");
                    if (userStatus.HasValue)
                    {
                        return userRepository.GetQuery().Include(u => u.UserRoles).Include(u => u.UserGroups).Where(r => r.Status == userStatus.Value);
                    }

                    List<User> users = query.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).Include(u => u.UserGroups).ThenInclude(ug => ug.Group).ToList();

                    return users;
                }
            );

        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using GraphQL.Types;

using SmartDmsData.Enums;
using SmartDmsData.Repositories.Interfaces;
using SmartDmsWeb.GraphQL.Types;

namespace SmartDmsWeb.GraphQL.Queries
{
    public class DocumentQuery : ObjectGraphType
    {
        public DocumentQuery(IDocumentRepository documentRepository)
        {
            Field<ListGraphType<UserType>>("documents",
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
                    new QueryArgument<DateGraphType>
                    {
                        Name = "created"
                    },
                    new QueryArgument<UserStatusType>
                    {
                        Name = "status"
                    }
                }),
                resolve: context =>
                {
                    var query = documentRepository.GetQuery();

                    Guid userId = context.GetArgument<Guid>("id");
                    if (userId != Guid.Empty)
                    {
                        return documentRepository.GetQuery().Where(r => r.Id == userId);
                    }
/*
                    string userFirstName = context.GetArgument<string>("firstName");
                    if (!string.IsNullOrEmpty(userFirstName))
                    {
                        return documentRepository.GetQuery().Where(r => r.FirstName == userFirstName);
                    }

                    string userLastName = context.GetArgument<string>("lastName");
                    if (!string.IsNullOrEmpty(userLastName))
                    {
                        return documentRepository.GetQuery().Where(r => r.LastName == userLastName);
                    }

                    string userUserName = context.GetArgument<string>("userName");
                    if (!string.IsNullOrEmpty(userUserName))
                    {
                        return documentRepository.GetQuery().Where(r => r.UserName == userUserName);
                    }

                    string userEmail = context.GetArgument<string>("email");
                    if (!string.IsNullOrEmpty(userEmail))
                    {
                        return documentRepository.GetQuery().Where(r => r.Email == userEmail);
                    }

                    DateTime? userCreated = context.GetArgument<DateTime?>("created");
                    if (userCreated.HasValue)
                    {
                        return documentRepository.GetQuery().Where(r => r.Created.Date == userCreated.Value.Date);
                    }

                    UserStatus? userStatus = context.GetArgument<UserStatus?>("status");
                    if (userStatus.HasValue)
                    {
                        return documentRepository.GetQuery().Where(r => r.Status == userStatus.Value);
                    }
*/
                    return query.ToList();
                }
            );

        }
    }
}

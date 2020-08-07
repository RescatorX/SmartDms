using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;
using SmartDmsData.Entities;
using SmartDmsData.Enums;
using SmartDmsData.Repositories.Interfaces;
using SmartDmsWeb.GraphQL.Types;

namespace SmartDmsWeb.GraphQL.Queries
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery(IUserRepository userRepository, IDocumentRepository documentRepository)
        {
            Name = "RootQuery";

            Field<ListGraphType<SmartDmsWeb.GraphQL.Types.DocumentType>>("documents",
                arguments: new QueryArguments(new List<QueryArgument>
                {
                    new QueryArgument<IdGraphType>
                    {
                        Name = "id"
                    },
                    new QueryArgument<StringGraphType>
                    {
                        Name = "documentType"
                    },
                    new QueryArgument<StringGraphType>
                    {
                        Name = "barcode"
                    },
                    new QueryArgument<ContractFilterType>
                    {
                        Name = "filter"
                    }
                }),
                resolve: context =>
                {
/*
                    var user = (ClaimsPrincipal)context.UserContext;
                    var isUserAuthenticated = ((ClaimsIdentity)user.Identity).IsAuthenticated;
*/
                    Guid documentId = context.GetArgument<Guid>("id");
                    if (documentId != Guid.Empty)
                    {
                        return documentRepository.GetQuery().Include(d => d.Documents).Include(d => d.ParentDocument).Include(d => d.Workflows).Where(d => d.Id.Equals(documentId));
                    }

                    String documentType = context.GetArgument<String>("documentType");
                    if (!string.IsNullOrEmpty(documentType))
                    {
                        return documentRepository.GetQuery().Include(d => d.Documents).Include(d => d.ParentDocument).Include(d => d.Workflows).Where(d => d.DocumentType.Equals(documentType));
                    }

                    String barcode = context.GetArgument<String>("barcode");
                    if (!string.IsNullOrEmpty(barcode))
                    {
                        return documentRepository.GetQuery().Include(d => d.Documents).Include(d => d.ParentDocument).Include(d => d.Workflows).Where(d => d.Barcode.Equals(barcode));
                    }

                    object filter = context.GetArgument<object>("filter");
                    if (filter != null)
                    {
                        return documentRepository.GetQuery().Include(d => d.Documents).Include(d => d.ParentDocument).Include(d => d.Workflows).Where(d => d.DocumentType.Equals(filter));
                    }

                    return documentRepository.GetQuery().Include(d => d.Documents).Include(d => d.ParentDocument).Include(d => d.Workflows);
                }
            );

            Field<ListGraphType<UserType>>("users",
                arguments: new QueryArguments(new List<QueryArgument>
                {
                    new QueryArgument<IdGraphType>
                    {
                        Name = "id"
                    },
                    new QueryArgument<StringGraphType>
                    {
                        Name = "userName"
                    },
                    new QueryArgument<StringGraphType>
                    {
                        Name = "email"
                    }
                }),
                resolve: context =>
                {
/*
                    var user = (ClaimsPrincipal)context.UserContext;
                    var isUserAuthenticated = ((ClaimsIdentity)user.Identity).IsAuthenticated;
*/
                    var query = userRepository.GetQuery();

                    Guid userId = context.GetArgument<Guid>("id");
                    if (userId != Guid.Empty)
                    {
                        return userRepository.GetQuery().Include(u => u.UserRoles).Include(u => u.UserGroups).Where(r => r.Id.Equals(userId));
                    }

                    string userUserName = context.GetArgument<string>("userName");
                    if (!string.IsNullOrEmpty(userUserName))
                    {
                        return userRepository.GetQuery().Include(u => u.UserRoles).Include(u => u.UserGroups).Where(r => r.UserName.Equals(userUserName, StringComparison.CurrentCultureIgnoreCase));
                    }

                    string userEmail = context.GetArgument<string>("email");
                    if (!string.IsNullOrEmpty(userEmail))
                    {
                        return userRepository.GetQuery().Include(u => u.UserRoles).Include(u => u.UserGroups).Where(r => r.Email.Equals(userEmail, StringComparison.CurrentCultureIgnoreCase));
                    }

                    return userRepository.GetQuery().Include(u => u.UserRoles).Include(u => u.UserGroups);
                }
            );
        }
    }
}

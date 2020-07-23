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
    public class ContractQuery : ObjectGraphType
    {
        public ContractQuery(IDocumentRepository documentRepository)
        {
            Field<ListGraphType<ContractType>>("contracts",
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

                    Guid documentId = context.GetArgument<Guid>("id");
                    if (documentId != Guid.Empty)
                    {
                        return documentRepository.GetQuery().Where(r => r.Id == documentId);
                    }
                    return query.ToList();
                }
            );

        }
    }
}

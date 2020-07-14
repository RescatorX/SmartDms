using System;
using System.Collections.Generic;

using GraphQL.Types;

using SmartDmsData.Repositories.Interfaces;
using SmartDmsData.Structures;
using SmartDmsWeb.GraphQL.Types;

namespace SmartDmsWeb.GraphQL.Queries
{
    public class DashboardDataQuery : ObjectGraphType
    {
        public DashboardDataQuery(IDashboardRepository dashboardRepository)
        {
            Field<ListGraphType<DashboardDataType>>("dashboardData",
                arguments: new QueryArguments(new List<QueryArgument>
                {
                    new QueryArgument<IdGraphType>
                    {
                        Name = "userId"
                    }
                }),
                resolve: context =>
                {
                    Guid userId = context.GetArgument<Guid>("userId");
                    if (userId != Guid.Empty)
                    {
                        return dashboardRepository.GetDashboardData(userId);
                    }

                    return new DashboardData();
                }
            );
        }
    }
}

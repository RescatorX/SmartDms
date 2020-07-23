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
    public class RootMutation : ObjectGraphType
    {
        public RootMutation()
        {
            Name = "RootMutation";
        }
    }
}

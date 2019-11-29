using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using GraphQL;
using GraphQL.Types;

using SmartDmsWeb.GraphQL.Queries;

namespace SmartDmsWeb.GraphQL.Schemas
{
    public class DocumentSchema : Schema
    {
        public DocumentSchema(IDependencyResolver resolver)
            : base(resolver)
        {
            Query = resolver.Resolve<DocumentQuery>();
        }
    }
}

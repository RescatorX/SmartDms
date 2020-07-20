using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using GraphQL.Types;

using SmartDmsData.Structures;

namespace SmartDmsWeb.GraphQL.Types
{
    public class DocumentCountType : ObjectGraphType<DocumentCount>
    {
        public DocumentCountType()
        {
            Field(x => x.DocumentType, type: typeof(StringGraphType)).Description("Document type code identification.");
            Field(x => x.Count, type: typeof(DecimalGraphType)).Description("Count of document of current type.");
        }
    }
}

using GraphQL.Types;
using SmartDmsData.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartDmsWeb.GraphQL.Types
{
    public class DocumentType : ObjectGraphType<Document>
    {
        public DocumentType()
        {
            Field(x => x.Id, type: typeof(IdGraphType)).Description("Id property from the document object.");
            Field(x => x.Acl, type: typeof(StringGraphType)).Description("ACL property from the document object.");
            Field(x => x.Acquirer, type: typeof(StringGraphType)).Description("Acquirer property from the document object.");
            Field(x => x.AcquisitionDate, type: typeof(DateTimeGraphType)).Description("AcquisitionDate property from the document object.");
            Field(x => x.AcquisitionSystem, type: typeof(StringGraphType)).Description("AcquisitionSystem property from the document object.");
            Field(x => x.Barcode, type: typeof(StringGraphType)).Description("Barcode property from the document object.");
            Field(x => x.Content, type: typeof(StringGraphType)).Description("Content property from the document object.");
            Field(x => x.ContentSize, type: typeof(DecimalGraphType)).Description("ContentSize property from the document object.");
            Field(x => x.Created, type: typeof(DateTimeGraphType)).Description("Created property from the document object.");
            Field(x => x.CreatedBy, type: typeof(UserType)).Description("CreatedBy property from the document object.");
            Field(x => x.Documents, type: typeof(ListGraphType<DocumentType>)).Description("Documents property from the document object.");
            Field(x => x.DocumentType, type: typeof(StringGraphType)).Description("DocumentType property from the document object.");
            Field(x => x.DosExtension, type: typeof(StringGraphType)).Description("DosExtension property from the document object.");
            Field(x => x.Format, type: typeof(StringGraphType)).Description("Format property from the document object.");
            Field(x => x.Language, type: typeof(StringGraphType)).Description("Language property from the document object.");
            Field(x => x.Modified, type: typeof(DateTimeGraphType)).Description("Modified property from the document object.");
            Field(x => x.ModifiedBy, type: typeof(UserType)).Description("ModifiedBy property from the document object.");
            Field(x => x.Name, type: typeof(StringGraphType)).Description("Name property from the document object.");
            Field(x => x.Note, type: typeof(StringGraphType)).Description("Note property from the document object.");
            Field(x => x.OriginalName, type: typeof(StringGraphType)).Description("OriginalName property from the document object.");
            Field(x => x.Owner, type: typeof(UserType)).Description("Owner property from the document object.");
            Field(x => x.ParentDocument, type: typeof(DocumentType)).Description("ParentDocument property from the document object.");
            Field(x => x.ShreddingCharacter, type: typeof(StringGraphType)).Description("ShreddingCharacter property from the document object.");
            Field(x => x.ShreddingTrigger, type: typeof(DateTimeGraphType)).Description("ShreddingTrigger property from the document object.");
            Field(x => x.TAMethod, type: typeof(StringGraphType)).Description("TAMethod property from the document object.");
            Field(x => x.TAState, type: typeof(StringGraphType)).Description("TAState property from the document object.");
            Field(x => x.Version, type: typeof(StringGraphType)).Description("Version property from the document object.");
            Field(x => x.Workflows, type: typeof(ListGraphType<WorkflowType>)).Description("Workflow property from the document object.");
        }
    }
}

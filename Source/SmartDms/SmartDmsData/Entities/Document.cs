using System;
using System.Collections.Generic;
using System.Text;

using SmartDmsCommon.Extensions;
using SmartDmsData.Entities.Registers;
using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class Document : BaseEntity
    {
        public string Name { get; set; }
        public string OriginalName { get; set; }
        public string Barcode { get; set; }
        public DocumentTypeRegister DocumentTypeRegister { get; set; }
        public String DocumentType { get; set; }
        public DateTime? AcquisitionDate { get; set; }
        public string Acquirer { get; set; }
        public string AcquisitionSystem { get; set; }
        public string Note { get; set; }
        public string Version { get; set; }
        public string Language { get; set; }
        public string Owner { get; set; }
        public string Acl { get; set; }
        public string Content { get; set; }
        public long ContentSize { get; set; }
        public string Format { get; set; }
        public string DosExtension { get; set; }
        public string TAMethod { get; set; }
        public string TAState { get; set; }
        public IEnumerable<Workflow> Workflows { get; set; }
        public Document ParentDocument { get; set; }
        public IEnumerable<Document> Documents { get; set; }
        public DateTime Created { get; set; }
        public User CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public User ModifiedBy { get; set; }

        /**
         * Shreding character of the document.
         */
        public ShreddingCharacterRegister ShreddingCharacter { get; set; }

        /**
         * Shreding trigger of the document.
         */
        public DateTime? ShreddingTrigger { get; set; }

        public override string ToString()
        {
            return "Document: [ Id=" + this.Id
                + " ]";
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Entities
{
    public class DocumentInvoiceIssued : DocumentInvoice
    {
        public override string ToString()
        {
            return "DocumentInvoiceIssued: [ Id=" + this.Id
                + " ]";
        }
    }
}

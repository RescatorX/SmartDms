using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Entities
{
    public class DocumentInvoiceIncome : DocumentInvoice
    {
        public override string ToString()
        {
            return "DocumentInvoiceIncome: [ Id=" + this.Id
                + " ]";
        }
    }
}

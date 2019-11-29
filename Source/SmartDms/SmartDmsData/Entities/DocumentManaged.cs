using System;
using System.Collections.Generic;
using System.Text;

using SmartDmsCommon.Extensions;
using SmartDmsData.Entities.Registers;
using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class DocumentManaged : BaseEntity
    {
        /**
         * Inherited document entity.
         */
        public Document Document { get; set; }

        /**
	     * isPublic flag to present release workflow result.
	     */
        public bool IsPublic { get; set; }

        /**
	     * Specific kind type of the document.
	     */
        public KindTypeRegister KindType { get; set; }

        public override string ToString()
        {
            return "DocumentManaged: [ Id=" + this.Id
                + " ]";
        }
    }
}

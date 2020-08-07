using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Entities.Registers
{
    public class LanguageRegister : BaseRegister
    {
        public string ImageContent { get; set; }
        public string ImageMime { get; set; }

        public override string ToString()
        {
            return "LanguageRegister: [ Code=" + this.Code
                + ", Name=" + this.Name
                + ", Active=" + this.Active
                + ", Note=" + this.Note
                + ", ImageContent=" + this.ImageContent
                + ", ImageMime=" + this.ImageMime
                + " ]";
        }
    }
}

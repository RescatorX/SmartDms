using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartDmsCommon.Utils
{
    public static class Constants
    {
        public const string DefaultAdminPassword = "adminadmin";
        public const string DateTimePatternInt = "yyyy-MM-dd HH:mm:ss";
        public const string DateTimePatternCz = "d.M.yyyy HH:mm:ss";
        public const string DateTimePatternEn = "M/d/yyyy HH:mm:ss";

        public const string CompareValidationPropertyIsNotBefore = "Property value is not before against other property";
        public const string CompareValidationUnknownPropertyUnknown = "Cannot validate against unknown Property '{0}'";
    }
}

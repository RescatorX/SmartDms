using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using SmartDmsCommon.Utils;

namespace SmartDmsCommon.Extensions
{
    public static class DateTimeExtensions
    {
        public static string ToIntString(this DateTime dateTime)
        {
            return dateTime.ToString(Constants.DateTimePatternInt);
        }

        public static string ToCzString(this DateTime dateTime)
        {
            return dateTime.ToString(Constants.DateTimePatternCz);
        }

        public static string ToEnString(this DateTime dateTime)
        {
            return dateTime.ToString(Constants.DateTimePatternEn);
        }

        public static string ToIntString(this DateTime? dateTime)
        {
            if (dateTime == null) return string.Empty;
            if (!dateTime.HasValue) return string.Empty;

            return dateTime.Value.ToString(Constants.DateTimePatternInt);
        }

        public static string ToCzString(this DateTime? dateTime)
        {
            if (dateTime == null) return string.Empty;
            if (!dateTime.HasValue) return string.Empty;

            return dateTime.Value.ToString(Constants.DateTimePatternCz);
        }

        public static string ToEnString(this DateTime? dateTime)
        {
            if (dateTime == null) return string.Empty;
            if (!dateTime.HasValue) return string.Empty;

            return dateTime.Value.ToString(Constants.DateTimePatternEn);
        }
    }
}

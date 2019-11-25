using System;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Reflection;

namespace SmartDmsCommon.Utils.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class DateTimeNotBeforeAttribute : ValidationAttribute
    {
        public DateTimeNotBeforeAttribute(string otherProperty)
            : base(Constants.CompareValidationPropertyIsNotBefore)
        {
            if (otherProperty == null)
            {
                throw new ArgumentNullException("otherProperty");
            }
            OtherProperty = otherProperty;
        }

        public string OtherProperty { get; private set; }

        public override string FormatErrorMessage(string name)
        {
            return String.Format(CultureInfo.CurrentCulture, ErrorMessageString, name, OtherProperty ?? OtherProperty);
        }

        public override bool RequiresValidationContext
        {
            get
            {
                return true;
            }
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            PropertyInfo otherPropertyInfo = validationContext.ObjectType.GetProperty(OtherProperty);
            if (otherPropertyInfo == null)
            {
                return new ValidationResult(String.Format(CultureInfo.CurrentCulture, Constants.CompareValidationUnknownPropertyUnknown, OtherProperty));
            }

            object otherPropertyValue = otherPropertyInfo.GetValue(validationContext.ObjectInstance, null);
            if ((value != null) && (otherPropertyValue != null))
            {
                DateTime dtValue = (DateTime)value;
                DateTime opValue = (DateTime)otherPropertyValue;

                if (dtValue.CompareTo(opValue) < 0)
                {
                    return new ValidationResult(FormatErrorMessage(validationContext.DisplayName));
                }
            }

            return null;
        }
    }
}

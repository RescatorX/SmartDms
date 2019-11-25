using System;
using System.Collections.Generic;
using System.Text;

using SmartDmsData.Entities;

namespace SmartDmsData.Extensions
{
    public static class UserExtensions
    {
        public static string GetUserFullName(this User user)
        {
            if (user == null) return string.Empty;

            return $"{user.FirstName} {user.LastName}";
        }
    }
}

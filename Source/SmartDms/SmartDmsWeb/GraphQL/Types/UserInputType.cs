using GraphQL.Types;
using SmartDmsData.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartDmsWeb.GraphQL.Types
{
    public class UserInputType : InputObjectGraphType
    {
        public UserInputType()
        {
            Name = "userInput";

            Field<NonNullGraphType<StringGraphType>>("firstName", "FirstName property from the user object.");
            Field<NonNullGraphType<StringGraphType>>("lastName", "LastName property from the user object.");
            Field<NonNullGraphType<StringGraphType>>("userName", "UserName property from the user object.");
            Field<NonNullGraphType<StringGraphType>>("email", "Email property from the user object.");
            Field<NonNullGraphType<StringGraphType>>("phoneNumber", "PhoneNumber property from the user object.");
            Field<NonNullGraphType<StringGraphType>>("accessFailedCount", "AccessFailedCount property from the user object.");
            Field<NonNullGraphType<StringGraphType>>("created", "Created property from the user object.");
            Field<NonNullGraphType<StringGraphType>>("status", "Status property from the user object.");
        }
    }
}

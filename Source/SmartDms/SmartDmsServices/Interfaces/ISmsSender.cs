using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartDmsServices.Interfaces
{
    public interface ISmsSender
    {
        Task<string> GetToken(string authorizationKey, string authorizationSecret);

        Task<bool> SendSms(string authorizationToken, string phoneNumber, string body);
    }
}

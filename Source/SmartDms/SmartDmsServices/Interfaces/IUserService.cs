using System.Collections.Generic;
using System.Threading.Tasks;

using SmartDmsData.Entities;

namespace SmartDmsServices.Interfaces
{
    public interface IUserService
    {
        Task<User> GetAllowedUser(string userName);

        Task<List<UserRole>> GetUserRoles(string userId);
    }
}

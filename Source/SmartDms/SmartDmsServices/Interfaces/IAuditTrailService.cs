using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using SmartDmsData;
using SmartDmsData.Entities;

namespace SmartDmsServices.Interfaces
{
    public interface IAuditTrailService
    {
        Task<AuditTrail> CreateAuditTrailAsync(SmartDmsDbContext db, User user, string title, string operation, string detail = null);
    }
}

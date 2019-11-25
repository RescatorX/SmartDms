using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using SmartDmsData;
using SmartDmsData.Entities;
using SmartDmsServices.Interfaces;

namespace SmartDmsServices.Services
{
    public class AuditTrailService : IAuditTrailService
    {
        public async Task<AuditTrail> CreateAuditTrailAsync(SmartDmsDbContext db, User user, string title, string operation, string detail = null)
        {
            AuditTrail at = new AuditTrail() { Id = Guid.NewGuid().ToString("D"), User = user, Title = title, Operation = operation, Detail = detail, Created = DateTime.Now };
            db.AuditTrails.Add(at);
            await db.SaveChangesAsync();

            return at;
        }
    }
}

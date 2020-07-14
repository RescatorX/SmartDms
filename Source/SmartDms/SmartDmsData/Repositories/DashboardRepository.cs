using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.EntityFrameworkCore;

using SmartDmsData.Entities;
using SmartDmsData.Repositories.Interfaces;
using SmartDmsData.Structures;

namespace SmartDmsData.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly SmartDmsDbContext _db;

        public DashboardRepository(SmartDmsDbContext db)
        {
            _db = db;
        }

        public DashboardData GetDashboardData(Guid userId)
        {
            return new DashboardData()
            {
                UserId = userId,
                Documents = new List<DocumentCount>()
                {
                    new DocumentCount() { DocumentType = "INV_INCOME", Count = 3 },
                    new DocumentCount() { DocumentType = "INV_ISSUED", Count = 1 },
                    new DocumentCount() { DocumentType = "CONTRACT", Count = 2 },
                    new DocumentCount() { DocumentType = "MANAGED", Count = 4 }
                },
                Tasks = 5,
                Notifications = 2
            };
        }
    }
}

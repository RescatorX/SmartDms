using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.EntityFrameworkCore;

using SmartDmsData.Entities;
using SmartDmsData.Structures;

namespace SmartDmsData.Repositories.Interfaces
{
    public interface IDashboardRepository
    {
        DashboardData GetDashboardData(Guid userId);
    }
}

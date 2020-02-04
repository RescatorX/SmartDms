using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.EntityFrameworkCore;

using SmartDmsData.Entities;

namespace SmartDmsData.Repositories.Interfaces
{
    public interface IDocumentRepository
    {
        DbSet<Document> GetQuery();

        Document Add(Document document);

        IEnumerable<Document> GetAll();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using SmartDmsData.Entities;

namespace SmartDmsData.Repositories.Interfaces
{
    public interface IDocumentRepository
    {
        IQueryable<Document> GetQuery();

        Document Add(Document document);

        IEnumerable<Document> GetAll();
    }
}

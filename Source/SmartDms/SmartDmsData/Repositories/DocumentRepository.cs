using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.EntityFrameworkCore;

using SmartDmsData.Entities;
using SmartDmsData.Repositories.Interfaces;

namespace SmartDmsData.Repositories
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly SmartDmsDbContext _db;

        public DocumentRepository(SmartDmsDbContext db)
        {
            _db = db;
        }

        public DbSet<Document> GetQuery()
        {
            return _db.Documents;
        }

        public Document Add(Document document)
        {
            _db.Documents.Add(document);
            _db.SaveChanges();

            return document;
        }

        public IEnumerable<Document> GetAll() => _db.Documents.ToList();
    }
}

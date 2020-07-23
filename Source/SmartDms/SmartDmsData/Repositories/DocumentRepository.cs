using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.EntityFrameworkCore;

using SmartDmsData.Entities;
using SmartDmsData.Enums;
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

        public IQueryable<Document> GetQuery()
        {
            List<Document> documents = new List<Document>();
            documents.Add(new Document() { Id = Guid.NewGuid(), Name = "Doc_01", OriginalName = "Doc_01.df", Barcode = "BC111", DocumentType = DocumentType.Contract });
            documents.Add(new Document() { Id = Guid.NewGuid(), Name = "Doc_02", OriginalName = "Doc_02.df", Barcode = "BC222", DocumentType = DocumentType.Invoice });
            documents.Add(new Document() { Id = Guid.NewGuid(), Name = "Doc_03", OriginalName = "Doc_03.df", Barcode = "BC333", DocumentType = DocumentType.Managed });
            documents.Add(new Document() { Id = Guid.NewGuid(), Name = "Doc_04", OriginalName = "Doc_04.df", Barcode = "BC444", DocumentType = DocumentType.Document });

            return documents.AsQueryable();

            //return _db.Documents;
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

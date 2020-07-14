import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { Consts, DataTypes, Utils } from '../code';
import { BaseEnumCollectionEntity, LogEntity, DocumentDataBoxEntity, DocumentEntity, DocumentContractEntity, DocumentInvoiceIncomeEntity, DocumentInvoiceIssuedEntity,
  DocumentManagedEntity, NotificationLevel, QueryEntity, GridColumn, TrustedArchiveEntity } from '../entities';
import { IGridService } from './igrid.service';
import { UiService } from './ui.service';

@Injectable()
export class DocumentService implements IGridService {

  // URLs of webservice methods
  readonly documentsUrl: string = "/api/documents";
  readonly documentUrl: string = "/api/documents/[uuid]/false";
  readonly documentFileUrl: string = "/api/downloads/[uuid]/[type]";
  readonly documentDeleteUrl: string = "/api/documents/[uuid]";

  readonly managedDocumentsUrl: string = "/api/spring/docManaged/all/true";
  readonly managedDocumentByUuidUrl: string = "/api/spring/docManaged/[uuid]/false";
  readonly managedDocumentByPublicUrl: string = "/api/spring/docManaged/all/[isPublic]";
  readonly managedDocumentUploadUrl: string = "/api/spring/docManaged/upload";
  readonly managedDocumentUpdateUrl: string = "/api/spring/docManaged/update";
  readonly managedDocumentExportReviewUrl: string = "/api/spring/docManaged/exportExcel";

  readonly dataBoxDocumentsUrl: string = "/api/spring/dataBox/all";
  readonly dataBoxDocumentByUuidUrl: string = "/api/spring/dataBox/one/[uuid]";
  readonly dataBoxDownloadByUuidUrl: string = "/api/spring/dataBox/downloadZfo/[uuid]";

  readonly documentWFStateUrl: string = "/api/spring/documents/updateWfState";
  readonly documentgetAttachmentsUrl: string = "/api/spring/documents/getDocument/[uuid]";
  readonly documentUploadAttachmentsUrl: string = "/api/spring/documents/attachment";

  readonly defaultTableName = "DocumentEntity"
  readonly filterUrl: string = "/api/search/query?hql=SELECT [SELECT] FROM [TABLE] [WHERE] [ORDER]";
  readonly documentsSearchUrl: string = "/api/search/fulltext";

  readonly allDocumentCountUrl: string = "/api/search/query?hql=SELECT%20count%28%2A%29%20FROM%20DocumentEntity%20WHERE%20internal=false";
  readonly managedDocumentCountUrl: string = "/api/search/query?hql=SELECT%20count%28%2A%29%20FROM%20DocumentEntity%20WHERE%20internal=false%20AND%20documentType.code%20LIKE%20%27%25DOC_MANAGED%25%27";
  readonly dataBoxDocumentCountUrl: string = "/api/search/query?hql=SELECT%20count%28%2A%29%20FROM%20DocumentEntity%20WHERE%20internal=false%20AND%20documentType.code%20LIKE%20%27%25DOC_DATABOX%25%27";
  readonly invoiceIncomeCountUrl: string = "/api/search/query?hql=SELECT%20count%28%2A%29%20FROM%20InvoiceEntity%20WHERE%20internal=false%20AND%20documentType.code%20LIKE%20%27%25INV_INCOME%25%27";
  readonly invoiceIssueCountUrl: string = "/api/search/query?hql=SELECT%20count%28%2A%29%20FROM%20InvoiceEntity%20WHERE%20internal=false%20AND%20documentType.code%20LIKE%20%27%25INV_ISSUE%25%27";
  readonly contractCountUrl: string = "/api/search/query?hql=SELECT%20count%28%2A%29%20FROM%20ContractEntity%20WHERE%20internal=false%20AND%20documentType.code%20LIKE%20%27%25CONTRACT%25%27";
  readonly contractTypedCountUrl: string = "/api/search/query?hql=SELECT%20count%28%2A%29%20FROM%20ContractEntity%20WHERE%20internal=false%20AND%20documentType.code%20LIKE%20%27%25CONTRACT%25%27%20AND%20contractType.code%20LIKE%20%27%25{TYPE}%25%27";
  readonly taDocumentCountUrl: string = "/api/search/query?hql=SELECT%20count%28%2A%29%20FROM%20DocumentEntity%20WHERE%20internal=false%20AND%20taState>0";
  readonly documentCountByTypeAndRegisterUrl: string = "/api/search/query?hql=SELECT%20count%28%2A%29%20FROM%20{DOCENTITY}%20WHERE%20internal=false%20AND%20documentType.code%20LIKE%20%27%25{DOCTYPE}%25%27%20AND%20UPPER({REGTYPE}.code)%20=%20%27{REGCODE}%27";

  // edit matrix temporary URL
  editMatrixUrl: string = "./../../assets/data/edit-matrix.json";

  constructor(private http: HttpClient, private uiService: UiService) {
  }

  previousQuery: QueryEntity;
  cachedDocuments: DocumentEntity[];
  cachedInvoiceIncomeDocuments: DocumentInvoiceIncomeEntity[];
  cachedInvoiceIssuedDocuments: DocumentInvoiceIssuedEntity[];
  cachedContracts: DocumentContractEntity[];
  cachedManagedDocuments: DocumentManagedEntity[];
  cachedDataBoxDocuments: DocumentDataBoxEntity[];

  getDocuments(query?: QueryEntity): Observable<DocumentEntity[]> {

    let url = this.documentsUrl;
    let isQueryEqualWithPrevious = false;
    this.previousQuery = query;

    if (query) {
      isQueryEqualWithPrevious = query.Equals(this.previousQuery, false);

      //different rest service for fultext search with cache
      if (query.searchKeys) {
        if (isQueryEqualWithPrevious && this.cachedDocuments) {
          return Observable.of(this.cachedDocuments.slice(query.offset, query.fulltextLimit));
        } else {
          return this.getDocumentsSearched(query).map(d => {
            this.cachedDocuments = d;
            //when fulltext is used and server return more than limit of result for fulltext
            if (d.length >= query.fulltextLimit) {
              this.uiService.notificationService.alert(this.uiService.configService.res["msg"]["documentFulltextMaxDocumentLimitReach"], NotificationLevel.Warning);
            }
            return d
          });
        }
      } else {
        url += query.toSQL();
      }
    }
    return this.http.get<DocumentEntity[]>(url).map(d => { this.cachedDocuments = d; return d });
  }

  getInvoiceIncomeDocuments(query?: QueryEntity): Observable<DocumentInvoiceIncomeEntity[]> {

    let url = this.documentsUrl;
    let isQueryEqualWithPrevious = query.Equals(this.previousQuery, false);
    this.previousQuery = query;

    if (query) {
      //different rest service for fultext search with cache
      if (query.searchKeys) {
        if (isQueryEqualWithPrevious && this.cachedInvoiceIncomeDocuments) {
          return Observable.of(this.cachedInvoiceIncomeDocuments.slice(query.offset, query.fulltextLimit));
        } else {
          return this.getInvoiceIncomeDocumentsSearched(query).map(d => {
            this.cachedDocuments = d;
            //when fulltext is used and server return more than limit of result for fulltext
            if (d.length >= query.fulltextLimit) {
              this.uiService.notificationService.alert(this.uiService.configService.res["msg"]["documentFulltextMaxDocumentLimitReach"], NotificationLevel.Warning);
            }
            return d
          });
        }
      } else {
        url += query.toSQL();
      }
    }
    return this.http.get<DocumentInvoiceIncomeEntity[]>(url).map(d => { this.cachedDocuments = d; return d });
  }

  getInvoiceIssuedDocuments(query?: QueryEntity): Observable<DocumentInvoiceIssuedEntity[]> {

    let url = this.documentsUrl;
    let isQueryEqualWithPrevious = query.Equals(this.previousQuery, false);
    this.previousQuery = query;

    if (query) {
      //different rest service for fultext search with cache
      if (query.searchKeys) {
        if (isQueryEqualWithPrevious && this.cachedInvoiceIssuedDocuments) {
          return Observable.of(this.cachedInvoiceIssuedDocuments.slice(query.offset, query.fulltextLimit));
        } else {
          return this.getInvoiceIssuedDocumentsSearched(query).map(d => {
            this.cachedDocuments = d;
            //when fulltext is used and server return more than limit of result for fulltext
            if (d.length >= query.fulltextLimit) {
              this.uiService.notificationService.alert(this.uiService.configService.res["msg"]["documentFulltextMaxDocumentLimitReach"], NotificationLevel.Warning);
            }
            return d
          });
        }
      } else {
        url += query.toSQL();
      }
    }
    return this.http.get<DocumentInvoiceIssuedEntity[]>(url).map(d => { this.cachedDocuments = d; return d });
  }

  getContracts(query?: QueryEntity): Observable<DocumentContractEntity[]> {

    let url = this.documentsUrl;
    let isQueryEqualWithPrevious = false;
    this.previousQuery = query;

    if (query) {
      isQueryEqualWithPrevious = query.Equals(this.previousQuery, false);

      //different rest service for fultext search with cache
      if (query.searchKeys) {
        if (isQueryEqualWithPrevious && this.cachedContracts) {
          return Observable.of(this.cachedContracts.slice(query.offset, query.fulltextLimit));
        } else {
          return this.getContractsSearched(query).map(d => {
            this.cachedDocuments = d;
            //when fulltext is used and server return more than limit of result for fulltext
            if (d.length >= query.fulltextLimit) {
              this.uiService.notificationService.alert(this.uiService.configService.res["msg"]["documentFulltextMaxDocumentLimitReach"], NotificationLevel.Warning);
            }
            return d
          });
        }
      } else {
        url += query.toSQL();
      }
    }
    return this.http.get<DocumentContractEntity[]>(url).map(d => { this.cachedDocuments = d; return d });
  }

  getManagedDocuments(query?: QueryEntity): Observable<DocumentManagedEntity[]> {

    let url = this.managedDocumentsUrl;
    let isQueryEqualWithPrevious = query.Equals(this.previousQuery, false);
    this.previousQuery = query;

    if (query) {
      //different rest service for fultext search with cache
      if (query.searchKeys) {
        if (isQueryEqualWithPrevious && this.cachedManagedDocuments) {
          return Observable.of(this.cachedManagedDocuments.slice(query.offset, query.fulltextLimit));
        } else {
          return this.getManagedDocumentsSearched(query).map(d => {
            this.cachedManagedDocuments = d;
            //when fulltext is used and server return more than limit of result for fulltext
            if (d.length >= query.fulltextLimit) {
              this.uiService.notificationService.alert(this.uiService.configService.res["msg"]["documentFulltextMaxDocumentLimitReach"], NotificationLevel.Warning);
            }
            return d
          });
        }
      } else {
        url += query.toSQL();
      }
    }
    return this.http.get<DocumentManagedEntity[]>(url).map(d => { this.cachedManagedDocuments = d; return d });
  }

  getDataBoxDocuments(query?: QueryEntity): Observable<DocumentDataBoxEntity[]> {

    let url = this.dataBoxDocumentsUrl;
    let isQueryEqualWithPrevious = query.Equals(this.previousQuery, false);
    this.previousQuery = query;

    if (query) {
      //different rest service for fultext search with cache
      if (query.searchKeys) {
        if (isQueryEqualWithPrevious && this.cachedDataBoxDocuments) {
          return Observable.of(this.cachedDataBoxDocuments.slice(query.offset, query.fulltextLimit));
        } else {
          return this.getDataBoxDocumentsSearched(query).map(d => {
            this.cachedDataBoxDocuments = d;
            //when fulltext is used and server return more than limit of result for fulltext
            if (d.length >= query.fulltextLimit) {
              this.uiService.notificationService.alert(this.uiService.configService.res["msg"]["documentFulltextMaxDocumentLimitReach"], NotificationLevel.Warning);
            }
            return d
          });
        }
      } else {
        url += query.toSQL();
      }
    }
    return this.http.get<DocumentDataBoxEntity[]>(url).map(d => { this.cachedDataBoxDocuments = d; return d });
  }

  getDataBoxDocumentsSimple(): Observable<DocumentDataBoxEntity[]> {
    let url = this.dataBoxDocumentsUrl;
    return this.http.get<DocumentDataBoxEntity[]>(url);
  }

  getDocument(log: LogEntity, uuid: string) {
    this.uiService.logService.log(log);
    let url = this.documentUrl.replace("[uuid]", uuid);
    return this.http.get(url);
  }

  getDocumentFileSynch(uuid: string, type: string) {
    let url = this.documentFileUrl.replace("[uuid]", uuid).replace("[type]", type);
    this.http.get(url, { responseType: "arraybuffer" }).subscribe((res) => {
      console.log(res);
    });
  }


  getFielUrl(uuid, format): string {
    let url = this.documentFileUrl.replace("[uuid]", uuid).replace("[type]", format);
    return url;
  }

  getDocumentFileByUuid(log: LogEntity, uuid, format): Observable<{ objectUrl: string, name: string }> {
    let url = this.getFielUrl(uuid, format);
    return this.getDocumentFile(log, url);
  }

  readonly verificationFileUrl: string = "/api/downloads/[uuid]";
  geVerificationFileByUuid(log: LogEntity, uuid, ): Observable<any> {
    let url = this.verificationFileUrl.replace("[uuid]", uuid);

    let headrsObj = {
      ...Consts.requestHeader,
    }
    let headers = new HttpHeaders(headrsObj);

    return this.http.get(url,
      { headers: headers, responseType: "blob", observe: 'response' });
  }

  getDocumentFile(log: LogEntity, url: string): Observable<{ objectUrl: string, name: string }> {

    return new Observable((observer: Subscriber<{ objectUrl: string, name: string }>) => {
      let file: { objectUrl: string, name: string } = { objectUrl: null, name: null };
      this.uiService.logService.log(log);
      this.http
        .get(url, { responseType: "blob", observe: 'response' })
        .subscribe(m => {
          file.objectUrl = URL.createObjectURL(m.body);
          let filename = m.headers.get("content-disposition");
          filename = filename.substring(filename.lastIndexOf("filename=") + "filename=".length).replace(/"/g, "");
          file.name = filename;
          observer.next(file);
        });

      return () => {
        if (file && file.objectUrl) {
          URL.revokeObjectURL(file.objectUrl);
          file = null;
        }
      };
    });
  }

  getDocumentFilePost(log: LogEntity, url: string, body: {}): Observable<{ objectUrl: string, name: string }> {

    return new Observable((observer: Subscriber<{ objectUrl: string, name: string }>) => {
      let file: { objectUrl: string, name: string } = { objectUrl: null, name: null };
      this.uiService.logService.log(log);
      this.http
        .post(url, body, { responseType: "blob", observe: 'response' })
        .subscribe(m => {
          file.objectUrl = URL.createObjectURL(m.body);
          let filename = m.headers.get("content-disposition");
          filename = filename.substring(filename.lastIndexOf("filename=") + "filename=".length).replace(/"/g, "");
          file.name = filename;
          observer.next(file);
        });

      return () => {
        if (file && file.objectUrl) {
          URL.revokeObjectURL(file.objectUrl);
          file = null;
        }
      };
    });
  }

  getDocumentContent(log: LogEntity, url: string) {
    this.uiService.logService.log(log);
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  getZfoContent(log: LogEntity, id: string) {
    this.uiService.logService.log(log);
    let url = this.dataBoxDownloadByUuidUrl.replace("[uuid]", id);
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  private specificFormat = [{
    id: DataTypes.date,
    value: "to_char([columnName],'" + Consts.dateTimeFormat_toHybernateQuery + "') AS [columnName], to_char([columnName],'" + Consts.dateFormat + "')",
    order: "[columnName] DESC",
    isKeyValue: true
  }];

  getValuesFromColumn(column: GridColumn, query?: QueryEntity): Observable<{ key, value }[]> {

    let hbColumn = column.hbNameKey;
    let order = column.hbNameKey;

    //pokud chci ziskat key i value, musim si o nej rict v filterUrl
    let isKeyValue = false;

    //pro specificke type (napr datum) musim dotaz pretrasformovat pro hql
    if (column.type) {
      let format = this.specificFormat.find(f => f.id == column.type);
      if (format) {
        hbColumn = format.value.replace(/\[columnName\]/g, column.hbNameKey);
        if (format) {
          if (format.order) {
            order = format.order.replace(/\[columnName\]/g, column.hbNameKey);
          }
          isKeyValue = format.isKeyValue;
        }
      }
    }

    if (column.hbNameValue && column.hbNameKey !== column.hbNameValue) {
      hbColumn += ", " + column.hbNameValue;
      isKeyValue = true;
    }

    let url = this.filterUrl
      .replace("[hbColumnName]", column.hbNameKey)
      .replace("[SELECT]", "DISTINCT " + hbColumn)
      .replace("[TABLE]", column.table ? column.table : this.defaultTableName);
    let where = "";
    if (query) {
      where = query.getWhere(true);
    }
    url = url
      .replace("[WHERE]", where)
      .replace("[ORDER]", "ORDER BY " + order);

    url = encodeURI(url);

    //vysledek filtru vratim jako {key,value}
    return this.http.get<{}[]>(url).map(rows => {
      let data: { key, value }[] = [];
      rows.forEach(r => {
        if (isKeyValue) {
          data.push({ key: r[0], value: r[1] });
        } else {
          data.push({ key: r, value: r });
        }
      });
      return data;
    });
  }

  getDocumentsSearched(query?: QueryEntity): Observable<DocumentEntity[]> {
    ///api/search/fulltext?limit=30&searchKeys=Test&filters=LOWER(barcode) LIKE '%12%',LOWER(documentTypeName) LIKE '%dda%'
    let url = this.documentsSearchUrl;
    if (query) {
      url += query.toSearchQuery();
    }

    return this.http.get<{ foundDocumentData: DocumentEntity, score: number }[]>(url).map(data => {
      let documents: DocumentEntity[] = data.map(doc => {
        doc.foundDocumentData["score"] = doc.score;
        return doc.foundDocumentData;
      });
      return documents;
    });
  }

  getContractsSearched(query?: QueryEntity): Observable<DocumentContractEntity[]> {
    ///api/search/fulltext?limit=30&searchKeys=Test&filters=LOWER(barcode) LIKE '%12%',LOWER(documentTypeName) LIKE '%dda%'
    let url = this.documentsSearchUrl;
    if (query) {
      url += query.toSearchQuery();
    }

    return this.http.get<{ foundContractData: DocumentContractEntity, score: number }[]>(url).map(data => {
      let documents: DocumentContractEntity[] = data.map(doc => {
        doc.foundContractData["score"] = doc.score;
        return doc.foundContractData;
      });
      return documents;
    });
  }

  getInvoiceIncomeDocumentsSearched(query?: QueryEntity): Observable<DocumentInvoiceIncomeEntity[]> {
    ///api/search/fulltext?limit=30&searchKeys=Test&filters=LOWER(barcode) LIKE '%12%',LOWER(documentTypeName) LIKE '%dda%'
    let url = this.documentsSearchUrl;
    if (query) {
      url += query.toSearchQuery();
    }

    return this.http.get<{ foundDocumentData: DocumentInvoiceIncomeEntity, score: number }[]>(url).map(data => {
      let documents: DocumentInvoiceIncomeEntity[] = data.map(doc => {
        doc.foundDocumentData["score"] = doc.score;
        return doc.foundDocumentData;
      });
      return documents;
    });
  }

  getInvoiceIssuedDocumentsSearched(query?: QueryEntity): Observable<DocumentInvoiceIssuedEntity[]> {
    ///api/search/fulltext?limit=30&searchKeys=Test&filters=LOWER(barcode) LIKE '%12%',LOWER(documentTypeName) LIKE '%dda%'
    let url = this.documentsSearchUrl;
    if (query) {
      url += query.toSearchQuery();
    }

    return this.http.get<{ foundDocumentData: DocumentInvoiceIssuedEntity, score: number }[]>(url).map(data => {
      let documents: DocumentInvoiceIssuedEntity[] = data.map(doc => {
        doc.foundDocumentData["score"] = doc.score;
        return doc.foundDocumentData;
      });
      return documents;
    });
  }

  getManagedDocumentsSearched(query?: QueryEntity): Observable<DocumentManagedEntity[]> {
    ///api/search/fulltext?limit=30&searchKeys=Test&filters=LOWER(barcode) LIKE '%12%',LOWER(documentTypeName) LIKE '%dda%'
    let url = this.managedDocumentsUrl;
    if (query) {
      url += query.toSearchQuery();
    }

    return this.http.get<{ foundManagedDocumentsData: DocumentManagedEntity, score: number }[]>(url).map(data => {
      let documents: DocumentManagedEntity[] = data.map(doc => {
        doc.foundManagedDocumentsData["score"] = doc.score;
        return doc.foundManagedDocumentsData;
      });
      return documents;
    });
  }

  getDataBoxDocumentsSearched(query?: QueryEntity): Observable<DocumentDataBoxEntity[]> {
    ///api/search/fulltext?limit=30&searchKeys=Test&filters=LOWER(barcode) LIKE '%12%',LOWER(documentTypeName) LIKE '%dda%'
    let url = this.dataBoxDocumentsUrl;
    if (query) {
      url += query.toSearchQuery();
    }

    return this.http.get<{ foundDataBoxDocumentsData: DocumentDataBoxEntity, score: number }[]>(url).map(data => {
      let documents: DocumentDataBoxEntity[] = data.map(doc => {
        doc.foundDataBoxDocumentsData["score"] = doc.score;
        return doc.foundDataBoxDocumentsData;
      });
      return documents;
    });
  }

  private readonly documentTypeUrl = "/api/search/doctypes";
  getDoctTypes(log?: LogEntity): Observable<BaseEnumCollectionEntity> {
    return this.http.get<string[][]>(this.documentTypeUrl).map((res) => {
      let docTypes = res.map(r => { return { code: r[0], value: r[1] } });
      let docTypesTyped = new BaseEnumCollectionEntity(docTypes);
      return docTypesTyped;
    });
  }


  private readonly report1Url = "/api/reports"
  getReport1(log: LogEntity, params: {}): Observable<any> {
    return this.getDocumentFilePost(log, this.report1Url, params);
  }

  private readonly report2Url = "/api/reports"
  getReport2(log: LogEntity, params: {}): Observable<any> {
    return this.getDocumentFilePost(log, this.report2Url, params);
  }

  readonly taDetailUrl: string = "api/trustedarchive/document/[uuid]";
  getTaDetail(log: LogEntity, uuid: string): Observable<TrustedArchiveEntity[]> {
    this.uiService.logService.log(log);
    let url = this.taDetailUrl.replace("[uuid]", uuid);
    return this.http.get<TrustedArchiveEntity[]>(url);
  }

  readonly taVerificationPackageUrl: string = "api/trustedarchive/verificationpackage/[uuid]/[chanon]"
  getTaVerificationPackage(log: LogEntity, uuid: string, chanon: boolean): Observable<any> {
    let url = this.taVerificationPackageUrl.replace("[uuid]", uuid).replace("[chanon]", chanon.toString());

    let headrsObj = {
      ...Consts.requestHeader,
    }
    let headers = new HttpHeaders(headrsObj);

    return this.http.get(url,
      { headers: headers, responseType: "blob", observe: 'response' });
  }

  readonly taRegisterUrl: string = "api/trustedarchive/register"
  postTaRegister(log: LogEntity, uuid: string): Observable<any> {
    let headrsObj = {
      ...Consts.requestHeader,
    }
    let headers = new HttpHeaders(headrsObj);

    let body: string = "{\"documentId\" : \"[uuid]\"}".replace("[uuid]", uuid);

    return this.http.post(this.taRegisterUrl,
      body,
      { headers: headers, responseType: "blob", observe: 'response' });
  }

  createDocument(log: LogEntity, documentEntity: DocumentEntity) {
    this.uiService.logService.log(log);
    return this.http.post(this.documentsUrl, documentEntity);
  }

  createManagedDocument(log: LogEntity, managedDocumentEntity: DocumentManagedEntity) {
    this.uiService.logService.log(log);
    return this.http.post(this.managedDocumentUploadUrl, managedDocumentEntity);
  }

  updateDocument(log: LogEntity, documentId: string, documentEntity: DocumentEntity, delegate = null, target = null, closeOnSuccess: boolean = false) {
    this.uiService.logService.log(log);
    let url = this.documentsUrl + "/" + documentId;
    //this.http.put(url, documentEntity).subscribe(d => {
    this.http.patch(url, documentEntity).subscribe(d => {
      if (delegate) {
        delegate(target, d, false, null, closeOnSuccess);
      }
    }, err => {
      if (delegate) {
        delegate(target, null, true, err, closeOnSuccess);
      }
    });
  }

  updateDocumentSimple(log: LogEntity, documentId: string, documentEntity: DocumentEntity) {
    this.uiService.logService.log(log);
    let url = this.documentsUrl + "/" + documentId;
    return this.http.put(url, documentEntity);//.subscribe(d => {
    // return this.http.patch(url, documentEntity);
  }

  updateDocumentByPut(log: LogEntity, documentId: string, documentEntity: DocumentEntity, delegate = null, target = null, closeOnSuccess: boolean = false) {
    this.uiService.logService.log(log);
    let url = this.documentsUrl + "/" + documentId;
    let clonedDocument: DocumentEntity = Object.assign({}, documentEntity);
    clonedDocument.parentDocument = null;
    clonedDocument.documents = [];
    this.http.put(url, clonedDocument).subscribe(d => {
      if (delegate) {
        delegate(target, d, false, null, closeOnSuccess);
      }
    }, err => {
      if (delegate) {
        delegate(target, null, true, err, closeOnSuccess);
      }
    });
  }

  updateDocumentByPutSimple(log: LogEntity, documentId: string, documentEntity: DocumentEntity) {
    this.uiService.logService.log(log);
    let url = this.documentsUrl + "/" + documentId;
    let clonedDocument: DocumentEntity = Object.assign({}, documentEntity);
    clonedDocument.parentDocument = null;
    clonedDocument.documents = [];
    return this.http.put(url, clonedDocument);
  }

  deleteDocument(log: LogEntity, documentId: string, delegate = null, target = null, closeOnSuccess: boolean = false) {
    this.uiService.logService.log(log);
    let url = this.documentsUrl + "/" + documentId;
    return this.http.delete(url).subscribe(d => {
      if (delegate) {
        delegate(target, d, false, null, closeOnSuccess);
      }
    }, err => {
      if (delegate) {
        delegate(target, null, true, err, closeOnSuccess);
      }
    });
  }

  getAllDocumentCount(log: LogEntity) {
    this.uiService.logService.log(log);
    return this.http.get(this.allDocumentCountUrl).map(d => { return d });
  }

  getManagedDocumentCount(log: LogEntity) {
    this.uiService.logService.log(log);
    return this.http.get(this.managedDocumentCountUrl).map(d => { return d });
  }

  getDataBoxDocumentCount(log: LogEntity) {
    this.uiService.logService.log(log);
    //return this.http.get(this.dataBoxDocumentCountUrl).map(d => { return d });
    return this.http.get<DocumentDataBoxEntity[]>(this.dataBoxDocumentsUrl).map(d => { return ((d != null) ? d.length : 0) });
  }

  getInvoiceIncomeCount(log: LogEntity) {
    this.uiService.logService.log(log);
    return this.http.get(this.invoiceIncomeCountUrl).map(d => { return d });
  }

  getInvoiceIssuedCount(log: LogEntity) {
    this.uiService.logService.log(log);
    return this.http.get(this.invoiceIssueCountUrl).map(d => { return d });
  }

  getContractCount(log: LogEntity) {
    this.uiService.logService.log(log);
    return this.http.get(this.contractCountUrl).map(d => { return d });
  }

  getContractTypedCount(log: LogEntity, type: string) {
    this.uiService.logService.log(log);
    let url = this.contractTypedCountUrl
      .replace("{TYPE}", type)
    return this.http.get(url).map(d => { return d });
  }

  getTADocumentCount(log: LogEntity) {
    this.uiService.logService.log(log);
    return this.http.get(this.taDocumentCountUrl).map(d => { return d });
  }

  getDocumentCountByTypeAndRegister(log: LogEntity, documentEntity: string, documentType: string, registerType: string, registerCode: string) {
    this.uiService.logService.log(log);
    let url = this.documentCountByTypeAndRegisterUrl
      .replace("{DOCENTITY}", documentEntity)
      .replace("{DOCTYPE}", documentType)
      .replace("{REGTYPE}", registerType)
      .replace("{REGCODE}", registerCode);
    return this.http.get(url).map(d => { return d });
  }

  updateDocumentWorkflowState(log: LogEntity, documentId: string, status: number): Observable<boolean> {
    this.uiService.logService.log(log);
    return this.http.post<boolean>(this.documentWFStateUrl, { "documentId": documentId, "workflowState": status });
  }

  getDocumentAttachments(log: LogEntity, uuid: string): Observable<DocumentEntity> {
    this.uiService.logService.log(log);
    let url = this.documentgetAttachmentsUrl.replace("[uuid]", uuid);
    return this.http.get<DocumentEntity>(url);
  }

  getManagedDocumentVersions(log: LogEntity, uuid: string): Observable<DocumentManagedEntity> {
    this.uiService.logService.log(log);
    let url = this.managedDocumentByUuidUrl.replace("[uuid]", uuid);
    return this.http.get<DocumentManagedEntity>(url);
  }

  uploadDocumentAttachment(log: LogEntity, attachment: DocumentEntity): Observable<DocumentEntity> {
    this.uiService.logService.log(log);
    return this.http.post<DocumentEntity>(this.documentUploadAttachmentsUrl, attachment);
  }

  uploadManagedDocumentAttachment(log: LogEntity, attachment: DocumentEntity): Observable<DocumentEntity> {
    this.uiService.logService.log(log);
    return this.http.post<DocumentEntity>(this.documentUploadAttachmentsUrl, attachment);
  }

  deleteDocumentAttachment(log: LogEntity, uuid: string) {
    this.uiService.logService.log(log);
    let url = this.documentDeleteUrl.replace("[uuid]", uuid);
    return this.http.delete(url);
  }

  getManagedDocument(log: LogEntity, uuid: string): Observable<DocumentManagedEntity> {
    this.uiService.logService.log(log);
    let url = this.managedDocumentByUuidUrl.replace("[uuid]", uuid);
    return this.http.get<DocumentManagedEntity>(url);
  }

  updateManagedDocument(log: LogEntity, documentId: string, documentEntity: DocumentManagedEntity): Observable<DocumentManagedEntity> {
    this.uiService.logService.log(log);

    //let url = this.managedDocumentUpdateUrl + "/" + documentId;
    let url = this.managedDocumentUpdateUrl;
    return this.http.post<DocumentManagedEntity>(url, documentEntity);
  }

  getDataBoxDocument(log: LogEntity, uuid: string): Observable<DocumentDataBoxEntity> {
    this.uiService.logService.log(log);
    let url = this.dataBoxDocumentByUuidUrl.replace("[uuid]", uuid);
    return this.http.get<DocumentDataBoxEntity>(url);
  }

  createExportReviewString(log: LogEntity, documentId: string, instanceId: string): Observable<string> {
    this.uiService.logService.log(log);

    let url = this.managedDocumentExportReviewUrl;
    let body: string = "{\"documentId\" : \"[uuid]\", \"processInstanceId\" : \"[instanceId]\"}".replace("[uuid]", documentId).replace("[instanceId]", instanceId);;

    return this.http.post(url, body).map((r: any) => r.content.toString());
  }

  getWorkflowName(doc: DocumentEntity): string {

    let workflowName: string = doc.workflowType;

    if (workflowName != null) {
      if (workflowName.indexOf("Contract") >= 0) {
        workflowName = "Schválení smlouvy";
      }
      if (workflowName.indexOf("DocApproval") >= 0) {
        workflowName = "Schválení dokumentu";
      }
      if (workflowName.indexOf("Approval") >= 0) {
        workflowName = "Schválení faktury";
      }
      if (workflowName.indexOf("DocFamiliarization") >= 0) {
        workflowName = "Seznámení s dokumentem";
      }
    } else {
      workflowName = "Schválení dokumentu";
    }

    return workflowName;
  }

  getDosExtension(doc: DocumentManagedEntity): string {

    let dosExtension: string = doc.dosExtension;

    if (dosExtension == null) {

      if ((doc.originalName != null) && (doc.originalName.length > 0)) {
        let dotIndex: number = doc.originalName.lastIndexOf(".");
        if (dotIndex >= 0) {
          dosExtension = doc.originalName.substring(dotIndex + 1);
        }
      } else {
        dosExtension = "PDF";
      }
    }
    return dosExtension.toLowerCase();
  }

  getDocumentContentType(format: string): string {
    let result: string = "application/pdf";

    if (format.toUpperCase() == "CSV") { result = "text/csv" };
    if (format.toUpperCase() == "DOC") { result = "application/msword" };
    if (format.toUpperCase() == "DOCX") { result = "application/vnd.openxmlformats-officedocument.wordprocessingml.document" };
    if (format.toUpperCase() == "DOC") { result = "application/msword" };
    if (format.toUpperCase() == "HTM") { result = "text/html" };
    if (format.toUpperCase() == "HTML") { result = "text/html" };
    if (format.toUpperCase() == "JPEG") { result = "image/jpeg" };
    if (format.toUpperCase() == "JPG") { result = "image/jpeg" };
    if (format.toUpperCase() == "JSON") { result = "application/json" };
    if (format.toUpperCase() == "PDF") { result = "application/pdf" };
    if (format.toUpperCase() == "PNG") { result = "image/png" };
    if (format.toUpperCase() == "PPT") { result = "application/vnd.ms-powerpoint" };
    if (format.toUpperCase() == "PPTX") { result = "application/vnd.openxmlformats-officedocument.presentationml.presentation" };
    if (format.toUpperCase() == "SVG") { result = "image/svg+xml" };
    if (format.toUpperCase() == "TEXT") { result = "text/plain" };
    if (format.toUpperCase() == "TXT") { result = "text/plain" };
    if (format.toUpperCase() == "TIF") { result = "image/tiff" };
    if (format.toUpperCase() == "TIFF") { result = "image/tiff" };
    if (format.toUpperCase() == "XLS") { result = "application/vnd.ms-excel" };
    if (format.toUpperCase() == "XLSX") { result = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
    if (format.toUpperCase() == "XML") { result = "application/xml" };
    if (format.toUpperCase() == "ZIP") { result = "application/zip" };

    return result;
  }
}

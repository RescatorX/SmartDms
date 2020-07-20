import { DocumentEntity } from "./document.entity";
import { SelectionGridMode } from "../code/enums/selection-grid-mode";
import { QueryEntity } from "./query.entity";
import { BaseEntity } from "./base.entity";

export class ExportEntity {

  /**data from grid */
  public selectedDocuments: DocumentEntity[];
  public isAllDocumentselected: boolean;
  public hasBeenAllDocumentselected: boolean;
  public notSelectedDocuments: DocumentEntity[];
  public selectionMode: SelectionGridMode;
  public query: QueryEntity;
  public type: String;

  /**data from modal */
  batchName: string; //send from UI to Server (in phase startExport)

  /**data from server */
  estimatedNumberOfArchives: number; //from server in phase Offer
  totalSize: number; //from server in phase Offer [Byte]
  estimatedTime: number //[milisec] / from server in phase Offer
  numberOfExportedObjects: number;

  typeOfExportedObject: string = "DOC:DDA_DOC"; // "DOCUMENT", //DOC:DOC
  formatOfArchive: string = "ZIP"; //"TEXT"


  public get totalSizeMB(): number {
    return Math.round(this.totalSize / 1024 / 1024 * 100) / 100;
  }


  constructor() { }

  toRequest(): {} {
    let exportEntityForServer = {
      typeOfExportedObject: this.typeOfExportedObject,
      formatOfArchive: this.formatOfArchive,
      selectionMode: this.selectionMode,
      type: this.type
    };
    switch (this.selectionMode) {
      case SelectionGridMode.All: {
        // exportEntityForServer["filter"] = this.query.toFilterQuery();
        exportEntityForServer["filter"] = JSON.stringify(this.query.toFilterQuery());
        break;
      }
      case SelectionGridMode.AllWithExclude: {
        exportEntityForServer["filter"] = JSON.stringify(this.query.toFilterQuery());
        // exportEntityForServer["filter"] = this.query.toFilterQuery();
        exportEntityForServer["idsOfExcludedObjects"] = this.notSelectedDocuments.map(d => { return d.uuid });
        break;
      } case SelectionGridMode.Some: {
        exportEntityForServer["idsOfIncludedObjects"] = this.selectedDocuments.map(d => { return d.uuid });
        break;
      }
    }
    return exportEntityForServer;
  }


  setFromResponse(response) {
    BaseEntity.copyProperties(response, this);
    //...
  }

  toStartExport() {
    let startEntity = this.toRequest();
    startEntity["exportName"] = this.batchName;
    return startEntity;
  }
}

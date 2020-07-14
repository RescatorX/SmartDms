import { Injectable } from '@angular/core';
import { Consts } from '../code/global.const';

export class QueryEntity {

  offset?: number;
  limit?: number;
  fulltextLimit?: number;
  // filter?: string;
  sort?: string;
  sortDirection?: string;
  // sortDest: boolean;
  expressions: string[] = new Array();
  expressionsTranslated: string[] = new Array();
  expressionsRaw: { columnName: string, operator: string, value: {} }[] = new Array();

  searchKeys: string[];
  documentIds: string[];

  /**
   * Return query part
   */
  public toSQL() {
    let separator = "&"
    let params: string[] = new Array();
    this.offset ? params.push("offset=" + this.offset) : null;
    this.limit ? params.push("limit=" + this.limit) : null;
    // this.sort ? params.push("sort=ORDER BY " + this.sort + " " + this.sortDest ? "DESC" : "ASC") : null;
    this.sort ? params.push("sort=ORDER BY " + this.sort + " " + this.sortDirection) : null;

    if (this.expressions && this.expressions.length > 0) {
      let filterSeparator = " AND ";
      let filter = "filter=WHERE " + this.expressions.join(filterSeparator);
      params.push(filter);
    }
    let query = "";
    if (params.length > 0) {
      query = "?" + params.join(separator);
    }

    return encodeURI(query);
    // return query;
  }

  /**
   * For column filter
   */
  public getWhere(filterInternal: boolean = false): string {
    // readonly filterUrl: string="/api/search?hql=SELECT DISTINCT [hbColumnName] FROM DocumentEntity WHERE [where]";
    let params: string[] = new Array();

    if (filterInternal) {
      params.push(" WHERE internal=false");
    }

    let filterSeparator = " AND ";
    if (this.expressions && this.expressions.length > 0) {
      let filter = this.expressions.join(filterSeparator);
      params.push(filter);
    }
    return params.join(filterSeparator);
  }

  /**
   * get query params to fulltext request 
   * return ?limit=30&searchKeys=Test&filters=LOWER(barcode) LIKE '%12%',LOWER(documentTypeName) LIKE '%dda%'"
  */
  public toSearchQuery() {
    let separator = "&";
    let params: string[] = new Array();
    this.offset ? params.push("offset=" + this.offset) : null;
    this.limit ? params.push("limit=" + this.fulltextLimit) : null;

    if (this.searchKeys) {
      params.push("searchKeys=" + this.searchKeys.join(","));
    }

    // if(this.documentIds){
    //     params.push("documentIds=" + this.documentIds.join(","));
    // }

    if (this.expressions && this.expressions.length > 0) {
      params.push("filters=" + this.expressions.join(","));
    }

    let query = "";
    if (params.length > 0) {
      query = "?" + params.join(separator);
    }

    return encodeURI(query);
  }

  /**
   * last implementation - hopefully and finally
   * used in export
      {
          "type": "FLAT",
          "statement":
          {
              "operator": "AND",
              "operands":
                  [
                      { "entityName": "DDA_Documents", "columnName": "name", "operator": "LIKE", "value": "VALUE1" },
                      { "entityName": "DocumentEntity", "columnName": "created", "operator": "<", "value": "22.12.2018" }
                  ]
          }
      }

   */
  public toFilterQuery(): {} {
    let filter = {
      "type": "FLAT",
      "statement":
      {
        "operator": "AND",
        "operands":
          [
            // { "entityName": "DDA_Documents", "columnName": "name", "operator": "LIKE", "value": "VALUE1" },
            // { "entityName": "DocumentEntity", "columnName": "created", "operator": "<", "value": "22.12.2018" }
          ]
      }
    }
    //chceme vse
    // if (this.offset) {
    //     filter["offset"] = this.offset;
    // }
    // if (this.limit) {
    //     filter["limit"] = this.limit;
    // }
    if (this.sort) {
      filter["sort"] = this.sort + " " + this.sortDirection;
    }

    let statements = [...this.expressionsRaw];
    statements.forEach(s => {
      s["entityName"] = "DDA_Documents";
      filter.statement.operands.push(s);
    })

    return filter;
  }

  public Equals(other: QueryEntity, includePaging: boolean = false): boolean {
    if (!other) {
      return false;
    }
    if (this.expressions.length != other.expressions.length) {
      return false;
    }
    if (includePaging && (this.offset != other.offset || this.limit != other.limit)) {
      return false;
    }

    if (JSON.stringify(this.searchKeys) !== JSON.stringify(other.searchKeys)) {
      return false;
    }

    for (let index = 0; index < this.expressions.length; index++) {
      if (this.expressions[index] != other.expressions[index]) {
        return false;
      }

    }
    return true;
  }

}

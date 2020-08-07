import { Injectable, OnInit } from '@angular/core';
import { DocumentEntity, LogEntity, DocumentContractEntity } from '../entities';
import { UiService } from './ui.service';
import { QueryRef, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { FilterItem } from '.';

let documentsPaths: GraphQlDocumentsPathsType = {
  DocumentsBasePath: '/SmartDms/graphql'
};

interface GraphQlDocumentsPathsType {
  readonly DocumentsBasePath: string;
}

export const GraphQlDocumentsPaths: GraphQlDocumentsPathsType = documentsPaths;

const CONTRACTS_GRID_INITIAL_QUERY = gql` query { documents (documentType: "Contract") { id, name, originalName, barcode, documentType } } `;
const CONTRACTS_GRID_FILTERED_QUERY = gql` query gridFilteredQuery($filter: ContractFilterType!) { documents (filter: $filter) { id, name, originalName, barcode, documentType } } `;

@Injectable()
export class DocumentService implements OnInit {

  readonly gqlDocumentsBaseUrl: string = GraphQlDocumentsPaths.DocumentsBasePath;

  private query: QueryRef<any>;
  private documents: DocumentEntity[] = [];

  constructor(private apollo: Apollo, private uiService: UiService) {
  }

  ngOnInit() {
  }

  public getContracts(log: LogEntity): Observable<ApolloQueryResult<DocumentContractEntity[]>> {

    return this.apollo.query<DocumentContractEntity[]>({
      query: CONTRACTS_GRID_INITIAL_QUERY
    });
  }

  public getFilteredContracts(log: LogEntity, filter: FilterItem[]): Observable<ApolloQueryResult<DocumentContractEntity[]>> {

    return this.apollo.query<DocumentContractEntity[]>({
      query: CONTRACTS_GRID_FILTERED_QUERY,
      variables: {
        filter: JSON.stringify(filter)
      }
    });
  }
}

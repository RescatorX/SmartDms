import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DocumentService, UiService } from '../../../../services';
import { LogEntity, DocumentContractEntity } from '../../../../entities';

@Component({
  selector: 'contract-grid',
  templateUrl: './contract-grid.component.html',
  styleUrls: ['./contract-grid.component.scss']
})

export class ContractGridComponent implements OnInit {

  private contracts: DocumentContractEntity[] = [];
  private isLoading: boolean = false;

  public get Res(): any {
    return this.uiService.configService.res;
  }

  constructor(private documentService: DocumentService, private uiService: UiService, private router: Router, private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {

    this.documentService.getContracts(LogEntity.CreateAction(this, "ContractGridComponent.ngOnInit")).subscribe(({ data, loading }) => {

      this.isLoading = loading;
      this.contracts = data;
    }, error => {
        console.log("Error reading contracts: " + JSON.stringify(error));
    }, () => {
        this.isLoading = false;
    });
  }

  ngOnDestroy() {
  }
}

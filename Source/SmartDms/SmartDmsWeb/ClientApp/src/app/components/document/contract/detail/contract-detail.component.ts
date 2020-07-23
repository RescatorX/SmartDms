import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DocumentService, UiService } from '../../../../services';

@Component({
  selector: 'contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})

export class ContractDetailComponent implements OnInit {

  public get Res(): any {
    return this.uiService.configService.res;
  }

  constructor(private documentService: DocumentService, private uiService: UiService, private router: Router, private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}

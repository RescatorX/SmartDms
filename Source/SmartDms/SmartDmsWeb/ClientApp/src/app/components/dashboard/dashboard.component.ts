import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import * as $ from 'jquery';

import { LogEntity, DashboardEntity, StatChartEntity, RegisterEntity, DashboardInvoiceEntity, DashboardContractEntity } from '../../entities';
import { AuthenticationService, DocumentService, ShreddingService, TaskService, UiService, UserService, DashboardService, RegisterService } from '../../services';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public config;
  public isLoading: boolean = false;
  public errorMessage: string;
  public dataLoaded: boolean = false;
  public dashboardData: DashboardEntity = new DashboardEntity({});

  public taskAllCount: number = 0;
  public taskNewCount: number = 0;
  public taskInProgressCount: number = 0;

  public shreddingActiveCount: number = 0;
  public shreddingFinishedCount: number = 0;

  public managedDocumentCount: number = 0;

  public dataBoxDocumentCount: number = 0;

  public invoiceIncomeCount: number = 0;
  public invoiceIssuedCount: number = 0;

  public contractKSCount: number = 0;
  public contractLSCount: number = 0;
  public contractSODCount: number = 0;

  public taDocumentCount: number = 0;

  eventSubscription: Subscription;

  sumsByTypeLoaded: boolean = false;
  sumsByWFStateLoaded: boolean = false;
  sumsBySupplierLoaded: boolean = false;
  sumsByCurrencyLoaded: boolean = false;
  sumsContractByContractTypeLoaded: boolean = false;
  sumsContractByRecordTypeLoaded: boolean = false;

  public invoiceIncomeByTypeData: StatChartEntity[] = [];
  public invoiceIncomeByWFStateData: StatChartEntity[] = [];
  public invoiceIncomeBySupplierData: StatChartEntity[] = [];
  public invoiceIncomeByCurrencyData: StatChartEntity[] = [];
  public contractByContractTypeData: StatChartEntity[] = [];
  public contractByRecordTypeData: StatChartEntity[] = [];

  public loading: boolean = false;

  private getDashboardDataQuerySubscription: Subscription;

  chartColors: string[] = [
    "rgba(110, 114, 20, 1)",
    "rgba(118, 183, 172, 1)",
    "rgba(0, 148, 97, 1)",
    "rgba(129, 78, 40, 1)",
    "rgba(0, 148, 97, 1)",
    "rgba(110, 114, 20, 1)",
    "rgba(118, 183, 172, 1)",
    "rgba(0, 148, 97, 1)",
    "rgba(129, 78, 40, 1)",
    "rgba(0, 148, 97, 1)"
  ];

  public get Res(): any {
    return this.uiService.configService.res;
  }

  constructor(private documentService: DocumentService, private taskService: TaskService, private shreddingService: ShreddingService, private router: Router,
    private uiService: UiService, private userService: UserService, public authenticationService: AuthenticationService, private dashboardService: DashboardService,
    private registerService: RegisterService, private apollo: Apollo) {

    this.dashboardData.dashboardInvoice = new DashboardInvoiceEntity();
    this.dashboardData.dashboardContract = new DashboardContractEntity();

    this.sumsByTypeLoaded = false;
    this.sumsByWFStateLoaded = false;
    this.sumsBySupplierLoaded = false;
    this.sumsByCurrencyLoaded = false;
    this.sumsContractByContractTypeLoaded = false;
    this.sumsContractByRecordTypeLoaded = false;

    this.eventSubscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  ngOnInit() {
    this.uiService.setPageHead("Dashboard", "Úvodní obrazovka se základním přehledem...");

    this.getDashboardDataQuerySubscription = this.apollo.watchQuery<any>({
      query: this.dashboardService.dashboardDataQuery,
      variables: {
        userId: "123",
      },
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.dashboardData = data;

        console.log("Success querying dashboard data.");
      }, error => {
        console.log("Error querying dashboard data: ", JSON.stringify(error));
      }, () => {
          console.log("Finished querying dashboard data.");
      });
  }

  public ngOnDestroy() {

    this.getDashboardDataQuerySubscription.unsubscribe();
    this.eventSubscription.unsubscribe();
    this.dataLoaded = false;
  }

  loadData() {

    if (this.authenticationService.userIsLogged && (this.userService.user != null) && (this.userService.user.userName != null) && !this.dataLoaded) {

      console.log("Dashboard - loadData");

      this.dashboardService.getDashboardData().subscribe(data => {

        // dashboard data successfully loaded
        this.dashboardData = data;

        // get invoices counts for dashboard
        this.invoiceIncomeByWFStateData = [];
        this.invoiceIncomeByWFStateData.push(
          new StatChartEntity({ id: (1), type: "Spuštěno", value: this.dashboardData.dashboardInvoice.wfInProgress, color: this.getColor(0, 0) }),
          new StatChartEntity({ id: (2), type: "Dokončeno", value: this.dashboardData.dashboardInvoice.wfCompleted, color: this.getColor(0, 1) }),
          new StatChartEntity({ id: (3), type: "Chyba", value: this.dashboardData.dashboardInvoice.wfInError, color: this.getColor(0, 2) })
        );
        this.sumsByWFStateLoaded = true;
        this.invoiceIncomeBySupplierData = [];
        if (this.dashboardData.dashboardInvoice.suppliers != null) {
          this.dashboardData.dashboardInvoice.suppliers.forEach((supplierItem, index) => {
            this.invoiceIncomeBySupplierData.push(
              new StatChartEntity({ id: (index + 1), type: supplierItem.code + "_" + index.toString(), value: supplierItem.count, color: this.getColor(3, index) })
            );
          });
        }
        this.sumsBySupplierLoaded = true;
        this.invoiceIncomeByCurrencyData = [];
        if (this.dashboardData.dashboardInvoice.currency != null) {
          this.dashboardData.dashboardInvoice.currency.forEach((currencyItem, index) => {
            this.invoiceIncomeByCurrencyData.push(
              new StatChartEntity({ id: (index + 1), type: currencyItem.name, value: currencyItem.count, color: this.getColor(8, index) })
            );
          });
        }
        this.sumsByCurrencyLoaded = true;
        this.contractByContractTypeData = [];
        if (this.dashboardData.dashboardContract.contractTypes != null) {
          this.dashboardData.dashboardContract.contractTypes.forEach((contractTypeItem, index) => {
            this.contractByContractTypeData.push(
              new StatChartEntity({ id: (index + 1), type: contractTypeItem.code, value: contractTypeItem.count, color: this.getColor(4, index) })
            );
          });
        }
        this.sumsContractByContractTypeLoaded = true;
        this.contractByRecordTypeData = [];
        if (this.dashboardData.dashboardContract.recordTypes != null) {
          this.dashboardData.dashboardContract.recordTypes.forEach((recordTypeItem, index) => {
            this.contractByRecordTypeData.push(
              new StatChartEntity({ id: (index + 1), type: recordTypeItem.code, value: recordTypeItem.count, color: this.getColor(6, index) })
            );
          });
        }
        this.sumsContractByRecordTypeLoaded = true;

        this.dataLoaded = true;
      });
    }
  }

  getColor(offset: number, index: number): string {

    let len = this.chartColors.length;
    let pos = (offset + index);

    return this.chartColors[pos % len];
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }
}

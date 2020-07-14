import { BaseEntity } from "./base.entity";

export class DashboardKeyValueEntity {
  code: string;
  count: number;
}

export class DashboardCurrencyEntity {
  name: string;
  totalAmount: number;
  count: number;
}

export class DashboardInvoiceEntity {
  count: number;
  suppliers: DashboardKeyValueEntity[];
  currency: DashboardCurrencyEntity[];
  wfInProgress: number;
  wfCompleted: number;
  wfInError: number;
}

export class DashboardContractEntity {
  count: number;
  wfInProgress: number;
  contractTypes: DashboardKeyValueEntity[];
  recordTypes: DashboardKeyValueEntity[];
}

export class DashboardEntity {

  dashboardInvoice: DashboardInvoiceEntity;
  dashboardContract: DashboardContractEntity;

  constructor(obj: {}) {
    BaseEntity.copyProperties(obj, this);
  }
}

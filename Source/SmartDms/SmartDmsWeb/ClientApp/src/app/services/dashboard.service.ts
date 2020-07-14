import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { DashboardEntity } from "../entities/dashboard.entity";
import gql from "graphql-tag";

@Injectable()
export class DashboardService {

  readonly dashboardUrl: string = "/api/spring/dashboard/";

  public dashboardData: DashboardEntity = new DashboardEntity({});

  // We use the gql tag to parse our query string into a query document
  public readonly dashboardDataQuery = gql`
  query DashboardDataQuery($userId: Guid!) {
    dashboardData(userId: $userId) {
      Documents
    }
  }`;

  constructor(private http: HttpClient) {
  }

  public getDashboardData(): Observable<DashboardEntity> {

    return this.http.get<DashboardEntity>(this.dashboardUrl).map(d => {
      this.dashboardData = d
      return d;
    });
  }
}

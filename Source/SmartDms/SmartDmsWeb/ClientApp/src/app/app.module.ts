import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './components/dashboard';
import { StatChartComponent } from './components/shared';
import { UserLoginComponent } from './components/users';

import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { ContractGridComponent } from './components/document/contract';
import { AuthGuardService, UserService, LogService, AuthenticationService, ConfigService, DashboardService, DocumentService, GraphqlService, NotificationService, RegisterService, ShreddingService, TaskService, UiService } from './services';
import { InMemoryCache } from 'apollo-cache-inmemory';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DashboardComponent,
    StatChartComponent, 
    UserLoginComponent,
    ContractGridComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    FormsModule,
    ChartsModule,
    ApiAuthorizationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    AuthenticationService,
    AuthGuardService,
    ConfigService,
    DashboardService,
    DocumentService,
    GraphqlService,
    LogService,
    NotificationService,
    RegisterService,
    ShreddingService,
    TaskService,
    UiService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

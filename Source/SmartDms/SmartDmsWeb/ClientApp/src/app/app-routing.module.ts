import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { DashboardComponent } from './components/dashboard';
import { UserLoginComponent } from './components/users';
import { ContractGridComponent } from './components';

const routes_config: Routes = [
  // { path: '', component: DocumentGridComponent, data: { layout: { menu: false } } },
  //{ path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'home', component: DashboardComponent/*, runGuardsAndResolvers: 'always', canActivate: [AuthGuard]*/ },
  { path: 'dashboard', component: DashboardComponent/*, runGuardsAndResolvers: 'always', canActivate: [AuthGuard]*/ },
  { path: 'login', component: UserLoginComponent },
  { path: 'contracts', component: ContractGridComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes_config, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

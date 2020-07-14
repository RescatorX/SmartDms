import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { DashboardComponent } from './components/dashboard';
import { UserLoginComponent } from './components/users';

const routes_config: Routes = [
  // { path: '', component: DocumentGridComponent, data: { layout: { menu: false } } },
  //{ path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'home', component: DashboardComponent/*, runGuardsAndResolvers: 'always', canActivate: [AuthGuard]*/ },
  { path: 'dashboard', component: DashboardComponent/*, runGuardsAndResolvers: 'always', canActivate: [AuthGuard]*/ },
  { path: 'login', component: UserLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes_config, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

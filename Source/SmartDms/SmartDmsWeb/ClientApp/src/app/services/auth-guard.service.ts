import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from "./authentication.service";
import { UserService } from "./user.service";
import { LogEntity, UserEntity } from '../entities';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService, private authenticationService: AuthenticationService, public router: Router) {
  }

  canActivate(): boolean {

    return true;
/*
    if (!this.authenticationService.userIsLogged || (this.userService.user == null)) {

      this.authenticationService.userIsLogged = false;

      this.userService.getUserUnknown(LogEntity.CreateAction(this, "AuthGuardService.canActivate.getUserUnknown")).subscribe((user: any) => {
        if (user) {
          if (user.login) { this.authenticationService.loggedUserLogin = user.login; }
          this.userService.user = Object.assign({}, user);
          this.userService.user.userName == this.userService.unknownUserReload;

          this.userService.getUserSimple(LogEntity.CreateAction(this, "auth.interceptor.handleResponseNormal"), user.login).subscribe(u => {

            this.userService.user = UserEntity.Init(u);
            this.userService.userName = user;

            this.authenticationService.setLoginData(user, this.userService.defaultPassword);
            this.authenticationService.userIsLogged = true;

            this.authenticationService.loggedUserLogin = u.userName;

            this.router.navigate(['/home']);
            return true;
          });
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }, (error) => {
        console.log("No after refresh user searched.");
        this.router.navigate(['/login']);
        return false;
      });
    }
    return true;
*/
  }
}

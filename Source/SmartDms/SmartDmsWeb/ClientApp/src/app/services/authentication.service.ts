import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { } from '../code/global.const';
import { UserService } from './user.service';
import { LogEntity, UserEntity } from '../entities';
import { Consts } from '../code/global.const';
import { HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { BehaviorSubject } from 'rxjs';
import { Utils } from '../code';

@Injectable()
export class AuthenticationService {

  readonly logoutUrl: string = "/api/users/logout";
  //readonly logoutUrl: string = "/api/spring/logout/{user}";

  // props
  public userIsLogged: boolean = false;
  public userIsLogged$: BehaviorSubject<boolean>;

  public loggedUser: UserEntity;
  public loggedUserLogin: string;
  public loggedUserPassword: string;

  // ctor
  constructor(private userService: UserService, private http: HttpClient) {
    this.userIsLogged$ = <BehaviorSubject<boolean>>(new BehaviorSubject(false));
  }

  public getAuth(): string {
    if (this.loggedUserLogin != null) {
      if (this.loggedUserPassword == null) {
        //this.alertService.info("Warning: Using default password !!!");
        this.loggedUserPassword = "Nimda2018*";
      }
      return btoa(this.loggedUserLogin + ":" + this.loggedUserPassword);
    } else {
      //this.alertService.info("Warning: Using alternate login 'pvalenta' !!!");
      return btoa('pvalenta:Nimda2018*');
    }
  }

  public setLoginData(username: string, password: string) {
    this.loggedUser = new UserEntity({});
    this.loggedUserLogin = username;
    this.loggedUserPassword = password;
    this.userIsLogged = false;
  }
}

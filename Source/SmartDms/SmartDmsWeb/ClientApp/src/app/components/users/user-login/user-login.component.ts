import { Component, OnInit, ViewChild, Injector, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { matchPasswordValidator } from '../../../code';
import { LogEntity, UserEntity } from '../../../entities';
import { AuthenticationService, NotificationService, UserService, UiService } from '../../../services';
import * as $ from 'jquery';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  @Output() onPasswordChanged = new EventEmitter<UserEntity>();

  modalRef: BsModalRef;

  public user: UserEntity = new UserEntity({});
  public username: string = "";
  public password: string = "";
  public passwordRepeat: string = "";
  public isChangePassword: boolean = false;
  public loginError: string = "";

  private previousPage: string;

  public get Res(): any {
    return this.uiService.configService.res;
  }

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private uiService: UiService,
    private activatedRouter: ActivatedRoute, private authenticationService: AuthenticationService, private modalService: BsModalService) {

    let loginType = this.activatedRouter.snapshot.paramMap.get("loginType");
    if (loginType != null) {
      if (loginType.includes("change")) {
        this.isChangePassword = true;
      }
    }
    this.previousPage = this.route.snapshot.queryParamMap.get("redirectTo");

    if (userService.user != null) {
      this.user = userService.user;
    }
    if (this.user == null) {
      this.user = new UserEntity({});
    }
  }

  ngOnInit() {
  }

  onConfirm() {
    if (true/*this.inputForm.valid*/) {
      this.user.password = this.password
      //this.user.isChangePassword = false;
      this.userService.updatePassword(LogEntity.CreateAction(this, "changePassword"), this.user).then((user) => {
        this.onPasswordChanged.emit(user);

        //this.modalTemplate.close();
        this.router.navigate([this.previousPage]);
      });
    }
  }

  close() {
    //this.modalTemplate.close();

    if (this.previousPage != null) {
      this.router.navigate([this.previousPage]);
    } else {
      this.router.navigate(['/home']);
    }
  }

  onClose() {
    /*
        this.close();
    */
  }

  login() {

    this.authenticationService.setLoginData(this.username, this.password);

    this.authenticationService.loggedUserLogin = this.username;
    this.authenticationService.userIsLogged = false;

    this.userService.getUserSimple(LogEntity.CreateAction(this, "auth.interceptor.handleResponseNormal"), this.username).subscribe(u => {
      if (u != null) {
        if (u.userName) { this.authenticationService.loggedUserLogin = u.userName; }
        this.userService.user = UserEntity.Init(u);
        this.authenticationService.userIsLogged = true;
        this.previousPage = null;
        this.close();
      } else {
        throw ("No user found");
      }
    }, (error) => {
      this.loginError = JSON.stringify(error);
      //this.router.navigate(["/login"]);
    });
  }

  changePassword() {

    this.userService.updatePassword(LogEntity.CreateAction(this, "UserLoginComponent.changePassword.changePassword"), this.user)
      .then(user => this.userService.loadUser(LogEntity.CreateAction(this, "UserLoginComponent.changePassword.loadUser"), this.username));
    this.onClose();
  }

  onEnter(event) {
    console.log("onEnter: " + JSON.stringify(event));

    if (this.isChangePassword) {
      this.changePassword();
    } else {
      this.login();
    }
  }
}

import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpHeaders, HttpResponse, HttpEventType, HttpErrorResponse
} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { Consts } from '../code/global.const';
import { Router } from '@angular/router';
import { UiService } from '../services/ui.service';
import { Subject } from 'rxjs/Subject';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { LogEntity } from '../entities';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public authenticationService: AuthenticationService, public userService: UserService, private router: Router, private uiService: UiService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let headrsObj = {
            // Authorization: `Basic ${this.auth.getAuth()}`,
            ...Consts.requestHeader,
        }
        let log = this.uiService.logService.getLastActionLog();
        if (log) {
            headrsObj["kmc_event_control_id"] = log.sourceStr;
        }
        let headers = new HttpHeaders(headrsObj);
        let cloneRequest: HttpRequest<any> = null;

        if (this.authenticationService.loggedUserLogin == null) {
            this.authenticationService.loggedUserLogin = this.userService.unknownUserReload;
        }

        // standard request
        cloneRequest = request.clone({ 
            // set current user authorization token
            headers: headers
            .set('Authorization', 'Basic ' + this.authenticationService.getAuth())
            .set(Consts.responseHeaders.user, this.authenticationService.loggedUserLogin)
        });

        return next.handle(cloneRequest)
            .timeout(this.uiService.configService.getValueSynch("kmweb.requestTimeout"))
            .catch(err => this.handleError(err))
            .do((event: HttpEvent<any>) => this.handleResponse(event));
    }

    private handleResponse(event: HttpEvent<any>) {
        //in every response detect if logged user has changed. If changed than load him and check if he has to change password.
        if (event.type == HttpEventType.Response) {
            let user = event.headers.get(Consts.responseHeaders.user);
            if (user) {
                let validForUse: boolean = 
                (((this.authenticationService.loggedUserLogin != null) && (this.authenticationService.loggedUserLogin != this.userService.unknownUserReload)) ||
                ((this.authenticationService.loggedUserLogin == null) || (this.authenticationService.loggedUserLogin != user)));

                if (validForUse) {
                    if ((this.authenticationService.loggedUserLogin == null) || (this.authenticationService.loggedUserLogin != user)) {
                        this.authenticationService.loggedUserLogin = user;
                        this.userService.getUserSimple(LogEntity.CreateAction(this, "auth.interceptor.handleResponseNormal"), user).subscribe(u => {

                            this.userService.user = UserEntity.Init(u);
                            this.userService.user$.next(this.userService.user);
                            this.userService.userName = user;

                            this.authenticationService.setLoginData(user, this.userService.defaultPassword);
                            this.authenticationService.userIsLogged = true;

                            this.authenticationService.loggedUserLogin = u.login;

                            if (u.isChangePassword && document.location.pathname.indexOf("/login") < 0) {
                                this.router.navigate(["/login"], {
                                    queryParams: {
                                        redirectTo: document.location.pathname
                                    }
                                });
                            }
                        });
                    }
                } else {
                    //console.log("AuthInterceptor: No valid kmc_user: " + user);
                }
            } else {
                //console.log("No kmc_user got from response");
            }
        }
    }

    private handleError(err: HttpErrorResponse): Observable<any> {
        this.uiService.stopLoading();
        if (err.status >= 400) {
            if (err.status == 460) {
                //this.uiService.notificationService.customLog(err);
                this.router.navigate(["/login"]);
            } else {
                this.uiService.notificationService.err(err);
            }
        } else if (err.name == "TimeoutError") {
            this.uiService.notificationService.err(err);
        }
        // handle your auth error or rethrow
        return Observable.throw(err);
    }

    private ignoreError(): Observable<any> {
        this.uiService.stopLoading();
        
        let active: boolean = false;

        // handle your auth error or rethrow
        return new Observable((observer) => {
            const handler = (e) => observer.next(e);
        });
    }
}

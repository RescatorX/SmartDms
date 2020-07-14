import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap, tap, finalize } from 'rxjs/operators';
import { AuthorizeService } from './authorize.service';
import { UiService } from '../app/services/ui.service';
import { AuthenticationService } from '../app/services/authentication.service';
import { Consts } from '../app/code';
import { UserService } from '../app/services/user.service';
import { UserEntity, LogEntity } from '../app/entities';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private router: Router, private uiService: UiService, private userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //return this.authorize.getAccessToken().pipe(mergeMap(token => this.processRequestWithToken(token, req, next)));

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
      //.timeout(this.uiService.configService.getValueSynch("kmweb.requestTimeout"))
      .catch(err => this.handleError(err))
      .pipe(
        tap(

          ((event: HttpEvent<any>) => this.handleResponse(event)
/*
          // Succeeds when there is a response; ignore other events
          event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          error => ok = 'failed'
*/
          ),
          // Log when response observable either completes or errors
          finalize(() => {
/*
          const elapsed = Date.now() - started;
          const msg = `${request.method} "${request.urlWithParams}"
              ${ok} in ${elapsed} ms.`;
          this.messenger.add(msg);
*/
          })
        )
      );
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
              this.userService.userName = user;

              this.authenticationService.setLoginData(user, this.userService.defaultPassword);
              this.authenticationService.userIsLogged = true;

              this.authenticationService.loggedUserLogin = u.userName;

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
    }
/*
    else if (err.name == "TimeoutError") {
      this.uiService.notificationService.err(err);
    }
*/
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

  private isSameOriginUrl(req: any) {
    // It's an absolute url with the same origin.
    if (req.url.startsWith(`${window.location.origin}/`)) {
      return true;
    }

    // It's a protocol relative url with the same origin.
    // For example: //www.example.com/api/Products
    if (req.url.startsWith(`//${window.location.host}/`)) {
      return true;
    }

    // It's a relative url like /api/Products
    if (/^\/[^\/].*/.test(req.url)) {
      return true;
    }

    // It's an absolute or protocol relative url that
    // doesn't have the same origin.
    return false;
  }
}

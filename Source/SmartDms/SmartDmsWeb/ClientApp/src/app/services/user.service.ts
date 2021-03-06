import { Injectable } from '@angular/core';
import { LogEntity, UserEntity } from '../entities';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../code/utils';
import { Observable, BehaviorSubject } from 'rxjs';
import { LogService } from './log.service';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

    public userName: string;
    public user: UserEntity = new UserEntity({});
    public users: UserEntity[];

    serviceIdentUrl = "/api/spring/users/findByIdent/{ident}";
    serviceUrl = "/api/users/{user}";
    userByEmailUrl = "/api/users/{email}";
    serviceAllUsersUrl = "/api/users?offset=0&limit=1000";
    serviceUsersUrl = "/api/users";
    logoutUserUrl = "/api/spring/users/logout/{user}";

    private usersGraphQLUrl: "/graphql?query={users%20{id%20firstName%20lastName}}";

    public readonly unknownUserReload: string = "reload";
    public readonly defaultPassword: string = "Nimda2018*";

    constructor(private http: HttpClient, private logService: LogService) {
        this.user = new UserEntity({});
    }

    loadUser(log: LogEntity, userName: string): Observable<UserEntity> {
        this.userName = userName;
        let currentUser = null;
        if (this.user != null) {
            currentUser = this.user.userName;
        }
        if ((currentUser == null) || (currentUser != userName)) {
            this.getUser(log, userName).subscribe(user => {
                this.user = UserEntity.Init(user);
            }, (error) => {
                throw ("No such user '" + userName + "'");
            })
        }
        return Observable.of(this.user);
    }

    getUser(log: LogEntity, userName: string): Observable<UserEntity> {
        if (userName) {
            let url = Utils.Replace(this.serviceUrl, { user: userName });
            this.logService.log(log);
            return this.http.get<UserEntity>(url).share();
        };
    }

    getUserSimple(log: LogEntity, userName: string): Observable<UserEntity> {
        if (userName) {
            let url = Utils.Replace(this.serviceUrl, { user: userName });
            this.logService.log(log);
            return this.http.get<UserEntity>(url);
        };
    }

    getUserUnknown(log: LogEntity): Observable<UserEntity> {
        let url = Utils.Replace(this.serviceUrl, { user: this.unknownUserReload });
        this.logService.log(log);
        return this.http.get<UserEntity>(url);
    }

    getUserByEmail(log: LogEntity, userEmail: string): Observable<UserEntity> {
        if (userEmail) {
            let url = Utils.Replace(this.userByEmailUrl, { email: userEmail });
            this.logService.log(log);
            return this.http.get<UserEntity>(url).share();
        };
    }

    getUserByIdent(log: LogEntity, userIdent: string): Observable<UserEntity> {
        if (userIdent) {
            let url = Utils.Replace(this.serviceIdentUrl, { ident: userIdent });
            this.logService.log(log);
            return this.http.get<UserEntity>(url).share();
        };
    }

    isLoginExists(login: string): Observable<any> {
        if (login) {
            let url = Utils.Replace(this.serviceUrl, { user: login });
            return this.http.get(url).catch(() => {
                return Observable.of({ loginNotFound: true });
            }).map((u: any) => {
                return { loginNotFound: u.loginNotFound ? true : false };
            })
        };
    }

    getUsers(log: LogEntity): Observable<UserEntity[]> {
        this.logService.log(log);
        return this.http.get<UserEntity[]>(this.serviceUsersUrl + "?limit=100&sort=ORDER%20BY%20surname%20ASC").map(data => {
            this.users = data;
            return this.users;
        });
    }

    getAllUsers(log: LogEntity) {
        this.logService.log(log);
        return this.http.get<UserEntity[]>(this.serviceAllUsersUrl);
    }

    loadUsers(log: LogEntity): Observable<UserEntity[]> {
        this.users = [];
        this.getUsers(log).subscribe(users => {
            this.users = users;
        })
        return Observable.of(this.users);
    }

    updateUser(log: LogEntity, updatingUser: UserEntity): Promise<UserEntity> {
        this.logService.log(log);

        let url = Utils.Replace(this.serviceUrl, { user: updatingUser.userName });
        return this.http.put<UserEntity>(url, updatingUser).toPromise();
    }

    updatePassword(log: LogEntity, updatingUser: UserEntity): Promise<UserEntity> {
        return this.updateUser(log, updatingUser);
    }

    createUser(log: LogEntity, user: UserEntity): Promise<UserEntity> {
        this.logService.log(log);
        return this.http.post<UserEntity>(this.serviceUsersUrl, user).map(user => {
            return user;
        }).toPromise()
    }

    logoutUser(log: LogEntity, userName: string): Observable<boolean> {
        if (userName) {
            let url = Utils.Replace(this.logoutUserUrl, { user: userName });
            this.logService.log(log);
            return this.http.get<boolean>(url);
        };
    }
}

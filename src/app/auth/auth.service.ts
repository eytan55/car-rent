import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _firebaseAPIKey = 'AIzaSyDCfvqAcnlByHnrcElG32T3IvpIKSJUUKI';
  private _user = new BehaviorSubject<User>(null);

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return !!user.token;
      } else {
        return false;
      }
      })
      );
    }

  get userId() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return user.id;
      } else {
        return null;
      }
      })
      );
  }

  get firebaseAPIKey() {
    return this._firebaseAPIKey;
  }

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    const options = { headers: headers };

    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.firebaseAPIKey}`,
    { email, password, returnSecureToken: true }, options
    ).pipe(tap(this.setUserdata.bind(this)));
  }

  login(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    const options = { headers: headers };

    // tslint:disable-next-line: max-line-length
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseAPIKey}`,
    { email, password, returnSecureToken: true }, options
    ).pipe(tap(this.setUserdata.bind(this)));
  }

  logout() {
    this._user.next(null);
  }

  private setUserdata(userData: AuthResponseData) {
      const expirationTime = new Date(new Date().getTime() + (+userData.expiresIn * 1000));
      this._user.next(new User(userData.localId, userData.email, userData.idToken, expirationTime));
  }
}

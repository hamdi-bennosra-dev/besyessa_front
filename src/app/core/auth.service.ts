import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { AuthModel } from '../models/auth.model';
import { AuthHTTPService } from './auth-http.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/register-request.model';
import { RegisterDto } from '../models/register-dto.model';
import { TokenDto } from '../models/token-dto.model';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request.model';
import { baseUrl } from '../shared/paseApi';
import { User } from '../models/user';

export type UserType = User | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private apiUrl = environment.apiUrl;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  private authLocalStorageUser = `${environment.appVersion}-user`;
  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private http: HttpClient,
    private router: Router,
    private _httpClient: HttpClient, private _router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject =  new BehaviorSubject<UserType>(undefined);

    this.initUser();
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable(); 
  }

  // public methods
  login(username: string, password: string): Observable<TokenDto> {
    this.isLoadingSubject.next(true);
    return this.http.post<TokenDto>(this.apiUrl + "auth/login", { username, password });
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + "user/getUserByUsername/" + username);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + "user/getUserById/" + id);
  }

  setUserFromLocalStorage(user: User) {
    if (user)
      localStorage.setItem(this.authLocalStorageUser, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  initUser() {
    try {
      const user = localStorage.getItem(this.authLocalStorageUser);
      if (user){
        this.currentUserSubject.next(JSON.parse(user) as User);
      } else this.currentUserSubject.next(undefined);
    } catch {
      this.currentUserSubject.next(undefined);
    }
  }

  getToken(): string {
    try {
      const token = localStorage.getItem(this.authLocalStorageToken);
      if (token)
        return (JSON.parse(token) as AuthModel).authToken;
      return ''
    } catch {
      return '';
    }

  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    localStorage.removeItem(this.authLocalStorageUser);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }


  register(registerRequest: RegisterRequest): Observable<RegisterDto> {
    return this.http.post<RegisterDto>(`${this.apiUrl}auth/register`, registerRequest);
  }

 /* forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }*/

  public setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.authToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  // private methods
  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  signUp(user: object): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/v1/auth/signup`, user);
  }

  signIn(user: object): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/v1/auth/signin`, user);
  }
  sinOut(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}



/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../shared/paseApi';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient, private _router: Router) {}
  signUp(user: object): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/v1/auth/signup`, user);
  }

  signIn(user: object): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/v1/auth/signin`, user);
  }
  sinOut(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}*/

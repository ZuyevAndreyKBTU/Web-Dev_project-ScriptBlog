import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import jwtDecode from 'jwt-decode'; // Ensure this is the only jwtDecode import
import moment from 'moment';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiRoot = `${environment.apiUrl}/auth/`;

  constructor(private http: HttpClient) { }

  private setSession(authResult: any) {
    const token = authResult.token;
    const payload = jwtDecode<JWTPayload>(token); // Use generic directly if @types/jwt-decode supports it
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiRoot.concat('login/'), { username, password }).pipe(
      tap(response => this.setSession(response)),
      shareReplay()
    );
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiRoot.concat('signup/'), { username, email, password }).pipe(
      tap(response => this.setSession(response)),
      shareReplay()
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  refreshToken(): Observable<any> | undefined {
    if (moment().isBefore(this.getExpiration().subtract(1, 'days'))) {
      return this.http.post<any>(this.apiRoot.concat('refresh-token/'), { token: this.token }).pipe(
        tap(response => this.setSession(response)),
        shareReplay()
      );
    }
    return undefined;
  }
  

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.authService.refreshToken();
      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['login']);
      return false;
    }
  }
}

interface JWTPayload {
    user_id: number;
    username: string;
    email: string;
    exp: number;
  }
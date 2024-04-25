   import { Injectable } from '@angular/core';
   import { HttpClient } from '@angular/common/http';
   import { Observable } from 'rxjs';

   @Injectable({
     providedIn: 'root'
   })
   export class AuthService {
     private apiUrl = 'http://127.0.0.1:8000/auth/';

     constructor(private http: HttpClient) {}

     login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login/`, { username, password });
      }
     signup(username: string, email: string, password: string): Observable<any> {
       return this.http.post(`${this.apiUrl}/signup/`, { username, email, password });
     }
   }
   
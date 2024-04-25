import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <h1>Login</h1>
      <input #username type='text' placeholder='username'>
      <input #password type='password' placeholder='password'>
      <button (click)="login(username.value, password.value)">Login</button>
      <p *ngIf="error">{{ error }}</p>
    </div>
  `
})
export class LoginComponent {
  error: string = '';

  constructor(private authService: AuthService) { }

  login(username: string, password: string): void {
    this.authService.login(username, password).subscribe({
      next: () => console.log('Login successful'),
      error: (e: any) => this.error = e.error.error || 'An error occurred during login'
    });
  }  
}
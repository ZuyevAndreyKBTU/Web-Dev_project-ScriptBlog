import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-signup',
  template: `
  <div style="text-align:center">
    <h1>Signup</h1>
  </div>

  <input #username type='text' placeholder='Username'>
  <input #email type='text' placeholder='Email'>
  <input #password1 type='password' placeholder='Password'>
  <input #password2 type='password' placeholder='Confirm Password'>
  <button (click)="signup(username.value, email.value, password1.value, password2.value)">Signup</button>
  <p *ngIf="error">{{ error }}</p>
  `
})
export class SignupComponent implements OnInit {
  error?: string;  // Optional string, initially undefined

  constructor(private authService: AuthService) { }  // Inject AuthService

  ngOnInit() {
  }

  signup(username: string, email: string, password1: string, password2: string): void {
    if (password1 !== password2) {
      this.error = "Passwords do not match.";
      return;
    }
    this.authService.signup(username, email, password1).subscribe({
      next: () => console.log('Signup successful'),
      error: (err) => this.error = err.error.error || 'An error occurred during signup'
    });
  }
}
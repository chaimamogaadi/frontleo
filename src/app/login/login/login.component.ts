import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };
  isSignup = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    if (this.isSignup) {
      this.authService.signup(this.user).subscribe({
        next: (response) => {
          this.authService.setCurrentUser(response);
          this.router.navigate(['/equipment']);
        },
        error: (error) => console.error('Signup failed:', error)
      });
    } else {
      this.authService.signin(this.user).subscribe({
        next: (response) => {
          this.authService.setCurrentUser(response);
          this.router.navigate(['/equipment']);
        },
        error: (error) => console.error('Login failed:', error)
      });
    }
  }
}

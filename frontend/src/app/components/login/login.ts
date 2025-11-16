import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule, 
    FormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credentials = { email: '', password: '' };
  hide = true;
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.submitted = true;

    if (!this.credentials.email || !this.credentials.password) {
      return;
    }

    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.accessToken);
        this.router.navigate(['/articles']);
      },
      error: () => {
        alert('Connexion échouée. Veuillez vérifier vos identifiants.');
      }
    });
  }
}

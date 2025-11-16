import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  imports: [CommonModule, MatInputModule, FormsModule, MatCardModule, MatFormFieldModule, MatOptionModule, MatSelectModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  user = { username: '', email: '', password: '', role: 'admin' }
  hide = true;

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (!this.user.username || !this.user.email || !this.user.password || !this.user.role) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    this.authService.register(this.user).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => alert('Échec de l\'inscription')
    });
  }
}

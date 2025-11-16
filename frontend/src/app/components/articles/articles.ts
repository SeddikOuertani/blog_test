import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ArticleForm } from '../article-form/article-form';


@Component({
  selector: 'app-articles',
  imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule],
  templateUrl: './articles.html',
  styleUrl: './articles.css',
})
export class Articles {
  displayedColumns: string[] = ['title', 'author', 'createdAt', 'comments', 'actions'];
  articles: any[] = [];
  unreadCommentsCount: { [articleId: string]: number } = {};

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.http
      .get<{ data: any[] }>(`${environment.apiUrl}/api/articles`)
      .subscribe((res: any) => {
        this.articles = res
      });
  }

  deleteArticle(id: string): void {
    this.http
      .delete(`${environment.apiUrl}/api/articles/${id}`)
      .subscribe({
        next: () => {
          this.loadArticles();
          this.snackBar.open('🗑️ Article supprimé avec succès', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
        },
        error: (err) => {
          const message = err.error?.error || 'Erreur inconnue';
          this.snackBar.open(`❌ ${message}`, 'Fermer', {
            duration: 4000,
            panelClass: ['snackbar-error'],
          });
        },
      });
  }

  logout(): void {
    this.authService.logout();
    this.snackBar.open('👋 Déconnecté', 'Fermer', {
      duration: 2000,
      panelClass: ['snackbar-success'],
    });
    this.router.navigate(['/login']);
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(ArticleForm, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadArticles();
      }
    });
  }
}

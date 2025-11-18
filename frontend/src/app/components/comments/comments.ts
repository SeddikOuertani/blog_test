import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-comments',
  imports: [CommonModule, MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments implements OnInit {
  comments: any[] = [];
  newComment = '';
  articleId: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {
    this.articleId = data.articleId;
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.http
      .get<{ data: any[] }>(
        `${environment.apiUrl}/api/comments/articles/${this.data.articleId}/comments`
      )
      .subscribe((res) => {
        this.comments = res.data;
      });
  }

  sendComment(): void {
    if (!this.newComment.trim()) return;

    this.http
      .post(`${environment.apiUrl}/api/comments/articles/${this.data.articleId}/comments`, {
        content: this.newComment,
      })
      .subscribe(() => {
        this.newComment = '';
      });
  }
}

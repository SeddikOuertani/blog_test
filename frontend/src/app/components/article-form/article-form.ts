import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '@env/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

 

@Component({
  selector: 'app-article-form',
  imports: [MatFormFieldModule, FormsModule, CommonModule, MatCardModule, MatInputModule],
  templateUrl: './article-form.html',
  styleUrl: './article-form.css',
})
export class ArticleForm {

  isEdit = false;
  article = {
    title: '',
    content: ''
  }
  tagsInput = '';
  selectedImage: File | null = null;

 constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ArticleForm>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.article) {
      this.isEdit = true;
      this.article = {
        title: data.article.title,
        content: data.article.content
      };
      this.tagsInput = data.article.tags.join(', ');
    }
  }

 saveArticle(): void {
  const formData = new FormData();

  formData.append('title', this.article.title);
  formData.append('content', this.article.content);

  const tagsArray = this.tagsInput
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

  formData.append('tags', JSON.stringify(tagsArray));

  if (this.selectedImage) {
    formData.append('image', this.selectedImage);
  }
  
  let payload: any = {}
  formData.forEach((value, key) => {
    console.log(key, value);
    payload[key] = value;
  });


  const req = this.isEdit
    ? this.http.put(`${environment.apiUrl}/api/articles/${this.data.article._id}`, payload)
    : this.http.post(`${environment.apiUrl}/api/articles`, payload);

  req.subscribe({
    next: () => {
      this.dialogRef.close(true);
      this.snackBar.open(
        this.isEdit ? '✅ Article modifié avec succès' : '✅ Article créé avec succès',
        'Fermer',
        { duration: 3000, panelClass: ['snackbar-success'] }
      );
    },
    error: (err) => {
      const message = err.error?.error || 'Erreur lors de l\'enregistrement';
      this.snackBar.open(`❌ ${message}`, 'Fermer', {
        duration: 4000,
        panelClass: ['snackbar-error']
      });
    }
  });
}

}

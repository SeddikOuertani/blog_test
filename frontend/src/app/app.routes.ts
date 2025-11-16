import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Articles } from './components/articles/articles';
import { ArticleForm } from './components/article-form/article-form';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'articles', component: Articles, canActivate: [AuthGuard]},
  { path: 'articles/new', component: ArticleForm, canActivate: [AuthGuard] },
  { path: 'articles/edit/:id', component: ArticleForm, canActivate: [AuthGuard] },
];


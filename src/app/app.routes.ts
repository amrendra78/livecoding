import { SignupComponent } from './signup/signup';
import { LoginComponent } from './login/login';
import { HomeComponent } from './home/home';
import { EditorComponent } from './editor/editor';

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'editor/:roomId',
    component: EditorComponent,
    data: { renderMode: 'ssr' } // SSR mode for dynamic route
  },
];

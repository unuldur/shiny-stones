import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';

export const routes: Routes = [
  {
    path: 'accueil',
    component: AccueilComponent,
  },
  {
    path: '**',
    redirectTo: 'accueil',
  },
];

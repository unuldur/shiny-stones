import { ContactComponent } from './pages/contact/contact.component';
import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { PierresComponent } from './pages/pierres/pierres.component';
import { CgvuComponent } from './pages/cgvu/cgvu.component';

export const routes: Routes = [
  {
    path: 'accueil',
    component: AccueilComponent,
  },
  {
    path: 'fiche-pierre',
    component: PierresComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'cgvu',
    component: CgvuComponent,
  },
  {
    path: '**',
    redirectTo: 'accueil',
  },
];

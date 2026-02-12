import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Plans } from './pages/plans/plans';
import { Licenses } from './pages/licenses/licenses';

export const routes: Routes = [
   { path: 'inicio', component: Inicio },
   { path: 'about', component: About },
   { path: 'contact', component: Contact },
   { path: 'plans', component: Plans },
   { path: 'licenses', component: Licenses },
   { path: '', redirectTo: '/inicio', pathMatch: 'full' },
   { path: '**', redirectTo: '/inicio' },
];

import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { Terms } from './pages/terms/terms';

import { Platform } from './sections/platform/platform';
import { Architecture } from './sections/architecture/architecture';
import { Diagnostics } from './sections/diagnostics/diagnostics';
import { Philosophy } from './sections/philosophy/philosophy';
import { News } from './sections/news/news';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'platform', component: Platform },
  { path: 'architecture', component: Architecture },
  { path: 'diagnostics', component: Diagnostics },
  { path: 'philosophy', component: Philosophy },
  { path: 'news', component: News },

  { path: 'contact', component: Contact },
  { path: 'terms', component: Terms },

  { path: '**', redirectTo: '' },
];
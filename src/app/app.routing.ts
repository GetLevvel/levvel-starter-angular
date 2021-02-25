import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
    pathMatch: 'full',
  },

  // Otherwise redirect back to Home
  { path: '**', redirectTo: '' },
];

export const RoutingModule = RouterModule.forRoot(appRoutes, {
  preloadingStrategy: PreloadAllModules,
});

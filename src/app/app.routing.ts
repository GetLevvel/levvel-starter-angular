import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { AppGuard } from './app.guard';
import { LoginGuard } from './components/login/login.guard';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
    pathMatch: 'full',
    canActivate: [AppGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'logout',
    loadChildren: () =>
      import('./components/logout/logout.module').then((m) => m.LogoutModule),
    pathMatch: 'full',
  },

  // Otherwise redirect back to Home
  { path: '**', redirectTo: '', canActivate: [AppGuard] },
];

export const RoutingModule = RouterModule.forRoot(appRoutes, {
  preloadingStrategy: PreloadAllModules,
});

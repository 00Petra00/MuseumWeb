import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsModule),
    canActivate: [AuthGuard]
  },
  {
     path: 'not-found',
     loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'add-exhibition',
    loadChildren: () => import('./pages/add-exhibition/add-exhibition.module').then(m => m.AddExhibitionModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-exhibition/:id',
    loadChildren: () => import('./pages/add-exhibition/add-exhibition.module').then(m => m.AddExhibitionModule),
    canActivate: [AuthGuard]
  },
  { path: 'edit-exhibition/:id',
    loadChildren: () => import('./pages/edit-exhibition/edit-exhibition.module').then(m => m.EditExhibitionModule),
    canActivate: [AuthGuard]
   },
  { path: 'my-tickets', loadChildren: () => import('./pages/my-tickets/my-tickets.module').then(m => m.MyTicketsModule) },
   {
    path: '**',
    redirectTo: '/not-found'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'cars', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'cars', loadChildren: './cars/cars.module#CarsPageModule' },
  { path: 'cars/new', loadChildren: './cars/new-car/new-car.module#NewCarPageModule', canLoad: [AuthGuard] },
  { path: 'cars/user-cars', loadChildren: './cars/user-car/user-car.module#UserCarPageModule', canLoad: [AuthGuard] },
  { path: 'cars/send-message', loadChildren: './cars/send-message/send-message.module#SendMessagePageModule', canLoad: [AuthGuard] },
  { path: 'cars/my-messages', loadChildren: './cars/my-messages/my-messages.module#MyMessagesPageModule', canLoad: [AuthGuard] },
  { path: '**', redirectTo: '/cars', pathMatch: 'full' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

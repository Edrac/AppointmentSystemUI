import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: 'dashboard',
    loadChildren: () => import('src/app/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
  },{
    path: 'registration',
    loadChildren: () => import('src/app/pages/registration/registration.module').then(m => m.RegistrationModule),
  }, {
    path: 'booking',
    loadChildren: () => import('src/app/pages/booking/booking.module').then(m => m.BookingModule),
  }
];

const config: ExtraOptions = {
  useHash: false,
};
@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentAppointmentsComponent } from './current-appointments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: CurrentAppointmentsComponent,
  },
];

@NgModule({
  declarations: [
    CurrentAppointmentsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CurrentAppointmentsModule { }

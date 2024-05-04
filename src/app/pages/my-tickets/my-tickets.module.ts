import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTicketsRoutingModule } from './my-tickets-routing.module';
import { MyTicketsComponent } from './my-tickets.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    MyTicketsComponent
  ],
  imports: [
    CommonModule,
    MyTicketsRoutingModule,
    SharedModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinner,
    MatCardModule
  ]
})
export class MyTicketsModule { }

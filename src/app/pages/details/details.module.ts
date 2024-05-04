import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { MatCardModule } from '@angular/material/card'
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SharedModule } from '../../shared/shared/shared.module';


@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    MatCardModule,
    MatButton,
    MatProgressSpinner,
    SharedModule
  ]
})
export class DetailsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddExhibitionRoutingModule } from './add-exhibition-routing.module';
import { AddExhibitionComponent } from './add-exhibition.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AddExhibitionComponent
  ],
  imports: [
    CommonModule,
    AddExhibitionRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinner
  ]
})
export class AddExhibitionModule { }

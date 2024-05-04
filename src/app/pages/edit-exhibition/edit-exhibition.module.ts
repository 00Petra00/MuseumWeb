import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditExhibitionRoutingModule } from './edit-exhibition-routing.module';
import { EditExhibitionComponent } from './edit-exhibition.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SharedModule } from '../../shared/shared/shared.module';


@NgModule({
    declarations: [
        EditExhibitionComponent
    ],
    imports: [
        CommonModule,
        EditExhibitionRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatProgressSpinner,
        SharedModule
    ]
})
export class EditExhibitionModule { }

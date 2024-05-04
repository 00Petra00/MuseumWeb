import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditExhibitionComponent } from './edit-exhibition.component';

const routes: Routes = [{ path: '', component: EditExhibitionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditExhibitionRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExhibitionComponent } from './add-exhibition.component';

const routes: Routes = [{ path: '', component: AddExhibitionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddExhibitionRoutingModule { }

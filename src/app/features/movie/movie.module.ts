import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './movie.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

const routes: Routes = [
  {
    path: ':id',
    component: MovieDetailsComponent
   }
 ];

@NgModule({
  declarations: [MovieDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgCircleProgressModule
  ],
  exports: [MovieDetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MovieModule { }

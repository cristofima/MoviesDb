import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvDetailsComponent } from './tv.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

const routes: Routes = [
  {
    path: ':id',
    component: TvDetailsComponent
   }
 ];

@NgModule({
  declarations: [
    TvDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgCircleProgressModule
  ],
  exports: [
    TvDetailsComponent
  ]
})
export class TvModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvDetailsComponent } from './components/tv.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@/shared/shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { TvService } from './services/tv.service';
import { TranslateModule } from '@ngx-translate/core';

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
    NgCircleProgressModule,
    TranslateModule
  ],
  exports: [
    TvDetailsComponent
  ],
  providers: [TvService]
})
export class TvModule { }

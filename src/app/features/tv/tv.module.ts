import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvDetailsComponent } from './components/details/tv.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@/shared/shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { TvService } from './services/tv.service';
import { TranslateModule } from '@ngx-translate/core';
import { SeasonsComponent } from './components/seasons/seasons.component';
import { SeasonsService } from './services/seasons.service';

const routes: Routes = [
  {
    path: ':id',
    component: TvDetailsComponent
  },
  {
    path: ':id/seasons',
    component: SeasonsComponent
  }
 ];

@NgModule({
  declarations: [
    TvDetailsComponent,
    SeasonsComponent
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
  providers: [TvService, SeasonsService]
})
export class TvModule { }

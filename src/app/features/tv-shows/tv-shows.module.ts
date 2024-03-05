import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowsComponent } from './components/tv-shows.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TvShowsComponent
  }
];

@NgModule({
  declarations: [
    TvShowsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class TvShowsModule { }

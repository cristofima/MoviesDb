import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './components/movies/movies.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MediaService } from './services/media.service';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent
  }
];

@NgModule({
  declarations: [MoviesComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgCircleProgressModule,
    NgbPaginationModule
  ],
  providers: [MediaService],
})
export class MoviesModule { }

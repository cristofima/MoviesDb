import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './components/details/movie.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CollectionDetailsComponent } from './components/collection/collection.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TimePipe } from './pipes/time.pipe';
import { MovieService } from './services/movie.service';
import { MediaService } from './services/media.service';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent
  },
  {
    path: ':id',
    component: MovieDetailsComponent
  },
  {
    path: 'collection/:id',
    component: CollectionDetailsComponent
  }
];

@NgModule({
  declarations: [
    MoviesComponent,
    MovieDetailsComponent, 
    CollectionDetailsComponent,
    TimePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgCircleProgressModule,
    NgbPaginationModule
  ],
  providers: [MovieService, MediaService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MovieModule { }

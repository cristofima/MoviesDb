import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './components/details/movie.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@/shared/shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CollectionDetailsComponent } from './components/collection/collection.component';
import { TimePipe } from './pipes/time.pipe';
import { MovieService } from './services/movie.service';
import { TranslateModule } from '@ngx-translate/core';
import { GenericDetailsComponent } from '@/shared/components/generic-details/generic-details.component';

const routes: Routes = [
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
    MovieDetailsComponent, 
    CollectionDetailsComponent,
    TimePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GenericDetailsComponent,
    SharedModule,
    NgCircleProgressModule,
    TranslateModule
  ],
  providers: [MovieService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MovieModule { }

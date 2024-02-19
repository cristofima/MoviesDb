import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericDetailsComponent } from './components/generic-details/generic-details.component';
import { MoviePosterComponent } from './components/movie-poster/movie-poster.component';
import { TimePipe } from './pipes/time.pipe';
import { BorderClassPipe } from './pipes/border-class.pipe';
import { CertificationPipe } from './pipes/certification.pipe';
import { RouterModule } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    GenericDetailsComponent,
    MoviePosterComponent,
    TimePipe,
    BorderClassPipe,
    CertificationPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgCircleProgressModule
  ],
  exports: [
    GenericDetailsComponent,
    MoviePosterComponent,
    TimePipe,
    BorderClassPipe,
    CertificationPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }

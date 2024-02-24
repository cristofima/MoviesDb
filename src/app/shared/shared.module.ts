import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericDetailsComponent } from './components/generic-details/generic-details.component';
import { MediaPosterComponent } from './components/media-poster/media-poster.component';
import { BorderClassPipe } from './pipes/border-class.pipe';
import { CertificationPipe } from './pipes/certification.pipe';
import { RouterModule } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    GenericDetailsComponent,
    MediaPosterComponent,
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
    MediaPosterComponent,
    BorderClassPipe,
    CertificationPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }

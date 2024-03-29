import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaPosterComponent } from './components/media-poster/media-poster.component';
import { BorderClassPipe } from './pipes/border-class.pipe';
import { CertificationPipe } from './pipes/certification.pipe';
import { RouterModule } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MediaListComponent } from './components/media-list/media-list.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MediaService } from './services/media.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MediaPosterComponent,
    BorderClassPipe,
    CertificationPipe,
    MediaListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgCircleProgressModule,
    NgbPaginationModule,
    TranslateModule
  ],
  exports: [
    MediaPosterComponent,
    MediaListComponent,
    BorderClassPipe,
    CertificationPipe
  ],
  providers: [MediaService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }

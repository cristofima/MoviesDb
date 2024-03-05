import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDetailsComponent } from './components/person.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@/shared/shared.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonService } from './services/person.service';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: ':id',
    component: PersonDetailsComponent
   }
 ];

@NgModule({
  declarations: [
    PersonDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbAccordionModule,
    TranslateModule
  ],
  exports: [
    PersonDetailsComponent
  ],
  providers: [PersonService]
})
export class PersonModule { }

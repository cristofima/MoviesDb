import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDetailsComponent } from './person.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

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
    NgbAccordionModule
  ],
  exports: [
    PersonDetailsComponent
  ]
})
export class PersonModule { }

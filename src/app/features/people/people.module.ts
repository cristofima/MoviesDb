import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from './components/people.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PeopleService } from './services/people.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: PeopleComponent
  }
];

@NgModule({
  declarations: [PeopleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbPaginationModule,
    TranslateModule
  ],
  providers: [PeopleService]
})
export class PeopleModule { }

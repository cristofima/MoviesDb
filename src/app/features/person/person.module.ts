import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDetailsComponent } from './components/person.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@/shared/shared.module';
import { PersonService } from './services/person.service';

const routes: Routes = [
  {
    path: ':id',
    component: PersonDetailsComponent
   }
 ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PersonDetailsComponent,
    SharedModule
  ],
  providers: [PersonService]
})
export class PersonModule { }

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeService } from './services/home.service';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
   }
 ];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbPaginationModule,
    SharedModule
  ],
  exports: [HomeComponent],
  providers: [HomeService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }

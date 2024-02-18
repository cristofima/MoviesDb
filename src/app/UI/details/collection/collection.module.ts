import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionDetailsComponent } from './collection.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: ':id',
    component: CollectionDetailsComponent
   }
 ];

@NgModule({
  declarations: [CollectionDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [CollectionDetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CollectionModule { }

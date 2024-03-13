import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@/shared/shared.module';
import { HomeService } from './services/home.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NavTabsComponent } from './components/nav-tabs/nav-tabs.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
   }
 ];

@NgModule({
  declarations: [HomeComponent, NavTabsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),    
    SharedModule,
    NgbNavModule,
    TranslateModule
  ],
  providers: [HomeService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { AuthserviceService } from './authservice.service';
const routes: Routes = [
  {path : 'homepage',component : HomeComponent,canActivate : [AuthserviceService]},
  {path : '',component : TemplateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

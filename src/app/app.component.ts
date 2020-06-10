import { Component } from '@angular/core';
import {ProjectServiceService} from './project-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

res : any;

  constructor(public service : ProjectServiceService,public router : Router)
  {

  }

  

}

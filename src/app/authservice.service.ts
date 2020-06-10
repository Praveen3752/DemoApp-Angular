import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ProjectServiceService } from './project-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService implements CanActivate  {

  constructor(public service : ProjectServiceService) { }

  canActivate()
  {
    if(this.service.checklogged())
    {
      return true
    }
    return false;
  }

}

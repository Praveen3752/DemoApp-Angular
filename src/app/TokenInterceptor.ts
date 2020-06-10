import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import { ProjectServiceService } from './project-service.service';
import { sample } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
  })
export class TokenInterceptor implements HttpInterceptor 
{
  
  constructor(public service : ProjectServiceService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): any 
  {
  
   // console.log(request);

  // console.log(request.url);
  

    if(request.url != "/home")
{
    request = request.clone({
      setHeaders: {
       // Authorization: `Bearer ${this.service.jwtToken}`
       Authorization : "Bearer "+this.service.jwtToken
      }
    });
}
    return next.handle(request);
  }
}
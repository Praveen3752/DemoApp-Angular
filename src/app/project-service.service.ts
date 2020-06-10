import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams,HttpErrorResponse} from '@angular/common/http';
import { map,tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  public jwtToken;
  public output : any;

  httpOptions = {
    headers : new HttpHeaders({
     // 'Content-Type' : 'application/json'
     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    })
  }
  headers = new HttpHeaders();

  constructor(public http:HttpClient,public router : Router) { }

  
  public logindata(username,password)
  {

    const headers = new HttpHeaders({Authorization : 'Basic ' + btoa(username+":"+password)});
    let params = new HttpParams();
    params = params.append('title', "hey title");
    return this.http.post('/home',params,{headers}).pipe(map(data=>
    {
      console.log(data);
      this.output = data;
      this.jwtToken = this.output.flag2;
      console.log(this.jwtToken);
      return data;
    }),
    tap(() => {},
    (err: any) => {
      console.log(err.error.error);
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        alert("Please enter the valid credentials");
        console.log("working roo");
       return err.error.error;
      };
    }
  }))
  }

  public getfilterdata()
  {
    let params = new HttpParams();
    const location = this.http.post('/locationfilter',params,this.httpOptions);
    const department = this.http.post('/departmentfilter',params,this.httpOptions);
    const category = this.http.post('/categoryfilter',params,this.httpOptions);
    const subcategory = this.http.post('/subcategoryfilter',params,this.httpOptions);

    return forkJoin([location,department,category,subcategory]).pipe(tap(() => {},
    (err : any) => {
      console.log(err);
      alert("Sorry the token is not correct");
    }
    ));

  }

  public getdata(location,department,category,subcategory)
  {
    let params = new HttpParams();
    params = params.append('location', location);
    params = params.append('department', department);
    params = params.append('category', category);
    params = params.append('subcategory', subcategory);
    return this.http.post('/getdata',params, this.httpOptions);
  }

  deletedata(name)
  {
    let params = new HttpParams();
    params = params.append('name', name);
    return this.http.post('/deletedata',params, this.httpOptions);
  }

  createrecord(name,location,department,category,subcategory)
  {
    let params = new HttpParams();
    params = params.append('name', name);
    params = params.append('location', location);
    params = params.append('department', department);
    params = params.append('category', category);
    params = params.append('subcategory', subcategory);
    return this.http.post('/createrecord',params, this.httpOptions);
  }

  editrecord(name,location,department,category,subcategory)
  {
    let params = new HttpParams();
    params = params.append('name', name);
    params = params.append('location', location);
    params = params.append('department', department);
    params = params.append('category', category);
    params = params.append('subcategory', subcategory);
    return this.http.post('/editrecord',params, this.httpOptions);

  }

  checklogged()
  {
    console.log(this.jwtToken);
    if(this.jwtToken == "")
    {
      return false;
    }
    return true;
  }

  logout()
  {
    this.jwtToken = "";
    this.router.navigate(['/']);
  }

  sample()
  {
    
  }

}

// --proxy-config proxy.conf.json
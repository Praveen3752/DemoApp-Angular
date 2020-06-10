import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../project-service.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  constructor(public service : ProjectServiceService,public router : Router) { }

  res : any;

  ngOnInit() {
  }

  loginData()
  {
    if($("#userid").val() == "")
    {
      alert("Please enter the username");
      return;
    }
    if($("#passwordid").val() == "")
    {
      alert("Please enter the password");
      return;
    }
     
      this.service.logindata($("#userid").val(),$("#passwordid").val()).subscribe(data => {
        console.log(data);
        this.res = data;
        if(this.res.flag1 == "Success")
        {
          this.router.navigate(['/homepage']);
        }
        else
        {
          
        }
       
      });
  }

}

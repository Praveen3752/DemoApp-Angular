import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../project-service.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  result : any;
  result1 : any;
  createnew = false;
  deleteresult : any;
  sample = false;
  tabledata = [];
  tablelength:any;
  locationfilter = [];
  departmentfilter = [];
  categoryfilter = [];
  subcategoryfilter = [];

  dtOptions: DataTables.Settings = {};

  constructor(public service : ProjectServiceService) { 
    console.log("test");
  }

  ngOnInit() 
  {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };


    this.service.getfilterdata().subscribe(data => {
      this.result = data;
      for(var i=0;i<this.result[0].doublelist.length;i++)
        {
            this.locationfilter.push(this.result[0].doublelist[i][0]);
        }
      
        
      for(var i=0;i<this.result[1].doublelist.length;i++)
      {
          this.departmentfilter.push(this.result[1].doublelist[i][0]);
      }

      
      for(var i=0;i<this.result[2].doublelist.length;i++)
        {
            this.categoryfilter.push(this.result[2].doublelist[i][0]);
        }

        
      for(var i=0;i<this.result[3].doublelist.length;i++)
      {
          this.subcategoryfilter.push(this.result[3].doublelist[i][0]);
      }

    });
  }


getdata()
{
  this.service.getdata($("#locationfilter").val(),$("#departmentfilter").val(),$("#categoryfilter").val(),$("#subcategoryfilter").val()).subscribe(data => {
    //console.log(data);
    
    this.result1 = data;
    this.tabledata = this.result1.doublelist;
    this.sample = true;
    $("#tablegrid").show();
    //this.tablelength = this.tabledata.length;
  })  
}

deletedata(data)
{
  //console.log(data);
  //console.log(data.target);
  //console.log($(data.target).parent().siblings().eq(0).text());
  this.service.deletedata($(data.target).parent().siblings().eq(0).text()).subscribe(data => {
    this.deleteresult = data;
    alert(this.deleteresult.flag1);
    this.getdata();
  })
  //console.log(data.target.parent);
}

createdata()
{
  this.createnew = true;
  $(".createtext").eq(0).attr("disabled",false);
  $(".createtext").val("");
  $(".editcreate").eq(0).show();
  $(".editcreate").eq(1).hide();
}

editdata(data)
{
  //console.log($(data.target).parent());
 // alert("entered");
  this.createnew = true;
  $(".createtext").eq(0).attr("disabled","true");
  $(".editcreate").eq(0).hide();
  $(".editcreate").eq(1).show();

  //console.log($(data.target).parent().siblings().length);

  for(var i=0;i<$(data.target).parent().siblings().length;i++)
  {
    
    //console.log($(data.target).parent().siblings().eq(i).text());
    $(".createtext").eq(i).val($(data.target).parent().siblings().eq(i).text());
  }

}

createrecord()
{
  
  if($(".createtext").eq(0).val() == "" || $(".createtext").eq(1).val() == "" || $(".createtext").eq(2).val() == "" || $(".createtext").eq(3).val() == "" || $(".createtext").eq(4).val() == "")
  {
    alert("Please enter all the mandatory fields");
    return;
  }
  this.service.createrecord($(".createtext").eq(0).val(),$(".createtext").eq(1).val(),$(".createtext").eq(2).val(),$(".createtext").eq(3).val(),$(".createtext").eq(4).val()).subscribe(data => {
    this.deleteresult = data;
    alert(this.deleteresult.flag1);
    this.getdata();
  })
}

editrecord()
{
  
  if($(".createtext").eq(0).val() == "" || $(".createtext").eq(1).val() == "" || $(".createtext").eq(2).val() == "" || $(".createtext").eq(3).val() == "" || $(".createtext").eq(4).val() == "")
  {
    alert("Please enter all the mandatory fields");
    return;
  }
  this.service.editrecord($(".createtext").eq(0).val(),$(".createtext").eq(1).val(),$(".createtext").eq(2).val(),$(".createtext").eq(3).val(),$(".createtext").eq(4).val()).subscribe(data => {
    this.deleteresult = data;
    alert(this.deleteresult.flag1);
    this.getdata();
  })
}

logout()
{
  this.service.logout();
}


}



import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'transaction-proj';
  file = File  ;
  fileUrl:any ; fileType:any;
  FileUpload:any;
  ipaddress = "https://localhost:44328/api/transaction/";
  objResponse:any;
  constructor(private toastr: ToastrService,private http: HttpClient)
  {
  }
  ngOnInit(): void
  {
   this.FileUpload={
    fileUrl:'',
    fileType:''
   }
  }
 // On file Select
 onChange(event:any)
 {
  const file = event.target.files[0];
  var fType = file.type;
  if (file.length === 0)
  return;
  if(!fType.includes("text/csv") && !fType.includes("text/xml"))
  {
    this.toastr.error("Invalid!", 'Invalid File Type', {
    });
    return;
  }
  if(file.size/1024/1024 > 1) //change to MB and check
    {
       this.toastr.error("Invalid!", 'File size must be maximum 1MB', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.fileUrl = reader.result;
    }
 }
 onUpload() 
  {
   if(this.fileUrl != null)
   {
      if(this.fileUrl.includes('data:text/csv;base64,'))
      {
        this.fileUrl = this.fileUrl.replace("data:text/csv;base64,","");
        this.fileType = "csv";
      }
      if(this.fileUrl.includes('data:text/xml;base64,'))
      {
        this.fileUrl = this.fileUrl.replace("data:text/xml;base64,","");
        this.fileType = "xml";
      }
   }
   else
   {
    this.toastr.error("Invalid!", 'Please choose file', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
    return;
   }
   this.FileUpload.fileUrl = this.fileUrl;
   this.FileUpload.fileType = this.fileType;
   this.http.post(this.ipaddress+'uploadFile', this.FileUpload)
   .pipe(
    catchError(err => {
        this.toastr.error("Invalid!", err.error.message, {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
        return throwError(err);
    })
  ).subscribe( 
     result => {
          this.objResponse = result;
          this.toastr.success("Success!", this.objResponse.message, {
            timeOut: 3000,
            positionClass: 'toast-top-right'
          });
       }); 
  }
}

import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'transaction-proj';
  file = File  ; // Variable to store file
  ngOnInit(): void
  {
   
  }
 // On file Select
 onChange(event:any)
 {
  const file = event.target.files[0];
  if(file.size/1024/1024 > 1) //change to MB and check
  {
   
  }
 }
  // OnClick of button Upload
  onUpload() 
  {
  }
}

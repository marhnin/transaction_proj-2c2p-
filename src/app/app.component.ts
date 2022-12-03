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
  console.log("File "+file.size);
  console.log("File "+file.type);
 }
  // OnClick of button Upload
  onUpload() 
  {
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthguardService } from './authguard.service';
import { FirebaseService } from './firebase.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [AuthguardService]
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private auth: AuthguardService,private firebase: FirebaseService){
    
  }

ngOnInit(){
  this.firebase.getproctorlist();
  this.firebase.getthisemesterpendingapplications();
  this.firebase.getadminlist();
  this.firebase.getguestlist();
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

 

 
}


/*

Project structure:
when a student logs in: 
  1. Edit sheet (details)
  2. View status
  3. Submit for this semester

When a proctor logs in:
  1. View pending applications
  2. Read about an application
  3. Add remarks to it. 
  4. Submit 

When admin logs in:
  1. View all the legacy applications
  2. view this semester pending applications
  3. View one application
  4. Add remark to one application
  5. Accept or reject one application
  6. View the list of proctors, add or remove of edit
  7. Activity to start accepting or rejecting applications

*/
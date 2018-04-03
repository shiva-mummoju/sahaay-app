import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardService } from '../authguard.service';
import { FirebaseService } from '../firebase.service';
import { ToastrService } from 'ngx-toastr';

// const gapi:any = '';

@Component({
  selector: 'app-proctor-main',
  templateUrl: './proctor-main.component.html',
  styleUrls: ['./proctor-main.component.css']
})
export class ProctorMainComponent implements OnInit {
   
  constructor(private toastr: ToastrService,private router: Router,public auth: AuthguardService,public firebase:FirebaseService) { }

  ngOnInit() {
  }


// this is for adding the remark to the application


  // signOut() {
  //   console.log('sign out method called');
    
  //   // var auth2 = gapi.auth2.getAuthInstance();
  //   // auth2.signOut().then(function () {
  //     // console.log('User signed out.');
  //     // });

  //   this.auth.login = 0;
  //   this.auth.currentemail = '';
  //   this.router.navigate(['/']);
  // }
  


  acceptapplication(){
    // console.log(this.firebase.selectedApplication);
    this.toastr.success("Application sent for HOD review",'Success');
    this.firebase.selectedApplication.status = 'under hod review';
    this.firebase.update('Your application has been accepted by your proctor. It will be reviewed by HOD','under hod review');
    this.router.navigate(['proctorreview'])
  }

  rejectapplication(){
    this.toastr.error("Application rejected");
    this.firebase.selectedApplication.status = 'rejected';
    this.firebase.update('Your application has been rejected by your proctor','rejected');
    this.router.navigate(['proctorreview']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-remark',
  templateUrl: './admin-remark.component.html',
  styleUrls: ['./admin-remark.component.css']
})
export class AdminRemarkComponent implements OnInit {

  constructor(public firebase: FirebaseService,private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }
  acceptapplication(){
    // console.log(this.firebase.selectedApplication);
    this.toastr.success("Accepted Application",'Success');
    this.firebase.selectedApplication.status = 'accepted';
    this.firebase.update('Your application has been accepted by HOD','accepted');
    this.router.navigate(['adminreview']);
  }

  rejectapplication(){
    if(confirm("Are you sure you want to reject this application?"))
{
  this.toastr.error("Rejected Application");;
  this.firebase.selectedApplication.status = 'rejected'
  this.firebase.update('Your application has been rejected by HOD','rejected');;
  this.router.navigate(['adminreview']);
}
  }


}

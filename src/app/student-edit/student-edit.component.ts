import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthguardService } from '../authguard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  constructor(private toastr : ToastrService,public firebase:FirebaseService,private auth: AuthguardService,private router: Router) { }

  ngOnInit() {
    this.firebase.makesurestudentcansubmit();
    
  }

  onSubmit(applicationform: NgForm){

    if(this.auth.canstudentsubmitnow == 'no'){
      this.toastr.error('You have already submitted one application','One user one submission this semester');
      return;
    }
    if(confirm('Are you sure you want to submit? Once submitted, changes cant be made to the application!')){
    this.firebase.insertStudentApplication();
    this.toastr.success("Your application will be reviewed by your proctor!",'Submitted Successfully')
    this.router.navigate(['main']);
    }
  }

}

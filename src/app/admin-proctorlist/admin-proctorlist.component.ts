import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AuthguardService } from '../authguard.service';
import { Proctor } from '../application.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-proctorlist',
  templateUrl: './admin-proctorlist.component.html',
  styleUrls: ['./admin-proctorlist.component.css']
})
export class AdminProctorlistComponent implements OnInit {
  
  proctorInput: string = '';
  proctorName: string = '';
  proctorList : Proctor[] = [];

  constructor(public firebase:FirebaseService, public auth: AuthguardService,private toastr: ToastrService) { }

  ngOnInit() {

  }


  addnewproctor(){
    this.firebase.insertProctor(this.proctorName,this.proctorInput);
    this.toastr.success(this.proctorName + ' has been added as proctor','Success');
    this.proctorInput = '';
    this.proctorName = '';
  }



  onDelete(key:string){
    if(confirm("Are you sure you want to remove from proctor?")){
      this.firebase.deleteproctor(key);
      this.toastr.info("Removed from proctor list")
    }
    
  }

}

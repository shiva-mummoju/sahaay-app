import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AuthguardService } from '../authguard.service';
import { Proctor } from '../application.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  adminInput: string = '';
  adminName: string = '';
  adminList : Proctor[] = [];

  constructor(private firebase:FirebaseService, private auth: AuthguardService,private toastr: ToastrService) { }

  ngOnInit() {
 
  }


  addnewadmin(){
    this.firebase.insertadmin(this.adminName,this.adminInput);
    this.toastr.success(this.adminName + ' has been added as admin','Success');
    this.adminInput = '';
    this.adminName = '';
  }

  onDelete(key:string){
    this.firebase.deleteadmin(key);
  }


}

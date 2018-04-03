import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AuthguardService } from '../authguard.service';
import { ToastrService } from 'ngx-toastr';
import { Proctor } from '../application.model';

@Component({
  selector: 'app-guestlist',
  templateUrl: './guestlist.component.html',
  styleUrls: ['./guestlist.component.css']
})
export class GuestlistComponent implements OnInit {


  guestInput: string = '';
  guestName: string = '';
  guestList : Proctor[] = [];


  constructor(public firebase: FirebaseService, public auth: AuthguardService, private toastr: ToastrService) { }

  ngOnInit() {


  }


  addnewguest(){
    this.firebase.insertguest(this.guestName,this.guestInput);
    this.toastr.success(this.guestName + ' has been added as guest','Success');
    this.guestInput = '';
    this.guestName = '';
  }

  onDelete(key:string){
    this.firebase.deleteguest(key);
    this.toastr.info("Removed from the guest list")
  }

}

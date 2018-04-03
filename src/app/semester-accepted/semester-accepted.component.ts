import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AuthguardService } from '../authguard.service';

@Component({
  selector: 'app-semester-accepted',
  templateUrl: './semester-accepted.component.html',
  styleUrls: ['./semester-accepted.component.css']
})
export class SemesterAcceptedComponent implements OnInit {

  constructor(public firebase: FirebaseService, public auth: AuthguardService) { }

  ngOnInit() {
  // this.firebase.getthisemesterpendingapplications();
  }

  rejectthisapplication(key){
    console.log('code for rejecting this application');
  }

  view(key){
    this.firebase.loadthisapplicationintoselected(key,'view');
  }


}

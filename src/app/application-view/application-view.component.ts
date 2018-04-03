import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AuthguardService } from '../authguard.service';

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit {

  constructor(public firebase: FirebaseService, public auth: AuthguardService) { }

  ngOnInit() {
    console.log('getting details from legacy')
    this.firebase.getTheCurrentStudentLegacyDetails();
  }



}

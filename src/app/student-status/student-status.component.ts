import { Component, OnInit } from '@angular/core';
import { AuthguardService } from '../authguard.service';
// import { FirebaseApp } from 'angularfire2';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-student-status',
  templateUrl: './student-status.component.html',
  styleUrls: ['./student-status.component.css']
})
export class StudentStatusComponent implements OnInit {

  constructor(private auth: AuthguardService,private firebase: FirebaseService) { }

  ngOnInit() {

  }

}

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AuthguardService } from '../authguard.service';

@Component({
  selector: 'app-semester-all',
  templateUrl: './semester-all.component.html',
  styleUrls: ['./semester-all.component.css']
})
export class SemesterAllComponent implements OnInit {

  constructor(private firebase: FirebaseService,private auth: AuthguardService) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AuthguardService } from '../authguard.service';

@Component({
  selector: 'app-semester-rejected',
  templateUrl: './semester-rejected.component.html',
  styleUrls: ['./semester-rejected.component.css']
})
export class SemesterRejectedComponent implements OnInit {

  constructor(public firebase : FirebaseService, public auth: AuthguardService) { }

  ngOnInit() {
  }

}

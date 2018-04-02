import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AuthguardService } from '../authguard.service';

@Component({
  selector: 'app-legacy-view',
  templateUrl: './legacy-view.component.html',
  styleUrls: ['./legacy-view.component.css']
})
export class LegacyViewComponent implements OnInit {

  constructor(private firebase : FirebaseService,private auth: AuthguardService) { }

  ngOnInit() {
  }

}

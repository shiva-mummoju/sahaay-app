import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AuthguardService } from '../authguard.service';

@Component({
  selector: 'app-admin-legacy',
  templateUrl: './admin-legacy.component.html',
  styleUrls: ['./admin-legacy.component.css']
})
export class AdminLegacyComponent implements OnInit {

  constructor(public firebase: FirebaseService, public auth: AuthguardService) { }

  ngOnInit() {

    this.firebase.loadlegacyapplications();

  }

  view(key){
    this.firebase.loadthisapplicationintoselected( 'legacy',key,'view');
  }

}

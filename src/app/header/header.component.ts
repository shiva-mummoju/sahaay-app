import { Component, OnInit } from '@angular/core';
import { AuthguardService } from '../authguard.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthguardService, private firebase : FirebaseService) { }

  ngOnInit() {
  }

  myfunc(){
    this.auth.gotogoogle();
  }


}

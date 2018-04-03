import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AuthguardService } from '../authguard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proctor-review',
  templateUrl: './proctor-review.component.html',
  styleUrls: ['./proctor-review.component.css']
})
export class ProctorReviewComponent implements OnInit {

  constructor(public firebase : FirebaseService,public auth: AuthguardService,private router: Router) { }

  ngOnInit() {

    this.firebase.getthisemesterpendingapplications();

  }


  
  giveproctorremark(key){
    this.firebase.loadthisapplicationintoselected('applications',key,'proctorremark');
    this.router.navigate(['proctorremark']);

  }  

}

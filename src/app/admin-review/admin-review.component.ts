import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AuthguardService } from '../authguard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.css']
})
export class AdminReviewComponent implements OnInit {

  constructor(private firebase: FirebaseService, private auth: AuthguardService,private router: Router) { }

  ngOnInit() {
    this.firebase.getthisemesterpendingapplications();
  }


  giveadminremark(key){
    this.firebase.loadthisapplicationintoselected(key,'adminremark');
    // this.router.navigate(['adminremark']);
  }

}

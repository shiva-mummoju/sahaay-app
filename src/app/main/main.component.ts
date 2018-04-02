import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ToastrService } from 'ngx-toastr';
import { Proctor } from '../application.model';
import { AuthguardService } from '../authguard.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';


// import "https://apis.google.com/js/platform.js";


import * as firebase from 'firebase/app';
// import { Http } from '@angular/http';
// var auth2:any;
var gapi;
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";

import { SocialUser } from "angular4-social-login";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],

})
export class MainComponent implements OnInit {
  loadAPI:any;
  
  i:any;
  constructor(private authService: AuthService,private http: Http,private firebase : FirebaseService, private toastr: ToastrService ,private auth: AuthguardService ,private router : Router) { }

  

  ngOnInit() {
    if(this.auth.currentuserrank == 'student'){
      this.firebase.loadthisapplicationintoselected(this.auth.currentuserid,'skip');
    }
   

    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
  });
    
    
    
  }

  

  public loadScript() {        
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
        if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
            isFound = true;
        }
    }

    if (!isFound) {
        var dynamicScripts = ["https://apis.google.com/js/platform.js"];

        for (var i = 0; i < dynamicScripts .length; i++) {
            let node = document.createElement('script');
            node.src = dynamicScripts [i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }

    }
}

 

  gotoplace(x:string){
    if(this.auth.icango(x)){
      this.router.navigate([x]);
    }

  }

  
  

 

 getdata(){
  console.log(this.auth.currentuserrank);
 }



 
  signOut(): void {
    
    console.log('sign out called');
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    }); 

    

   
    
    
    // this.router.navigate(['google']);
  }


  delete(){
    if(confirm("Are you sure you want to delete all applications for this semester?"))
    this.firebase.deleteallapplicationsthissemester();
  }

}

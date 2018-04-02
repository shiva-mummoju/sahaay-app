import { Component,NgZone, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router }  from '@angular/router'
import { AuthguardService } from '../authguard.service';
import { FirebaseService } from '../firebase.service';
import { Proctor } from '../application.model';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
// import { AuthService, AppGlobals } from 'angular2-google-login';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";

import { SocialUser } from "angular4-social-login";

 
@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css'],
  // providers: [AuthguardService],
})
export class GoogleComponent implements OnInit  {
// i:Proctor
  proctorInput: string = '';
  proctorList : Proctor[] = [];
  adminInput: string = '';
  adminList : Proctor[] = [];

  
  private user: SocialUser;
  private loggedIn: boolean;

  constructor( private authService: AuthService,  private db: FirebaseService,   public afAuth: AngularFireAuth,private http: Http,private auth: AuthguardService    ,private toastr: ToastrService,ngZone: NgZone,private router : Router,private firebase: FirebaseService){
    window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
    if(this.auth.login == 1){
      // if(this.auth.currentemail == 'shiva.sairam97@gmail.com'){
        // console.log('check presence called');
        // console.log('going to the proctor main page');
        this.router.navigate(['main']);
      // }
    }  
  }
  
  ngOnInit(){
    // this.auth.login = 1;
    // this.auth.currentuserrank = 'admin';
    // this.auth.currentemail = 'shiva.sairam97@gmail.com';
    // this.router.navigate(['main']);
    

    this.authService.authState.subscribe((user) => {
      console.log('state changed')
      this.user = user;

      if(user!=null){
        console.log(user);
        this.auth.currentemail  = user.email;
        this.auth.currentuserid = user.id; 
        console.log('Currentuser id is ' + this.auth.currentuserid )
      }else{
        this.auth.currentemail = '';
        this.auth.currentuserid = '';
      }
      // console.log(this.user);
      
    });
    if(this.auth.login == 1){
      // if(this.auth.currentemail == 'shiva.sairam97@gmail.com'){
        // console.log('check presence called');
        // console.log('going to the proctor main page');
        this.router.navigate(['main']);
      
        
    }
   
 


   
  }


  signInWithGoogle(): void {

     console.log('login with user');
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.auth.login = 1;
      
      console.log('called from the min');
    // this.auth.currentuserrank = 'admin';

    this.http.get('https://sahay-vasavi.firebaseio.com/users.json').subscribe((response) => {
      const data = response.json();
      // for(var i in data){
    if(data!=null){
      for(var i in data['guests']){
        if(this.auth.currentemail == data['guests'][i]['email']){
          this.auth.currentuserrank = 'guest';
        }
      } 


      for(var i in data['proctors']){
        console.log(data['proctors'][i]['email']);
        if(this.auth.currentemail == data['proctors'][i]['email']){
          this.auth.currentuserrank = 'proctor';
          
        }
      } 
      console.log('going to amdin')
        for(var i in data['admins']){
          if(this.auth.currentemail == data['admins'][i]['email'] ){
            this.auth.currentuserrank = 'admin';
          
          }
        }
      }
// after calucating the user rank, go to main
this.toastr.success('You have been logged in');
      this.router.navigate(['main']);
    })



   
    });
    
  
  }

 

dosomething(googleUser){
  console.log('cookie');
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }




  var cookies = document.cookie.split("; ");
  console.log(cookies);
    for (var c = 0; c < cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
            var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            var p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            };
            d.shift();
        }
    }
    var profile = googleUser.getBasicProfile();
    console.log(profile);

}





  onSignIn(googleUser) {




   var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present. 
    
    this.auth.login = 1;
    this.auth.currentemail = profile.getEmail();
    this.auth.calcuateuserid();
    this.auth.currentuserrank = 'admin';
    this.auth.currentuserrank = googleUser.getAuthResponse().id_token;
    console.log(profile);
    this.http.get('https://sahay-vasavi.firebaseio.com/users.json').subscribe((response) => {
      const data = response.json();
      // for(var i in data){
    if(data!=null){
      for(var i in data['guests']){
        if(this.auth.currentemail == data['guests'][i]['email']){
          this.auth.currentuserrank = 'guest';
        }
      } 


      for(var i in data['proctors']){
        if(this.auth.currentemail == data['proctors'][i]['email']){
          this.auth.currentuserrank = 'proctor';
          
        }
      } 
      console.log('going to amdin')
        for(var i in data['admins']){
          if(this.auth.currentemail == data['admins'][i]['email'] ){
            this.auth.currentuserrank = 'admin';
          
          }
        }
      }
// after calucating the user rank, go to main
      this.router.navigate(['main']);
    })
    this.router.navigate(['main']);
  // });



    
}

}

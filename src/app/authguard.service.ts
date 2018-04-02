import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'angular4-social-login';

@Injectable()
export class AuthguardService implements CanActivate{


  login: number = 0;
  currentemail:string = ''
  currentuserrank :string = 'student';
  currentuserid: string = '';
  canstudentsubmitnow:string = 'no';
  status:string = '';
  currentuserstatus = '';

  constructor(private router: Router,private toastr:ToastrService,private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
      // console.log(route);
      // console.log(state);
      if(this.login == 1){
        if(state.url == '/google'){
          this.router.navigate(['/']);
        }
        return true;
      }else{

        this.router.navigate(['/']);
      }
    }

    icango(x:string){
      if(x == 'adminlist'){
        if(this.currentuserrank == 'admin'){
          return true;
        }
      }
      if( x=='history' ||    x== 'guestlist' || x=="semesterrejected" || x == 'proctorlist' || x == 'adminreview' || x=='adminremark' || x == 'allaccepted' || x=='semesterall'){
        if(this.currentuserrank == 'admin'){
          return true;
        }
      }

      if(x == 'edit' || x== 'view' || x == 'status'){
        
        if(this.currentuserrank == 'student'){
          return true;
        }
      }

      if(x == 'semesterrejected' || x == 'semesterall' || x=='allaccepted' || x=='history'){
        if(this.currentuserrank == 'guest' ){
          return true;
        }
      }

      if(  x=='semesterrejected' ||  x == 'proctorreview' || x == 'proctorremark' || x == 'semesterall' || x=='allaccepted'){
        if(this.currentuserrank == 'proctor'){
          return true;
        }
      }

      return false;
    }

    calcuateuserid(){
      var st = this.currentemail.toString();
  var decodestr = ''
  for(var i=0;i < st.length;i++){
    // console.log(st.charCodeAt(i));
    decodestr = decodestr +    String(st.charCodeAt(i));
  }
  this.currentuserid = decodestr;
 }
 gotogoogle(){
  console.log('go to google called');
  this.login = 0;
  this.currentemail = '';
  this.currentuserrank = 'student';
  

  this.authService.signOut().then(()=>{
   this.login = 0;
   this.currentuserrank = 'student';
   this.toastr.info('You have been logged out!')
 console.log('logout called after then');
 this.router.navigate(['google']);
 });
  
}



}

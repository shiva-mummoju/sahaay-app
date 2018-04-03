import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentMainComponent } from './student-main/student-main.component';
import { StudentStatusComponent } from './student-status/student-status.component';
import { ProctorMainComponent } from './proctor-main/proctor-main.component';
import { ProctorListComponent } from './proctor-list/proctor-list.component';
import { ProctorReviewComponent } from './proctor-review/proctor-review.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminLegacyComponent } from './admin-legacy/admin-legacy.component';
import { AdminPendingComponent } from './admin-pending/admin-pending.component';
import { AdminProctorlistComponent } from './admin-proctorlist/admin-proctorlist.component';
import { AdminStartStopComponent } from './admin-start-stop/admin-start-stop.component';
import { GoogleComponent } from './google/google.component';
import { AuthguardService } from './authguard.service';
import { FirebaseService } from './firebase.service';
import { Http, HttpModule } from '@angular/http';
import { ApplicationViewComponent } from './application-view/application-view.component';
import { SemesterAcceptedComponent } from './semester-accepted/semester-accepted.component';
import { SemesterRejectedComponent } from './semester-rejected/semester-rejected.component';
import { SemesterAllComponent } from './semester-all/semester-all.component';
import { AdminReviewComponent } from './admin-review/admin-review.component';
import { AdminRemarkComponent } from './admin-remark/admin-remark.component';
import { GuestlistComponent } from './guestlist/guestlist.component';
import { LegacyViewComponent } from './legacy-view/legacy-view.component';
import { AngularFireAuth } from 'angularfire2/auth';
  
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import { HeaderComponent } from './header/header.component';
// import { AuthService } from 'angular2-google-login';

var firebaseconfig = {
  apiKey: "AIzaSyAneVxCf-dPrvY-en65joCaCtwsoWSdnXk",
  authDomain: "sahay-vasavi.firebaseapp.com",
  databaseURL: "https://sahay-vasavi.firebaseio.com",
  projectId: "sahay-vasavi",
  storageBucket: "",
  messagingSenderId: "754541604104"
};

const routes: Routes = [
  { path: '', component: GoogleComponent },
  { path: 'google', component: GoogleComponent },
  { path: 'start', canActivate:[AuthguardService] , component: AdminStartStopComponent },
  { path:'proctorlist' , canActivate:[AuthguardService] ,  component: AdminProctorlistComponent },
  { path: 'adminpending', canActivate:[AuthguardService] ,  component: AdminPendingComponent },
  { path: 'history', canActivate:[AuthguardService] ,  component: AdminLegacyComponent },
  { path: 'adminlist', canActivate:[AuthguardService] ,  component: AdminMainComponent },
  { path: 'adminreview' , canActivate:[AuthguardService] , component: AdminReviewComponent },
  {path:  'adminremark' , canActivate: [AuthguardService] , component: AdminRemarkComponent  },
  { path: 'proctorreview', canActivate:[AuthguardService] ,  component: ProctorReviewComponent },
  { path: 'allapplications', canActivate:[AuthguardService] ,  component: ProctorListComponent },
  { path: 'proctorremark', canActivate:[AuthguardService] ,  component: ProctorMainComponent },
  { path: 'status' , canActivate:[AuthguardService] ,  component: StudentStatusComponent },
  {path: 'allaccepted' , canActivate: [AuthguardService] , component: SemesterAcceptedComponent},
  { path: 'semesterrejected' , canActivate: [AuthguardService] , component: SemesterRejectedComponent },
  {path: 'semesterall' ,canActivate: [AuthguardService] , component: SemesterAllComponent },
  {  path: 'legacyview' , canActivate: [AuthguardService] , component: StudentMainComponent },
  // { path: 'student', canActivate:[AuthguardService] ,  component: StudentMainComponent },
  { path: 'edit', canActivate:[AuthguardService] ,  component: StudentEditComponent },
  { path:'main', canActivate:[AuthguardService] , component: MainComponent },
  { path:'view', canActivate:[AuthguardService] , component: ApplicationViewComponent },
  {path: 'guestlist' , canActivate: [AuthguardService] , component: GuestlistComponent  },
  {path: '**' , component: GoogleComponent }, 

];


 
let config = new AuthServiceConfig([
  { 
    id: GoogleLoginProvider.PROVIDER_ID,
    // for debugging in local host
    provider: new GoogleLoginProvider("274658131432-ggf56gf54ufb8o1i9bftutkocq87j04p.apps.googleusercontent.com")
    // for production
    // provider: new GoogleLoginProvider("941498184130-ve6pghh0h9hu8l63m10pcoc457fh9a6d.apps.googleusercontent.com")
 
  },
  // {
    // id: FacebookLoginProvider.PROVIDER_ID,
    // provider: new FacebookLoginProvider("Facebook-App-Id")
  // }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    StudentEditComponent,
    StudentMainComponent,
    StudentStatusComponent,
    ProctorMainComponent,
    ProctorListComponent,
    ProctorReviewComponent,
    AdminMainComponent,
    AdminLegacyComponent,
    AdminPendingComponent,
    AdminProctorlistComponent,
    AdminStartStopComponent,
    GoogleComponent,
    MainComponent,
    ApplicationViewComponent,
    SemesterAcceptedComponent,
    SemesterRejectedComponent,
    SemesterAllComponent,
    AdminReviewComponent,
    AdminRemarkComponent,
    GuestlistComponent,
    HeaderComponent,
    LegacyViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFireDatabaseModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes),
    HttpModule,
    SocialLoginModule,
    MatTableModule,
  ],
  providers: [AuthguardService,FirebaseService,AngularFireAuth,{
    provide: AuthServiceConfig,
      useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

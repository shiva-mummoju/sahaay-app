import { Injectable } from '@angular/core';

import {Application,Proctor} from './application.model';

import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';
import { AuthguardService } from './authguard.service';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class FirebaseService {
  proctorList : Observable<{}[]> ;
  adminList : Observable<{}[]>;
  pendinglist : Observable<{}[]>;
  guestlist: Observable<{}[]>;
  legacylist: Observable<{}[]>;

  selectedApplication : Application = new Application();
  currentUser: string = '';
  proctorInput: string = '';
myadmins : AngularFireList<any>;
statusofcurrentapplication:string = 'Not Submitted';

  constructor( private toastr:ToastrService,  private router: Router,private http: Http,private firebase: AngularFireDatabase , private auth: AuthguardService) { }
  


  getproctorlist(){
    this.proctorList = this.firebase.list('users/proctors').snapshotChanges();

  }
  


  insertProctor(n,em){
    this.firebase.list('users/proctors').push({
      name: n,
      email: em
    });

    
  }

  deleteproctor(key:string){
    this.firebase.list('users/proctors').remove(key);
  }


  getguestlist(){
    this.guestlist = this.firebase.list('users/guests').snapshotChanges();
  }

  insertguest(n,em){
    this.firebase.list('users/guests').push({
      name: n,
      email: em
    });
  }

  deleteguest(key){
    this.firebase.list('users/guests').remove(key);
  }


  getadminlist(){
   this.adminList = this.firebase.list('users/admins').snapshotChanges();
   
  }

  insertadmin(n,em){
    this.firebase.list('users/admins').push({
      email: em,
      name: n,
    })
  }

  deleteadmin(x){
    this.firebase.list('users/admins').remove(x);
    
  }



  // startTakingApplicationsForThisSemester(){
  //   // console.log('called')
  //   // this.firebase.list('take').;
  //   this.firebase.list('/').update('/',{
  //     take: 'yes'
  //   });
  // }

  // stopTakingApplicationsForThisSemester(){
  //   this.firebase.list('/').update('/',{
  //     take: 'no'
  //   });
  // }


  getTheCurrentStudentLegacyDetails(){
    this.http.get('https://sahay-vasavi.firebaseio.com/legacy/' + this.auth.currentuserid + '.json')
      .subscribe((response) => {
        console.log(response.json());
      })
  }

  insertStudentApplication(){
    this.firebase.list('legacy/' + this.auth.currentuserid).update('/',{
      
      uid:this.auth.currentuserid,
      name:this.selectedApplication.name,
      email:this.auth.currentemail,
      rollNumber:this.selectedApplication.rollNumber,
      class:this.selectedApplication.class,
      section: this.selectedApplication.section,
      proctor:this.selectedApplication.proctor,
      father:this.selectedApplication.father,
      fatherOccupation:this.selectedApplication.fatherOccupation,
      familyAnnualIncome: this.selectedApplication.familyAnnualIncome,
      receivefees: this.selectedApplication.recieveFeeReimburs,
      scholarship:this.selectedApplication.scholarship,
      scholarshipname:this.selectedApplication.scholarshipname,
      attendance:this.selectedApplication.attendance,
      backlogs:this.selectedApplication.backlogs,
      aggregate:this.selectedApplication.aggregate,
      eamcetrank:this.selectedApplication.eamcetrank,
      interrank:this.selectedApplication.interrank,
      tenth:this.selectedApplication.tenth,
      deserving1:this.selectedApplication.deserving1,
      deserving2:this.selectedApplication.deserving2,
      deserving3:this.selectedApplication.deserving3,
      utilize1:this.selectedApplication.utilize1,
      utilize2:this.selectedApplication.utilize2,
      future1:this.selectedApplication.future1,
      future2:this.selectedApplication.future2,
      semester:this.selectedApplication.semester,
      proctorremark: this.selectedApplication.proctorremark,
      mainremark:this.selectedApplication.mainremark,
      status:'under proctor review',
      viewstatus: 'Your Application will be reviewed by your proctor',
    })


    this.firebase.list('applications/' + this.auth.currentuserid).update('/',{
      
      uid:this.auth.currentuserid,
      name:this.selectedApplication.name,
      email:this.auth.currentemail,
      rollNumber:this.selectedApplication.rollNumber,
      class:this.selectedApplication.class,
      section: this.selectedApplication.section,
      proctor:this.selectedApplication.proctor,
      father:this.selectedApplication.father,
      fatherOccupation:this.selectedApplication.fatherOccupation,
      familyAnnualIncome: this.selectedApplication.familyAnnualIncome,
      receivefees: this.selectedApplication.recieveFeeReimburs,
      scholarship:this.selectedApplication.scholarship,
      scholarshipname:this.selectedApplication.scholarshipname,
      attendance:this.selectedApplication.attendance,
      backlogs:this.selectedApplication.backlogs,
      aggregate:this.selectedApplication.aggregate,
      eamcetrank:this.selectedApplication.eamcetrank,
      interrank:this.selectedApplication.interrank,
      tenth:this.selectedApplication.tenth,
      deserving1:this.selectedApplication.deserving1,
      deserving2:this.selectedApplication.deserving2,
      deserving3:this.selectedApplication.deserving3,
      utilize1:this.selectedApplication.utilize1,
      utilize2:this.selectedApplication.utilize2,
      future1:this.selectedApplication.future1,
      future2:this.selectedApplication.future2,
      semester:this.selectedApplication.semester,
      proctorremark: this.selectedApplication.proctorremark,
      mainremark:this.selectedApplication.mainremark,
      status: 'under proctor review',
      viewstatus: 'Your application will be reviewed by your proctor',
    })
  }

  makesurestudentcansubmit(){
    this.http.get('https://sahay-vasavi.firebaseio.com/applications/' + this.auth.currentuserid + '.json')
      .subscribe((response) => {
        const data = response.json();
        if(data!=null){
            this.auth.canstudentsubmitnow = 'no';
        }
        if(data == null){
          this.auth.canstudentsubmitnow = 'yes';
        }
      })
  }


  

  getthisemesterpendingapplications(){
    this.pendinglist = this.firebase.list('applications').snapshotChanges();
  }


  loadthisapplicationintoselected(  source:string,  key:string,destination:string){
    this.http.get('https://sahay-vasavi.firebaseio.com/' + source + '/' + key + '.json')
    .subscribe( (response) =>{
      console.log(response.json());
      var x = response.json();
      // this.auth.currentuserid,
      if(x!=null){
      this.selectedApplication.name  = x['name'] ;
      // this.auth.currentemail
      this.selectedApplication.uid = x['uid']
      this.selectedApplication.rollNumber = x['rollNumber'] ;
      this.selectedApplication.class = x['class'] ;
       this.selectedApplication.section = x['section'] ;
      this.selectedApplication.proctor = x['proctor'] ;
      this.selectedApplication.father = x['father'] ;
      this.selectedApplication.fatherOccupation = x['fatherOccupation'] ;
       this.selectedApplication.familyAnnualIncome = x['familyAnnualIncome'] ;
       this.selectedApplication.recieveFeeReimburs = x['receivefees'] ;
      this.selectedApplication.scholarship = x['scholarship'] ;
      this.selectedApplication.scholarshipname = x['scholarshipname'] ;
      this.selectedApplication.attendance = x['attendance'] ;
      this.selectedApplication.backlogs = x['backlogs'] ;
      this.selectedApplication.aggregate = x['aggregate'] ;
      this.selectedApplication.eamcetrank = x['eamcetrank'] ;
      this.selectedApplication.interrank = x['interrank'] ;
      this.selectedApplication.tenth = x['tenth'] ;
      this.selectedApplication.deserving1 = x['deserving1'] ;
      this.selectedApplication.deserving2 = x['deserving2'] ;
      this.selectedApplication.deserving3 = x['deserving3'] ;
      this.selectedApplication.utilize1 = x['utilize1'] ;
      this.selectedApplication.utilize2 = x['utilize2'] ;
      this.selectedApplication.future1 = x['future1'] ;
      this.selectedApplication.future2 = x['future2'] ;
      this.selectedApplication.semester = x['semester'] ;
       this.selectedApplication.proctorremark = x['proctorremark'] ;
     this.selectedApplication.mainremark = x['mainremark'] ;
      this.selectedApplication.status = x['status'] ;
      this.selectedApplication.viewstatus = x['viewstatus'];
      // console.log('going to proctorreview');
      if(destination!='skip')
      this.router.navigate([destination]);
      }
    })

    // console.log(this.selectedApplication)
  }


  update(viewstatus:string, codestatus:string){
    this.firebase.list('legacy/' + this.selectedApplication.uid).update('/',{
      uid:this.selectedApplication.uid,
      name:this.selectedApplication.name,
      email:this.selectedApplication.email,
      rollNumber:this.selectedApplication.rollNumber,
      class:this.selectedApplication.class,
      section: this.selectedApplication.section,
      proctor:this.selectedApplication.proctor,
      father:this.selectedApplication.father,
      fatherOccupation:this.selectedApplication.fatherOccupation,
      familyAnnualIncome: this.selectedApplication.familyAnnualIncome,
      receivefees: this.selectedApplication.recieveFeeReimburs,
      scholarship:this.selectedApplication.scholarship,
      scholarshipname:this.selectedApplication.scholarshipname,
      attendance:this.selectedApplication.attendance,
      backlogs:this.selectedApplication.backlogs,
      aggregate:this.selectedApplication.aggregate,
      eamcetrank:this.selectedApplication.eamcetrank,
      interrank:this.selectedApplication.interrank,
      tenth:this.selectedApplication.tenth,
      deserving1:this.selectedApplication.deserving1,
      deserving2:this.selectedApplication.deserving2,
      deserving3:this.selectedApplication.deserving3,
      utilize1:this.selectedApplication.utilize1,
      utilize2:this.selectedApplication.utilize2,
      future1:this.selectedApplication.future1,
      future2:this.selectedApplication.future2,
      semester:this.selectedApplication.semester,
      proctorremark: this.selectedApplication.proctorremark,
      mainremark:this.selectedApplication.mainremark,
      status:codestatus,
      viewstatus: viewstatus
    });



    this.firebase.list('applications/' + this.selectedApplication.uid).update('/',{
      uid:this.selectedApplication.uid,
      name:this.selectedApplication.name,
      email:this.selectedApplication.email,
      rollNumber:this.selectedApplication.rollNumber,
      class:this.selectedApplication.class,
      section: this.selectedApplication.section,
      proctor:this.selectedApplication.proctor,
      father:this.selectedApplication.father,
      fatherOccupation:this.selectedApplication.fatherOccupation,
      familyAnnualIncome: this.selectedApplication.familyAnnualIncome,
      receivefees: this.selectedApplication.recieveFeeReimburs,
      scholarship:this.selectedApplication.scholarship,
      scholarshipname:this.selectedApplication.scholarshipname,
      attendance:this.selectedApplication.attendance,
      backlogs:this.selectedApplication.backlogs,
      aggregate:this.selectedApplication.aggregate,
      eamcetrank:this.selectedApplication.eamcetrank,
      interrank:this.selectedApplication.interrank,
      tenth:this.selectedApplication.tenth,
      deserving1:this.selectedApplication.deserving1,
      deserving2:this.selectedApplication.deserving2,
      deserving3:this.selectedApplication.deserving3,
      utilize1:this.selectedApplication.utilize1,
      utilize2:this.selectedApplication.utilize2,
      future1:this.selectedApplication.future1,
      future2:this.selectedApplication.future2,
      semester:this.selectedApplication.semester,
      proctorremark: this.selectedApplication.proctorremark,
      mainremark:this.selectedApplication.mainremark,
      status: codestatus,
      viewstatus: viewstatus,
    })



  }


  deleteallapplicationsthissemester(){
    if(this.auth.currentuserrank == 'admin'){
      console.log('deleting');
    this.firebase.list('applications').remove().then(()=>{
      this.toastr.success('Can start taking fresh applications','Cleared all applications')
    });
  }
    
  }


  loadlegacyapplications(){
    this.legacylist = this.firebase.list('legacy').snapshotChanges();
  }


}

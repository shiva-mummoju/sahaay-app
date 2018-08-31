import { Injectable } from '@angular/core';

import { Application, Proctor } from './application.model';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthguardService } from './authguard.service';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Injectable()
export class FirebaseService {
  proctorList: Observable<{}[]>;
  adminList: Observable<{}[]>;
  pendinglist: Observable<{}[]>;
  guestlist: Observable<{}[]>;
  legacylist: Observable<{}[]>;

  selectedApplication: Application = new Application();
  currentUser: string = '';
  proctorInput: string = '';
  myadmins: AngularFireList<any>;
  statusofcurrentapplication: string = 'Not Submitted';

  constructor(private toastr: ToastrService, private router: Router, private http: Http, private firebase: AngularFireDatabase, private auth: AuthguardService) { }



  getproctorlist() {
    this.proctorList = this.firebase.list('users/proctors').snapshotChanges();

  }



  insertProctor(n, em) {
    this.firebase.list('users/proctors').push({
      name: n,
      email: em
    });


  }

  deleteproctor(key: string) {
    this.firebase.list('users/proctors').remove(key);
  }


  getguestlist() {
    this.guestlist = this.firebase.list('users/guests').snapshotChanges();
  }

  insertguest(n, em) {
    this.firebase.list('users/guests').push({
      name: n,
      email: em
    });
  }

  deleteguest(key) {
    this.firebase.list('users/guests').remove(key);
  }


  getadminlist() {
    this.adminList = this.firebase.list('users/admins').snapshotChanges();

  }

  insertadmin(n, em) {
    this.firebase.list('users/admins').push({
      email: em,
      name: n,
    })
  }

  deleteadmin(x) {
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


  getTheCurrentStudentLegacyDetails() {
    this.http.get('https://sahay-vasavi.firebaseio.com/legacy/' + this.auth.currentuserid + '.json')
      .subscribe((response) => {
        console.log(response.json());
      })
  }

  insertStudentApplication() {
    this.firebase.list('legacy/' + this.auth.currentuserid).update('/', {

      uid: this.auth.currentuserid,
      name: this.selectedApplication.name,
      email: this.auth.currentemail,
      rollNumber: this.selectedApplication.rollNumber,
      class: this.selectedApplication.class,
      section: this.selectedApplication.section,
      proctor: this.selectedApplication.proctor,
      father: this.selectedApplication.father,
      fatherOccupation: this.selectedApplication.fatherOccupation,
      familyAnnualIncome: this.selectedApplication.familyAnnualIncome,
      receivefees: this.selectedApplication.recieveFeeReimburs,
      scholarship: this.selectedApplication.scholarship,
      scholarshipname: this.selectedApplication.scholarshipname,
      attendance: this.selectedApplication.attendance,
      backlogs: this.selectedApplication.backlogs,
      aggregate: this.selectedApplication.aggregate,
      eamcetrank: this.selectedApplication.eamcetrank,
      interrank: this.selectedApplication.interrank,
      tenth: this.selectedApplication.tenth,
      deserving1: this.selectedApplication.deserving1,
      deserving2: this.selectedApplication.deserving2,
      deserving3: this.selectedApplication.deserving3,
      utilize1: this.selectedApplication.utilize1,
      utilize2: this.selectedApplication.utilize2,
      future1: this.selectedApplication.future1,
      future2: this.selectedApplication.future2,
      semester: this.selectedApplication.semester,
      proctorremark: this.selectedApplication.proctorremark,
      mainremark: this.selectedApplication.mainremark,
      status: 'under proctor review',
      viewstatus: 'Your Application will be reviewed by your proctor',
    })


    this.firebase.list('applications/' + this.auth.currentuserid).update('/', {

      uid: this.auth.currentuserid,
      name: this.selectedApplication.name,
      email: this.auth.currentemail,
      rollNumber: this.selectedApplication.rollNumber,
      class: this.selectedApplication.class,
      section: this.selectedApplication.section,
      proctor: this.selectedApplication.proctor,
      father: this.selectedApplication.father,
      fatherOccupation: this.selectedApplication.fatherOccupation,
      familyAnnualIncome: this.selectedApplication.familyAnnualIncome,
      receivefees: this.selectedApplication.recieveFeeReimburs,
      scholarship: this.selectedApplication.scholarship,
      scholarshipname: this.selectedApplication.scholarshipname,
      attendance: this.selectedApplication.attendance,
      backlogs: this.selectedApplication.backlogs,
      aggregate: this.selectedApplication.aggregate,
      eamcetrank: this.selectedApplication.eamcetrank,
      interrank: this.selectedApplication.interrank,
      tenth: this.selectedApplication.tenth,
      deserving1: this.selectedApplication.deserving1,
      deserving2: this.selectedApplication.deserving2,
      deserving3: this.selectedApplication.deserving3,
      utilize1: this.selectedApplication.utilize1,
      utilize2: this.selectedApplication.utilize2,
      future1: this.selectedApplication.future1,
      future2: this.selectedApplication.future2,
      semester: this.selectedApplication.semester,
      proctorremark: this.selectedApplication.proctorremark,
      mainremark: this.selectedApplication.mainremark,
      status: 'under proctor review',
      viewstatus: 'Your application will be reviewed by your proctor',
    })
    console.log("about to call the proctor function" + this.selectedApplication.proctor);
    this.http.get("https://us-central1-sahay-vasavi.cloudfunctions.net/sendMailToProctor?email=" + this.selectedApplication.proctor)
    .subscribe((response) => {
      console.log(response);
    });
    // write code to send mail to the proctor.
  }

  makesurestudentcansubmit() {
    this.http.get('https://sahay-vasavi.firebaseio.com/applications/' + this.auth.currentuserid + '.json')
      .subscribe((response) => {
        const data = response.json();
        if (data != null) {
          this.auth.canstudentsubmitnow = 'no';
        }
        if (data == null) {
          this.auth.canstudentsubmitnow = 'yes';
        }
      })
  }




  getthisemesterpendingapplications() {
    this.pendinglist = this.firebase.list('applications').snapshotChanges();
  }


  loadthisapplicationintoselected(source: string, key: string, destination: string) {
    this.http.get('https://sahay-vasavi.firebaseio.com/' + source + '/' + key + '.json')
      .subscribe((response) => {
        console.log(response.json());
        var x = response.json();
        // this.auth.currentuserid,
        if (x != null) {
          this.selectedApplication.name = x['name'];
          // this.auth.currentemail
          this.selectedApplication.uid = x['uid']
          this.selectedApplication.rollNumber = x['rollNumber'];
          this.selectedApplication.class = x['class'];
          this.selectedApplication.section = x['section'];
          this.selectedApplication.proctor = x['proctor'];
          this.selectedApplication.father = x['father'];
          this.selectedApplication.fatherOccupation = x['fatherOccupation'];
          this.selectedApplication.familyAnnualIncome = x['familyAnnualIncome'];
          this.selectedApplication.recieveFeeReimburs = x['receivefees'];
          this.selectedApplication.scholarship = x['scholarship'];
          this.selectedApplication.scholarshipname = x['scholarshipname'];
          this.selectedApplication.attendance = x['attendance'];
          this.selectedApplication.backlogs = x['backlogs'];
          this.selectedApplication.aggregate = x['aggregate'];
          this.selectedApplication.eamcetrank = x['eamcetrank'];
          this.selectedApplication.interrank = x['interrank'];
          this.selectedApplication.tenth = x['tenth'];
          this.selectedApplication.deserving1 = x['deserving1'];
          this.selectedApplication.deserving2 = x['deserving2'];
          this.selectedApplication.deserving3 = x['deserving3'];
          this.selectedApplication.utilize1 = x['utilize1'];
          this.selectedApplication.utilize2 = x['utilize2'];
          this.selectedApplication.future1 = x['future1'];
          this.selectedApplication.future2 = x['future2'];
          this.selectedApplication.semester = x['semester'];
          this.selectedApplication.proctorremark = x['proctorremark'];
          this.selectedApplication.mainremark = x['mainremark'];
          this.selectedApplication.status = x['status'];
          this.selectedApplication.viewstatus = x['viewstatus'];
          // console.log('going to proctorreview');
          if (destination != 'skip')
            this.router.navigate([destination]);
        }
      })

    // console.log(this.selectedApplication)
  }


  update(viewstatus: string, codestatus: string) {
    this.firebase.list('legacy/' + this.selectedApplication.uid).update('/', {
      uid: this.selectedApplication.uid,
      name: this.selectedApplication.name,
      email: this.selectedApplication.email,
      rollNumber: this.selectedApplication.rollNumber,
      class: this.selectedApplication.class,
      section: this.selectedApplication.section,
      proctor: this.selectedApplication.proctor,
      father: this.selectedApplication.father,
      fatherOccupation: this.selectedApplication.fatherOccupation,
      familyAnnualIncome: this.selectedApplication.familyAnnualIncome,
      receivefees: this.selectedApplication.recieveFeeReimburs,
      scholarship: this.selectedApplication.scholarship,
      scholarshipname: this.selectedApplication.scholarshipname,
      attendance: this.selectedApplication.attendance,
      backlogs: this.selectedApplication.backlogs,
      aggregate: this.selectedApplication.aggregate,
      eamcetrank: this.selectedApplication.eamcetrank,
      interrank: this.selectedApplication.interrank,
      tenth: this.selectedApplication.tenth,
      deserving1: this.selectedApplication.deserving1,
      deserving2: this.selectedApplication.deserving2,
      deserving3: this.selectedApplication.deserving3,
      utilize1: this.selectedApplication.utilize1,
      utilize2: this.selectedApplication.utilize2,
      future1: this.selectedApplication.future1,
      future2: this.selectedApplication.future2,
      semester: this.selectedApplication.semester,
      proctorremark: this.selectedApplication.proctorremark,
      mainremark: this.selectedApplication.mainremark,
      status: codestatus,
      viewstatus: viewstatus
    });



    this.firebase.list('applications/' + this.selectedApplication.uid).update('/', {
      uid: this.selectedApplication.uid,
      name: this.selectedApplication.name,
      email: this.selectedApplication.email,
      rollNumber: this.selectedApplication.rollNumber,
      class: this.selectedApplication.class,
      section: this.selectedApplication.section,
      proctor: this.selectedApplication.proctor,
      father: this.selectedApplication.father,
      fatherOccupation: this.selectedApplication.fatherOccupation,
      familyAnnualIncome: this.selectedApplication.familyAnnualIncome,
      receivefees: this.selectedApplication.recieveFeeReimburs,
      scholarship: this.selectedApplication.scholarship,
      scholarshipname: this.selectedApplication.scholarshipname,
      attendance: this.selectedApplication.attendance,
      backlogs: this.selectedApplication.backlogs,
      aggregate: this.selectedApplication.aggregate,
      eamcetrank: this.selectedApplication.eamcetrank,
      interrank: this.selectedApplication.interrank,
      tenth: this.selectedApplication.tenth,
      deserving1: this.selectedApplication.deserving1,
      deserving2: this.selectedApplication.deserving2,
      deserving3: this.selectedApplication.deserving3,
      utilize1: this.selectedApplication.utilize1,
      utilize2: this.selectedApplication.utilize2,
      future1: this.selectedApplication.future1,
      future2: this.selectedApplication.future2,
      semester: this.selectedApplication.semester,
      proctorremark: this.selectedApplication.proctorremark,
      mainremark: this.selectedApplication.mainremark,
      status: codestatus,
      viewstatus: viewstatus,
    })

    if(codestatus == "under hod review"){
      this.http.get("https://us-central1-sahay-vasavi.cloudfunctions.net/sendMailToAllAdmin")
      .subscribe((res) => {
        console.log(res);
      });
    }



  }


  deleteallapplicationsthissemester() {
    if (this.auth.currentuserrank == 'admin') {
      // console.log('deleting');
      this.firebase.list('applications').remove().then(() => {
        this.toastr.success('Can start taking fresh applications', 'Cleared all applications')
      });
    }

  }


  loadlegacyapplications() {
    this.legacylist = this.firebase.list('legacy').snapshotChanges();
  }




  printThisApplication(num) {
    console.log("print this application has been called from firebase");
    var docDefinition = {
      content: [
        { text: 'VASAVI COLLEGE OF ENGINEERING', style: 'header' },
        { text: 'IBRAHIMBAGH-31', style: 'smallHeader' },
        { text: 'DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING', style: 'dept' },
        { text: '"SAHAAY"', style: 'sahay' },
        { text: 'Fund Claim Form', style: 'sahay' },
        { text: '  ' },
        { text: ['1. Student Name: ', { text: this.selectedApplication.name, style: 'inner' }], style: 'outer' },
        { text: ['2. Roll No: ', { text: this.selectedApplication.rollNumber, style: 'inner' }], style: 'outer' },
        { text: ['3. Class: ', { text: this.selectedApplication.class, style: 'inner' }], style: 'outer' },
        { text: ['4. Section: ', { text: this.selectedApplication.section, style: 'inner' }], style: 'outer' },
        { text: ['5. Fathers Name: ', { text: this.selectedApplication.father, style: 'inner' }], style: 'outer' },
        { text: ['6. Fathers Occupation: ', { text: this.selectedApplication.fatherOccupation, style: 'inner' }], style: 'outer' },
        { text: ['7. Fathers Annual Income: ', { text: this.selectedApplication.familyAnnualIncome, style: 'inner'}], style: 'outer' },
        { text: ['8. Are you receiving fees reimbursment?: ', { text: this.selectedApplication.recieveFeeReimburs, style: 'inner' }], style: 'outer' },
        { text: ['9. Are you receiving any other scholarships?', { text: '', style: this.selectedApplication.scholarship }], style: 'outer' },
        { text: ['9.a. If yes, name the scholarship which you are receiving: ', { text: this.selectedApplication.scholarshipname, style: 'inner' }], style: 'sideOuter' },
        { text: ['10. Attendance Percentage: ', { text: this.selectedApplication.attendance, style: 'inner' }], style: 'outer' },
        { text: ['11. Aggregate Marks Percentage: ', { text: this.selectedApplication.aggregate, style: 'inner' }], style: 'outer' },
        { text: ['12. No of backlogs ', { text: this.selectedApplication.backlogs, style: 'inner' }], style: 'outer' },
        { text: ['13. EAMCET/ECET rank: ', { text: this.selectedApplication.eamcetrank, style: 'inner' }], style: 'outer' },
        { text: ['14. Inter/Diploma percentage: ', { text: this.selectedApplication.interrank, style: 'inner' }], style: 'outer' },
        { text: ['15. 10th percentage: ', { text: this.selectedApplication.tenth, style: 'inner' }], style: 'outer' },
        { text: ['16. Why do you think you are the deserving candidate for sahaay fund?: ', { text: '', style: 'inner' }], style: 'outer' },
        { text: ['16.a: ', { text: this.selectedApplication.deserving1, style: 'inner' }], style: 'sideOuter' },
        { text: ['16.b: ', { text: this.selectedApplication.deserving2, style: 'inner' }], style: 'sideOuter' },
        { text: ['16.c: ', { text: this.selectedApplication.deserving3, style: 'inner' }], style: 'sideOuter' },
        { text: ['17. How will you utilize the sahaay fund?: ', { text: '', style: 'inner' }], style: 'outer' },
        { text: ['17.a: ', { text: this.selectedApplication.utilize1, style: 'inner' }], style: 'sideOuter' },
        { text: ['17.b: ', { text: this.selectedApplication.utilize2, style: 'inner' }], style: 'sideOuter' },
        { text: ['18. What are your future plans? : ', { text: '', style: 'inner' }], style: 'outer' },
        { text: ['18.a: ', { text: this.selectedApplication.future1, style: 'inner' }], style: 'sideOuter' },
        { text: ['18.b: ', { text: this.selectedApplication.future2, style: 'inner' }], style: 'sideOuter' },
        { text: ['19. In which semester did you receive sahaay fund till date? : ', { text: this.selectedApplication.semester, style: 'inner' }], style: 'outer' },
        {
          columns: [
            {
              stack: [
                'Student Signature',

              ],
              style: "sign"
            },
            {
              stack: [
                'Proctor Signature',

              ],
              style: "sign"
            },
            {
              stack: [
                'HOD, CSE',
              ],
              style: "sign"
            }
          ],
        }


      ],

      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: "center"
        },
        sign: {
          alignment: "center",
          margin: [0, 45, 0, 0]
        },
        inner: {
          bold: false,
          fontSize: 15,
          underline: true,
        },
        outer: {
          bold: true,
          fontSize: 16,
        },

        sideOuter: {
          bold: true,
          fontSize: 16,
          margin: [15, 0, 0, 0]
        },

        smallHeader: {
          fontSize: 16,
          alignment: 'center'
        },
        dept: {
          fontSize: 18,
          alignment: 'center',
          bold: true,
        },
        sahay: {
          fontSize: 18,
          alignment: 'center',
          italics: true,
        }
      }
    }

    if(num == 1){
      pdfMake.createPdf(docDefinition).download();
    }else{
      pdfMake.createPdf(docDefinition).print();
    }

  }

}

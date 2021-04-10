import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/authentication.service';
import { RepositoryService } from '../../../services/repository.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { PermissionService } from '../../../services/permission.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';

@Component({
 templateUrl: 'tenant-form.component.html'
})
 
    export class TenantFormComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public returnUrl: string;
  public error = '';
  public tenantId = 0;
  public buildingId = 0;
  public buildings: any[];
  public rooms: any[];
  public userId = 0;
  isShown: boolean = true ; // show by default

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private activeRoute: ActivatedRoute,
  ) 
  { }
  ngOnInit() {
    this.form = this.fb.group({
        fullName: [null, Validators.compose([Validators.required, Validators.maxLength(250)])],
        fatherName: [null, Validators.compose([Validators.required, Validators.maxLength(250)])],
        email: [null, Validators.compose([Validators.email, Validators.required, Validators.maxLength(150)])],
        phone: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
        adhar: [null, Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(12)])],
        pen: [''],
        address: [null, Validators.compose([Validators.required, Validators.maxLength(1000)])],
        roomId: [null, Validators.compose([Validators.required])],
        roomPrice: [''],
        userId:0,
        buildingId:0
    });

     // logged in user
     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
     this.userId=currentUser.userId;
     this.getBuilding()
    const id: any = this.activeRoute.snapshot.params['id'] || 0;
    this.tenantId = id;
    if (this.tenantId > 0) {
      this.getDetails(this.tenantId);
    }
    
  }
  // Get Details
  public getDetails(tenantId) {
    this.isShown = ! this.isShown;
    this.loading = true;
    this.tenantId = tenantId;
    let apiUrl: string = `tenants/${this.tenantId}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        if (res.status) {
        this.loading = false;
        console.log(res.data);
        this.form.patchValue(res.data);
      }else{
        this.loading = false;
        this.toastr.error(res.message);
      }
      },
      (error => {
        this.loading = false;
        this.errorHandler.handleError(error);
        this.toastr.error('There was some error. Please re-try or contact web admin', 'Error');
      })
      )
    }

// Form Submit 
public onSubmit(formValue) {
  this.getFormValidationErrors();
  if (this.form.valid) {
    this.executeCreation(formValue);
  }
}
 
private executeCreation(formValue) {

    if(formValue.roomPrice==''){
        formValue.roomPrice=Number(0);
    }
  formValue.roomPrice=Number(formValue.roomPrice);
  formValue.userId=this.userId;
  formValue.roomId=Number(formValue.roomId);
 
  this.loading = true;
  if (this.tenantId === 0 || this.tenantId === undefined) {
     
    const apiUrl = 'tenants';
    this.repository.create(apiUrl, formValue)
      .subscribe(res => {
        if (res.status) {
          this.toastr.success(res.message);
          this.loading = false;
          this.router.navigate(['/tenant']);
        } else {
          this.toastr.error(res.message);
          this.loading = false;
        }
      },
        (error => {
          this.errorHandler.handleError(error);
          this.toastr.error('There was some error. Please re-try or contact web admin', 'Error');
          this.loading = false;
        })
      );
  } else {
    const apiUrl = `tenants/${this.tenantId}`;
    this.repository.update(apiUrl, formValue)
      .subscribe(res => {
        if (res.status) {
          this.toastr.success(res.message);
          this.loading = false;
          this.router.navigate(['/tenant']);
        } else {
          this.toastr.error(res.message);
          this.loading = false;
        }
      },
        (error => {
          this.errorHandler.handleError(error);
          this.toastr.error('There was some error. Please re-try or contact web admin', 'Error');
          this.loading = false;
        })
      );
  }
}
// Get building
public getBuilding() {
    this.loading = true;
    let apiUrl: string = `buildings/getAll/${this.userId}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        if (res.status) {
        this.loading = false;
        console.log(res.data);
        this.buildings = res.data as any[];
        if(this.buildingId==0){
            this.buildingId= this.buildings[0].id;
            this.getRoom(this.buildingId);
           }
      

      }else{
        this.loading = false;
        this.toastr.error(res.message);
      }
      },
      (error => {
        this.loading = false;
        this.errorHandler.handleError(error);
        this.toastr.error('There was some error. Please re-try or contact web admin', 'Error');
      })
      )
    }
 // building change
 public buildingchange(id) {
    this.buildingId=id;
    this.getRoom(id);
  }
    // Get rooms
public getRoom(buildingId) {
    this.loading = true;
    let apiUrl: string = `rooms/getFreeRoom/${buildingId}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        if (res.status) {
        this.loading = false;
        console.log(res.data);
        this.rooms = res.data as any[];
      }else{
        this.loading = false;
        this.toastr.error(res.message);
        this.rooms = res.data as any[];
      }
      },
      (error => {
        this.loading = false;
        this.errorHandler.handleError(error);
        this.toastr.error('There was some error. Please re-try or contact web admin', 'Error');
      })
      )
    }
     // room change
 public roomchange(id) {
   this.getRoomDetails(id);
  }

// Get Room Details
public getRoomDetails(roomId) {
    this.loading = true;
    let apiUrl: string = `rooms/${roomId}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        if (res.status) {
        this.loading = false;
        console.log(res.data);
        this.form.patchValue(res.data);
      }else{
        this.loading = false;
        this.toastr.error(res.message);
      }
      },
      (error => {
        this.loading = false;
        this.errorHandler.handleError(error);
        this.toastr.error('There was some error. Please re-try or contact web admin', 'Error');
      })
      )
    }


   //******************To be used in dev mode only***************************
   getFormValidationErrors() {
    Object.keys(this.form.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
  // Validations
  public validateControl(controlName: string) {
    if (this.form.controls[controlName].invalid && this.form.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.form.controls[controlName].hasError(errorName))
      return true;
    return false;
  }
}

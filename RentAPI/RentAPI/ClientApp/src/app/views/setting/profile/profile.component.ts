import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/authentication.service';
import { RepositoryService } from '../../../services/repository.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { PermissionService } from '../../../services/permission.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';

@Component({
 templateUrl: 'profile.component.html'
})
 
    export class ProfileComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public returnUrl: string;
  public error = '';
  public buildingId = 0;
  public userId = 0;
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
      name: [null, Validators.compose([Validators.required, Validators.maxLength(500)])],
      email: [null, Validators.compose([Validators.email, Validators.required, Validators.maxLength(150)])],
      phone: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      id:0
    });

     // logged in user
     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
     this.userId=currentUser.userId;

    
    if (this.userId > 0) {
      this.getDetails();
    }

  }
  // Get Details
  public getDetails() {
    this.loading = true;
    let apiUrl: string = `account/getProfile/${this.userId}`;

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
  formValue.id=this.userId;
  console.log(formValue);
  this.loading = true;
    const apiUrl = 'account/updateProfile';
    this.repository.create(apiUrl, formValue)
      .subscribe(res => {
        if (res.status) {
          this.toastr.success(res.message);
          this.loading = false;
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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RepositoryService } from '../../services/repository.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
 
  export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    public permissionService: PermissionService


  )  { }
  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      email: [null, Validators.compose([Validators.email, Validators.required, Validators.maxLength(150)])],
      phone: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      password: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      confirmPassword: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
    });
}



 // Create 
 public onSubmit(formValue) {
  this.getFormValidationErrors();
  if (this.form.valid) {

    if (Number.isNaN(Number(formValue.phone))) {
      this.toastr.error('Enter valid phone');
      return;
   }
   
    if(formValue.password!=formValue.confirmPassword){
      this.toastr.error('Confirm Password not match');
      return;
    }
    this.executeCreation(formValue);
  }
}
private executeCreation(formValue) {
  this.loading = true;
    let apiUrl = 'account/register';
    this.repository.create(apiUrl, formValue)
      .subscribe(res => {
        if (res.status) {
          this.loading = false;
          this.toastr.success('Registration successful please login');
            this.router.navigate(['/login']);
        }
        else {
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
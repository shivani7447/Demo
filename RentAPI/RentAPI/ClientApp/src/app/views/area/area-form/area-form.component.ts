import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RepositoryService } from '../../../services/repository.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent implements OnInit {

  public form: FormGroup;
  public loading = false;
  public returnUrl: string;
  public error = '';
  public areaId = 0;
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
      name: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
    });

     // logged in user
     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
     this.userId=currentUser.userId;

    const id: any = this.activeRoute.snapshot.params['id'] || 0;
    this.areaId = id;
    if (this.areaId > 0) {
      this.getDetails(this.areaId);
    }

  }
  // Get Details
  public getDetails(areaId) {
    this.loading = true;
    this.areaId = areaId;
    let apiUrl: string = `areas/${this.areaId}`;

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
  formValue.userId=this.userId;
  console.log(formValue);
  this.loading = true;
  if (this.areaId === 0 || this.areaId === undefined) {
    const apiUrl = 'areas';
    this.repository.create(apiUrl, formValue)
      .subscribe(res => {
        if (res.status) {
          this.toastr.success(res.message);
          this.loading = false;
          this.router.navigate(['/area']);
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
    const apiUrl = `areas/${this.areaId}`;
    this.repository.update(apiUrl, formValue)
      .subscribe(res => {
        if (res.status) {
          this.toastr.success(res.message);
          this.loading = false;
          this.router.navigate(['/area']);
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

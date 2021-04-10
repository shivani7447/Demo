import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RepositoryService } from '../../../services/repository.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public returnUrl: string;
  public error = '';
  public itemId = 0;
  public areas: any[];
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
      areaId: [null, Validators.compose([Validators.required])],
      articleName: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      quantity: [null, Validators.compose([Validators.required])],
      approvalNo: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      date: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      cpNo: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      spNo: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      remarks: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
    });

     // logged in user
     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
     this.userId=currentUser.userId;
     this.getAll();
    const id: any = this.activeRoute.snapshot.params['id'] || 0;
    this.itemId = id;
    if (this.itemId > 0) {
      this.getDetails(this.itemId);
    }

  }
  // Get Details
  public getDetails(itemId) {
    this.loading = true;
    this.itemId = itemId;
    let apiUrl: string = `items/${this.itemId}`;

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
 
  formValue.areaId=Number(formValue.areaId);
  console.log(formValue);
  this.loading = true;
  if (this.itemId === 0 || this.itemId === undefined) {
    const apiUrl = 'items';
    this.repository.create(apiUrl, formValue)
      .subscribe(res => {
        if (res.status) {
          this.toastr.success(res.message);
          this.loading = false;
          this.router.navigate(['/item']);
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
    const apiUrl = `items/${this.itemId}`;
    this.repository.update(apiUrl, formValue)
      .subscribe(res => {
        if (res.status) {
          this.toastr.success(res.message);
          this.loading = false;
          this.router.navigate(['/item']);
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


// Get areas
public getAll() {
  this.loading = true;
  let apiUrl: string = `areas/getAll`;

  this.repository.getData(apiUrl)
    .subscribe(res => {
      if (res.status) {
      this.loading = false;
      console.log(res.data);
      this.areas = res.data as any[];
    }else{
      this.loading = false;
      this.areas = res.data as any[];
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RepositoryService } from '../../../services/repository.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

 
  public form: FormGroup;
  public loading = false;
  public returnUrl: string;
  public error = '';
  public userId = 0;
 public items: any[];

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
 
   // logged in user
   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
   this.userId=currentUser.userId;
   this.getAll();
}
// Get Details
public getAll() {
  this.loading = true;
  let apiUrl: string = `items/getAll`;

  this.repository.getData(apiUrl)
    .subscribe(res => {
      if (res.status) {
      this.loading = false;
      console.log(res.data);
      this.items = res.data as any[];
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
   // Delete
public delete(id) {
if (confirm('Are you sure')) {
  this.deleteConfirm(id);
}
}
public deleteConfirm(id) {
 
const deleteUrl = `items/${id}`;
this.repository.delete(deleteUrl)
    .subscribe(res => {
      if (res.status) {
        this.getAll();
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
}


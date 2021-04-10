import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RepositoryService } from '../../../services/repository.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
@Component({
  selector: 'app-area-detail',
  templateUrl: './area-detail.component.html',
  styleUrls: ['./area-detail.component.css']
})
export class AreaDetailComponent implements OnInit {

  public form: FormGroup;
  public loading = false;
  public returnUrl: string;
  public error = '';
  public areaId = 0;
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
 
   
  

   const id: any = this.activeRoute.snapshot.params['id'] || 0;
   this.areaId = id;
   if (this.areaId > 0) {
     this.getAll();
   }
}
// Get Details
public getAll() {
  this.loading = true;
  let apiUrl: string = `items/getItem/${this.areaId}`;

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
  
}


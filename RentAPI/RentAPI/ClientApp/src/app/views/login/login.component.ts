import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
 
  export class LoginComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public returnUrl: string;
  public error = '';

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) 
  { }
  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();
    

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.form.controls; }
  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          if (data.status) {
            this.loading = false;
            this.router.navigate(['/dashboard']);
          } else {
            this.toastr.error('Invalid username or password');
            this.loading = false;
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}

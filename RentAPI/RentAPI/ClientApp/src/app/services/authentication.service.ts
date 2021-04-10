import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { catchError, tap, map } from 'rxjs/operators';

const postUrl = environment.urlAddress + "/account/login";

@Injectable({
    providedIn: 'root'
  })
  export class AuthenticationService {
    constructor(private http: HttpClient,
      private envUrl: EnvironmentUrlService) { }
  
    login(username: string, password: string): Observable<any> {
      const data = { email: username, password: password };
      return this.http.post(postUrl, data)
        .pipe(map(this.setAuth),
          catchError(this.handleError)
        );
    }
  
    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
    }
  
  
  
  
  
  
 
    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
    };
  
    private extractData(res: Response) {
      const body = res;
      return body || {};
    }
  
    private setAuth(res: any) {
      const body = res;
       
      if (res.status) {
         
        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(
          {
            userId: res.data.id,
            userName: res.data.name
          }));
        console.log(localStorage);
      }
  
      return body || {};
    }
  
  }
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { DataService } from './data.service';

@Injectable()
export class RepositoryService {

  selectedSession: string;

  constructor(private http: HttpClient, 
    private dataService: DataService,
    private envUrl: EnvironmentUrlService) { }

  public getData(route: string): Observable<any> {
    return this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress),this.generateHeaders());
  }

  public create(route: string, body): Observable<any> {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body, this.generateHeaders());
  }

  public update(route: string, body): Observable<any> {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), body, this.generateHeaders());
  }

  public delete(route: string): Observable<any> {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress), this.generateHeaders());
  }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }


  private generateHeaders() {
    // selected session
    this.dataService.currentSession.subscribe(session => this.selectedSession = session);

    // logged in user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
    let token: string;
    if (currentUser) {
      token = currentUser.userName;
    }
   
    return {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        })
    };
  }
}

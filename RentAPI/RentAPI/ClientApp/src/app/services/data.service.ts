import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

    private sessionSource = new BehaviorSubject('');
    currentSession = this.sessionSource.asObservable();

    constructor() { }

    changeSession(theSession: string) {
        this.sessionSource.next(theSession);
    }
}

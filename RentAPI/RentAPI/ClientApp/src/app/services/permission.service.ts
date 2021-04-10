import { Injectable } from '@angular/core';

export enum Roles {
  superadmin,
  schooladmin,
  parent,
  accounts,
  teachingstaff,
  frontdesk,
  counselor,
  principal,
}

interface IPermissionDictionary {
  [key: string]: boolean;
}

@Injectable()
export class PermissionService {
  private permissions: IPermissionDictionary = {};

  public constructor() {
    this.emitPermissions();
  }

  private emitPermissions(): void {
    // let selector = document.querySelectorAll("#roles > span");
    // let availableRoles = Array.from(selector).map(element => element.textContent);

    const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    if (loggedInUser) {
      const availableRoles = loggedInUser.roles;

      for (const role in Roles) {
        if (!/^\d+$/.test(role)) { // for strings types in Roles
          this.permissions[role] = availableRoles.indexOf(role) > -1;
        }
      }
    }
  }

  public isInRole(role: string): boolean {
      return this.permissions[role] || false;
  }

   

  public isAllowed(perm) {
    const permissions = JSON.parse(localStorage.getItem('permissions'));
    const exists = permissions.includes(perm);
    return exists;
  }
}

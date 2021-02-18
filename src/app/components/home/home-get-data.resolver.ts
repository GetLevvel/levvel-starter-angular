import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HomeGetDataResolver implements Resolve<any> {
  constructor() {}

  public resolve(): Observable<any> {
    return of(<any>{});
  }
}

import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {RestService} from "./rest.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends RestService{
  endpoint = `${environment.api}/orders`;

  export(): Observable<any> {
    return this.http.post(`${environment.api}/orders/export`, {}, {responseType: 'blob'})
  }

  chart(): Observable<any> {
    return this.http.get(`${environment.api}/orders/chart`)
  }
}

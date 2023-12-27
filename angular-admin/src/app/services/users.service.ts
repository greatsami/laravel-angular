import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../interfaces/user";
import {RestService} from "./rest.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends RestService {
  endpoint = `${environment.api}/users`;

}

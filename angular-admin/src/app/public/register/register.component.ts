import {Component, Injectable, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {last} from "rxjs";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './../public.component.css']
})

@Injectable()
export class RegisterComponent implements OnInit {

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  passwordConfirmation = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

  submit(): void {
    this.authService.register({
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
      password_confirmation: this.passwordConfirmation,
    }).subscribe(() => this.router.navigate(['/login']));
  }

  protected readonly last = last;
}

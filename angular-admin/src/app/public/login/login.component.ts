import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './../public.component.css']
})

export class LoginComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    })
  }

  submit(): void {
    this.authService.login(this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/']));
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RolesService} from "../../../services/roles.service";
import {Role} from "../../../interfaces/role";
import {NgForOf} from "@angular/common";
import {UsersService} from "../../../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;
  roles: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RolesService,
    private userService: UsersService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role_id: '',
    });

    this.roleService.all().subscribe(
      roles => this.roles = roles
    )
  }

  submit(): void {
    this.userService.create(this.form.getRawValue()).subscribe(
      () => this.router.navigate(['/users'])
    );
  }

}

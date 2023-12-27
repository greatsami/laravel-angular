import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Role} from "../../../interfaces/role";
import {RolesService} from "../../../services/roles.service";
import {UsersService} from "../../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-edit',
  standalone: true,
    imports: [
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;
  roles: Role[] = [];
  // @ts-ignore
  id: number;


  constructor(
    private formBuilder: FormBuilder,
    private roleService: RolesService,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
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

    this.id = this.route.snapshot.params['id'];

    this.userService.get(this.id).subscribe(
      user => {
        this.form.patchValue({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role_id: user.role.id,
        });
      }
    )
  }

  submit(): void {
    this.userService.update(this.id, this.form.getRawValue()).subscribe(
      () => this.router.navigate(['/users'])
    );
  }

}

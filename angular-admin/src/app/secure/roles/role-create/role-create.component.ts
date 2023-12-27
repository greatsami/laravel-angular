import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {RolesService} from "../../../services/roles.service";
import {Permission} from "../../../interfaces/permission";
import {PermissionService} from "../../../services/permission.service";

@Component({
  selector: 'app-role-create',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './role-create.component.html',
  styleUrl: './role-create.component.css'
})
export class RoleCreateComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;
  permissions: Permission[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RolesService,
    private permissionService: PermissionService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      permissions: this.formBuilder.array([]),
    });

    this.permissionService.all().subscribe(
      permissions => {
        this.permissions = permissions;
        this.permissions.forEach(p => {
          this.permissionArray.push(
            this.formBuilder.group({
              value: false,
              id: p.id
            })
          )
        })
      }
    )
  }

  get permissionArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  submit(): void {
    const formData = this.form.getRawValue();
    const data = {
      name: formData.name,
      permissions: formData.permissions.filter((p: { value: boolean; }) => p.value).map((p: { id: any; }) => p.id)
    };

    this.roleService.create(data).subscribe(
      () => this.router.navigate(['/roles'])
    );
  }

}

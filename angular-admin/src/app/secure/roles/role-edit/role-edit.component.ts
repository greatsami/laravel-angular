import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Permission} from "../../../interfaces/permission";
import {RolesService} from "../../../services/roles.service";
import {PermissionService} from "../../../services/permission.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../../../interfaces/role";

@Component({
  selector: 'app-role-edit',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './role-edit.component.html',
  styleUrl: './role-edit.component.css'
})
export class RoleEditComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;
  permissions: Permission[] = [];
  // @ts-ignore
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RolesService,
    private permissionService: PermissionService,
    private router: Router,
    private route: ActivatedRoute,
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

    this.id = this.route.snapshot.params['id'];

    this.roleService.get(this.id).subscribe(
      (role: Role) => {
        const values = this.permissions.map(
          p => {
            return {
              value: role.permissions?.some(r => r.id === p.id),
              id: p.id
            };
          }
        );

        this.form.patchValue({
          name: role.name,
          permissions: values,
        });
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

    this.roleService.update(this.id, data).subscribe(
      () => this.router.navigate(['/roles'])
    );
  }
}

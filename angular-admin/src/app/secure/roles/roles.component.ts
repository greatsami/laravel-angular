import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Role} from "../../interfaces/role";
import {RolesService} from "../../services/roles.service";

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  constructor(
    private roleService: RolesService,
  ) {
  }

  ngOnInit(): void {
    this.roleService.all().subscribe(
      roles => this.roles = roles
    )
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.roleService.delete(id).subscribe(
        () => {
          this.roles = this.roles.filter(r => r.id !== id);
        }
      )
    }
  }
}

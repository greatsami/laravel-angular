import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {User} from "../../interfaces/user";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {PaginatorComponent} from "../components/paginator/paginator.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    PaginatorComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  lastPage: number | undefined;

  constructor(
    private userService: UsersService,
  ) {
  }

  ngOnInit(): void {
    this.load()
  }

  load(page: number = 1): void {
    this.userService.all(page).subscribe(
      (res: any) => {
        this.users = res.data;
        this.lastPage = res.meta.last_page
      }
    )
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.userService.delete(id).subscribe(
        () => {
          this.users = this.users.filter(u => u.id !== id);
        }
      )
    }
  }

}

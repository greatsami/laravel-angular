import {Component, Input, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../interfaces/user";
import {Auth} from "../../classes/auth";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  user: User | undefined;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    Auth.userEmitter.subscribe(user => this.user = user);
  }

  logout(): void {
    this.authService.logout().subscribe(res => console.log(res));
  }
}

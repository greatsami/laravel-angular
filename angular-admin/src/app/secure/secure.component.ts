import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "./menu/menu.component";
import {NavComponent} from "./nav/nav.component";
import {AuthService} from "../services/auth.service";
import {Router, RouterOutlet} from "@angular/router";
import {Auth} from "../classes/auth";

@Component({
  selector: 'app-secure',
  standalone: true,
  imports: [
    MenuComponent,
    NavComponent,
    RouterOutlet
  ],
  templateUrl: './secure.component.html',
  styleUrl: './secure.component.css'
})
export class SecureComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.user().subscribe(
      user => Auth.userEmitter.emit(user),
      () => this.router.navigate(['/login'])
    );
  }
}

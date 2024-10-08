import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { CartService } from 'src/app/core/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(authService: AuthService, public router: Router) {
    if (!authService.currentUserValue)
      this.router.navigate(['/login']);
  }

  ngOnInit(): void {

  }
}

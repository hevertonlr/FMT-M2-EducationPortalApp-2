import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { routes } from './../../../app.routes';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  routes: Routes = routes;
  open: boolean;
  profileOpen: boolean;
  isLogged:boolean;
  constructor(private router: Router, private authService: AuthService){
    this.open = false;
    this.profileOpen = false;
    this.routes = this.router.config.filter(route => route.path !== 'login' && route.path);
    this.isLogged = authService.isAuthenticatedUser();
  }

  toggleSidebar = () => this.open = !this.open;
  toggleProfile = () => this.profileOpen = !this.profileOpen;
  logout = () => {
    this.router.navigate(['/login']);
    this.authService.logout();
  }
  getLoggedUser = () => this.authService.getTokenContent<UserModel>();
  
}

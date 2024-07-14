import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { routes } from '../../../app.routes';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() sidebarToggled = new EventEmitter<void>();

  routes: Routes = routes;
  open: boolean;
  constructor(private router: Router, private authService: AuthService) {
    this.routes = this.router.config.filter(
      (route) => route.path !== 'login' && route.path && (this.isAdm() ? true : route.path !== 'usuarios')
    );
    this.open = false;
  }
  toggleSidebar = () => {
    this.open = !this.open;
    this.sidebarToggled.emit();
  };
  isAdm = () => this.authService.getTokenContent<UserModel>()?.admin;
  
  
}

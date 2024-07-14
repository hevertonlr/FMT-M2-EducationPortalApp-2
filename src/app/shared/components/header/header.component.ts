import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { routes } from './../../../app.routes';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule, SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;
  routes: Routes = routes;
  profileOpen: boolean;
  isLogged:boolean;
  constructor(private router: Router, private authService: AuthService){
    this.profileOpen = false;
    this.routes = this.router.config.filter(route => route.path !== 'login' && route.path);
    this.isLogged = authService.isAuthenticatedUser();
  }

  ngAfterViewInit(){
    console.log('ngAfterViewInit called');
  }

  callToggleSidebar = () => {
    this.sidebarComponent.toggleSidebar();
  }
  toggleProfile = () => this.profileOpen = !this.profileOpen;
  logout = () => {
    this.router.navigate(['/login']);
    this.authService.logout();
  }
  getLoggedUser = () => this.authService.getTokenContent<UserModel>();
  
}

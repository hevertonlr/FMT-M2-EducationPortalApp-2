import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../shared/models/user.model';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  usuarios$!: Observable<UserModel[]>;
  usuariosFiltrados$!: Observable<UserModel[]>;
  constructor(private usuariosService:UsuariosService){
    this.usuarios$ = this.usuariosService.getUsers();
    this.usuariosFiltrados$ = this.usuarios$;
  }
}

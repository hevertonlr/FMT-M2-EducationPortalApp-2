import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AlunosComponent } from './pages/alunos/alunos.component';
import { CadastroAlunoComponent } from './pages/cadastro-aluno/cadastro-aluno.component';
import { DisciplinasComponent } from './pages/disciplinas/disciplinas.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    data: { name: 'Login', icon: 'login' },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { name: 'Home', icon: 'home' },
    canActivate: [AuthGuard],
  },
  {
    path: 'disciplinas',
    component: DisciplinasComponent,
    data: { name: 'Disciplinas', icon: 'clipboard-document-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'alunos',
    component: AlunosComponent,
    data: { name: 'Alunos', icon: 'user-group' },
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastro-aluno',
    component: CadastroAlunoComponent,
    data: { name: 'Cadastro de Alunos', icon: 'identification' },
    canActivate: [AuthGuard],
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: { name: 'Usuários', icon: 'users' },
    canActivate: [AuthGuard],
  },
];

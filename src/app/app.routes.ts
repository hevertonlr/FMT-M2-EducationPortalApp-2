import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AlunosComponent } from './alunos/alunos.component';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    data:{name: 'Login'}
  },
  {
    path: 'home',
    component: HomeComponent,
    data:{name: 'Home'}, canActivate: [AuthGuard] 
  },
  {
    path: 'disciplinas',
    component: DisciplinasComponent,
    data:{name: 'Disciplinas'}, canActivate: [AuthGuard] 
  },
  {
    path: 'alunos',
    component: AlunosComponent,
    data:{name: 'Alunos'}, canActivate: [AuthGuard] 
  },
  {
    path: 'cadastro-aluno',
    component: CadastroAlunoComponent,
    data:{name: 'Cadastro de Alunos'}, canActivate: [AuthGuard] 
  },
];

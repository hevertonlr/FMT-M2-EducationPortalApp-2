import { CommonModule } from '@angular/common';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../shared/services/auth.service';
import { FuncsService } from '../../shared/services/funcs.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    public funcService: FuncsService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.funcService.form = this.loginForm;
  }
  forgotPassword = () =>
    Swal.fire(
      'Sucesso!',
      'Processo de recuperação de senha enviado para o e-mail cadastrado',
      'success'
    );

  onSubmit = () => {
    if (this.loginForm.invalid) {
      Swal.fire('Atenção!', 'Revise todos os campos!', 'warning');
      return;
    }
    this.authService.login(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value).subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        console.log('User logged in successfully!');
        this.router.navigate(['/home']);
      } else {
        console.log('Invalid credentials or login failed.');
        Swal.fire('Erro!', 'Usuário inválido!', 'error');
      }
    });
  };  
}

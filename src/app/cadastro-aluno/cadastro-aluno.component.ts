import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlunosService } from '../shared/services/alunos.service';
import { FuncsService } from '../shared/services/funcs.service';
import { Observable } from 'rxjs';
import { CursoModel } from '../shared/models/curso.model';
import { CursosService } from '../shared/services/cursos.service';

@Component({
  selector: 'app-cadastro-aluno',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro-aluno.component.html',
  styleUrl: './cadastro-aluno.component.scss',
})
export class CadastroAlunoComponent implements OnInit {
  alunoForm: FormGroup;
  alunoEdit: any;
  cursos$!: Observable<CursoModel[]>;
  //cursos: string[] = ['Curso A', 'Curso B', 'Curso C'];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alunosService: AlunosService,
    public funcService: FuncsService,
    private cursosService: CursosService
  ) {
    this.alunoForm = this.fb.group({
      id: [''],
      nomeCompleto: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      curso: ['', Validators.required],
    });
    this.funcService.form = this.alunoForm;
    this.cursos$ = cursosService.getCursos();
  }

  ngOnInit() {
    const state = history.state;
    if (state?.aluno) {
      this.alunoEdit = state?.aluno;
      this.alunoForm.patchValue(this.alunoEdit);
    }
  }

  onSubmit = () => {
    if (!this.alunoForm.valid) {
      Swal.fire('Atenção!', 'Preencha todos os campos!', 'warning');
      return;
    }
    console.log(this.alunoForm.value);
    if(this.alunoForm.get('id')?.value !== '')
      this.alunosService.updateAluno(this.alunoForm.value);
    else{
      delete this.alunoForm.value.id;
      console.log(this.alunoForm.value);
      this.alunosService.createAluno(this.alunoForm.value);
    }

    this.router.navigate(['/alunos']);
  };
}

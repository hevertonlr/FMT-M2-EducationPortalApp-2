import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlunoModel } from '../shared/models/aluno.model';
import { map, Observable } from 'rxjs';
import { AlunosService } from '../shared/services/alunos.service';



@Component({
  selector: 'app-alunos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss',
})
export class AlunosComponent {
  searchInput: string = '';
  alunos$!: Observable<AlunoModel[]>;
  alunosFiltrados$!: Observable<AlunoModel[]>;

  constructor(private router: Router,private alunosService: AlunosService) {
    this.alunos$ = alunosService.getAlunos();
    this.alunosFiltrados$ = this.alunos$;
  }
  
    
  onSearch = () => {
    if (!this.searchInput) {
      this.alunosFiltrados$ = this.alunos$;
      return;
    }
    let filterWords = this.searchInput.toLocaleLowerCase();
    this.alunosFiltrados$ = this.alunos$.pipe(
      map(alunos => alunos.filter(aluno => 
        aluno.nomeCompleto.toLowerCase().includes(filterWords) ||
        aluno.email.toLowerCase().includes(filterWords)))
    )
  };
  onEdit(aluno: AlunoModel): void {
    console.log(aluno);
    this.router.navigate(['/cadastro-aluno'], { state: { aluno } });
  }

  onDelete = (searchAluno: AlunoModel) => {
    Swal.fire({
      title: 'Confirma a exclusão deste usuário?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
    }).then((result) => {
      if (result.isConfirmed) {
        this.alunosService.deleteAluno(searchAluno.id);
        
        
        Swal.fire('Excluido!', 'Usuário excluído com sucesso', 'success').then(() =>{
          this.alunos$ = this.alunos$.pipe(
            map(alunos => alunos.filter(aluno => aluno !== searchAluno))
          )
          this.onSearch();
        });
      }
    });
  };
}

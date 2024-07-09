import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DisciplinasService } from '../shared/services/disciplinas.service';
import { map, Observable } from 'rxjs';
import { DisciplinasModel } from '../shared/models/disciplinas.model';
import { CursosService } from '../shared/services/cursos.service';
import { CursoModel } from '../shared/models/curso.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-disciplinas',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './disciplinas.component.html',
  styleUrl: './disciplinas.component.scss'
})
export class DisciplinasComponent{
  cursoId:string = "";
  disciplinas$!: Observable<DisciplinasModel[]>;
  cursos$!: Observable<CursoModel[]>;
  constructor(private cursosServices:CursosService, private disciplinasService:DisciplinasService){
    this.cursos$ = cursosServices.getCursos();
    
//      this.disciplinas$ = disciplinasService.getDisciplinasCurso
  }

  onSelectChange = () =>{
    this.disciplinas$ = this.disciplinasService.getDisciplinasCurso(this.cursoId);
  }
  // disciplinas: { [key: string]: Semestre[] } = {
  //   'Curso A': [
  //     { nome: 'Primeiro semestre', materias: ['B', 'C'] },
  //     { nome: 'Segundo semestre', materias: ['D', 'J'] },
  //   ],
  //   'Curso X': [
  //     { nome: 'Primeiro semestre', materias: ['B', 'E'] },
  //     { nome: 'Segundo semestre', materias: ['E', 'F'] },
  //   ],
  // };
}

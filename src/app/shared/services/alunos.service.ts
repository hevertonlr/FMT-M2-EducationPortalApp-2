import { Injectable } from '@angular/core';
import { AlunoModel } from '../models/aluno.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { CursosService } from './cursos.service';
import { CursoModel } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  private readonly API_URL = 'http://192.168.254.6:3000/alunos';
  constructor(private http: HttpClient,private cursosService: CursosService) { }

  getAlunos = ():Observable<AlunoModel[]> => 
    this.http.get<AlunoModel[]>(this.API_URL);
  getAluno = (id:number):Observable<AlunoModel> =>
    this.http.get<AlunoModel>(this.API_URL+`/${id}`);
  createAluno = (aluno:AlunoModel) =>
    this.http.post(this.API_URL,JSON.stringify(aluno)).subscribe(data => data);
  updateAluno = (aluno:AlunoModel) =>
    this.http.put(this.API_URL+`/${aluno.id}`,JSON.stringify(aluno)).subscribe(data => data);
  deleteAluno = (id:string) =>
    this.http.delete(this.API_URL+`/${id}`).subscribe(data => data);
  getAlunosWithCursoNome = (): Observable<AlunoModel[]> => {
    return this.getAlunos().pipe(
      switchMap((alunos: AlunoModel[]) => {
        const cursoIds = alunos.map(aluno => aluno.curso);
        return this.cursosService.getCursoForAlunos(cursoIds).pipe(
          map((cursos: CursoModel[]) => alunos.map(aluno => {
              aluno.cursonome = cursos.find(c => c.id === aluno.curso)?.nome || ''
              return { ...aluno };
            })
          )
        );
      })
    );
  };
}

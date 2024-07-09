import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DisciplinasModel } from '../models/disciplinas.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {
  private readonly API_URL = 'http://192.168.254.6:3000/disciplinas';
  constructor(private http: HttpClient) { }
  getDisciplinasCurso = (idcurso:string):Observable<DisciplinasModel[]> => 
    this.http.get<DisciplinasModel[]>(this.API_URL+`?idcurso=${encodeURIComponent(idcurso)}`);
  getDisciplinasCursoSemestre = (idcurso:string,semestre:number):Observable<DisciplinasModel[]> => {
    return this.getDisciplinasCurso(idcurso).pipe(
      map(disciplinas => disciplinas.filter(disciplina => 
        disciplina.idcurso == idcurso && disciplina.semestre == semestre))
    )
  }
    
  // getDisciplina = (id:number):Observable<DisciplinasModel> =>
  //   this.http.get<DisciplinasModel>(this.API_URL+`/${id}`);
  // createDisciplina = (aluno:DisciplinasModel) =>
  //   this.http.post(this.API_URL,JSON.stringify(aluno)).subscribe(data => data);
  // deleteDisciplina = (id:string) =>
  //   this.http.delete(this.API_URL+`/${id}`).subscribe(data => data);
}

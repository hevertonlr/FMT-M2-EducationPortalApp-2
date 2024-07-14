import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CursoModel } from '../models/curso.model';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private readonly API_URL = 'http://192.168.254.6:3000/cursos';
  constructor(private http: HttpClient) { }
  getCursos = ():Observable<CursoModel[]> => 
    this.http.get<CursoModel[]>(this.API_URL);
  getCurso = (id:string):Observable<CursoModel> =>
    this.http.get<CursoModel>(this.API_URL+`/${id}`);
  // createCurso = (curso:CursoModel) =>
  //   this.http.post(this.API_URL,JSON.stringify(curso)).subscribe(data => data);
  // deleteCurso = (id:string) =>
  //   this.http.delete(this.API_URL+`/${id}`).subscribe(data => data);
  getCursoForAlunos = (cursoIds: string[]): Observable<CursoModel[]> => 
    forkJoin(cursoIds.map(id => this.getCurso(id)));
  
}

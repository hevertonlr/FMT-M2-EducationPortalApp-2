import { Injectable } from '@angular/core';
import { AlunoModel } from '../models/aluno.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  private readonly API_URL = 'http://192.168.254.6:3000/alunos';
  constructor(private http: HttpClient) { }

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
}

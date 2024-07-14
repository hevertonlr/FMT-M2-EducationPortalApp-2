import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private readonly API_URL = 'http://192.168.254.6:3000/users';
  constructor(private http: HttpClient) { }
  getUsers = ():Observable<UserModel[]> => 
    this.http.get<UserModel[]>(this.API_URL);
  getUser = (email: string):Observable<UserModel> =>
    this.http.get<UserModel>(this.API_URL + `?email=${encodeURIComponent(email)}`);
}

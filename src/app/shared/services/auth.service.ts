import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import sign from 'jwt-encode';
import { jwtDecode } from 'jwt-decode';
import { catchError, map, Observable, of } from 'rxjs';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'fmt-m2-educationportalapp';
  private readonly PRIVATE_KEY = environment.privateKey;
  private readonly PUBLIC_KEY = environment.publicKey; 
  private isAuthenticated = false;

  constructor(private usuariosService: UsuariosService) {
    this.isAuthenticated = !!sessionStorage.getItem(this.TOKEN_KEY);
  }

  login = (email: string, password: string): Observable<boolean>  => {
    return this.usuariosService.getUser(email)
    .pipe(
      map((response: any) => { 
        const user = response[0];
        if (user.email !== email || user.password !== password) {
          return false;
        }

        const token = this.generateJwtToken({
          id: user.id,
          username: user.username,
          email: user.email,
          image: 'assets/images/'+user.image,
          admin: user.admin
        });
        this.setToken(token);
        return true;

      }),
      catchError(() => of(false)) 
    );
  }
  register(user: { username: string; password: string }): boolean {
    // Implement your signup logic (e.g., create user in local storage)
    // Return true if signup is successful, false otherwise
    return true;
  }

  

  logout = (): void => this.clearToken();
  isAuthenticatedUser = (): boolean => this.isAuthenticated;

  getTokenContent = <T>() => {
    const storageContent = sessionStorage.getItem(this.TOKEN_KEY);
    if(!storageContent) return null;
    return this.readJwtToken<T>(storageContent);
  }
  
  private setToken = (token: string) => {
    this.isAuthenticated = true;
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  private clearToken = () => {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticated = false;
  }

  generateJwtToken = (payload: Object) =>
    sign(payload, this.PRIVATE_KEY, { algorithm: 'RS256' });

  readJwtToken = <T>(token: string): T | null => {
    try {
      return jwtDecode<T>(token);
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  };
}

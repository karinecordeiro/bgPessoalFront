import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

    token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }


  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>('https://blogpessoalkarinec.herokuapp.com/usuario/logar', usuarioLogin) //colocar endpoints do back

  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('https://blogpessoalkarinec.herokuapp.com/usuario/cadastrar', usuario)//colocar endpoints do back

  }
  atualizar(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>('https://blogpessoalkarinec.herokuapp.com/usuario/atualizar', usuario, this.token)
  }

  getByIdUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://blogpessoalkarinec.herokuapp.com/usuario/${id}`, this.token)

  }

  logado(){
    let ok: boolean = false

    if (environment.token != ""){
      ok = true
    }
    return ok
  }

  adm(){
    let ok: boolean = false

    if (environment.tipo == 'adm'){
      ok = true
    }
    return ok
  }
}

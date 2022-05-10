import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {
  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagem(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('https://blogpessoalkarinec.herokuapp.com/postagens', this.token)
  }
  getByIdPostagem(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(`https://blogpessoalkarinec.herokuapp.com/postagens/${id}`, this.token)

  }
  postPostagem(Postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem> ('https://blogpessoalkarinec.herokuapp.com/postagens', Postagem, this.token)
  }
  putPostagem(Postagem: Postagem): Observable<Postagem>{
    return this.http.put<Postagem> ('https://blogpessoalkarinec.herokuapp.com/postagens', Postagem, this.token)
  }
  deletePostagem(id: number) {
    return this.http.delete(`https://blogpessoalkarinec.herokuapp.com/postagens/${id}`, this.token)
  }
}
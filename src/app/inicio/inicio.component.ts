import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  listaPostagens: Postagem[]
  postagem: Postagem = new Postagem ()
  tituloPost: string

  listaTemas: Tema[]
  idTema: number
  tema: Tema = new Tema()
  descricaoTema: string

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router : Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService,
    private alertas: AlertasService,
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if(environment.token == ""){
      this.alertas.showAlertInfo('Sua sessão expirou. Faça seu login novamente!')
  this.router.navigate(['/entrar'])
  }
  this.authService.refreshToken()
  this.getAllTemas()
  this.getAllPostagens()
  }
  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }
  getAllPostagens(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) =>{
      this.listaPostagens = resp
    })
  }
findByIdUsuario(){
  this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) =>{
    this.usuario= resp
  })
}

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) =>{
      this.postagem = resp
      this.alertas.showAlertSuccess("Postagem realizada com sucesso!")
      this.postagem = new Postagem() //deixa limpo para próxima postagem
      this.getAllPostagens() //lista todas as postagens de novo
    })
  }

  findByTituloPostagem(){

    if(this.tituloPost == ''){
      this.getAllPostagens()
    }else {
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) =>{
        this.listaPostagens = resp
      })
    }
  }

  findByDescricaoTema(){

    if(this.descricaoTema == ''){
      this.getAllTemas()
    }else {
      this.temaService.getByDescricaoTema(this.descricaoTema).subscribe((resp: Tema[]) =>{
        this.listaTemas = resp
      })
    }

  }

}


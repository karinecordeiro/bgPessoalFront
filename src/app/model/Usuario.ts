import { Postagem } from "./Postagem";

export class Usuario{
  public id: number; //nada de int double... aqui é number
  public nome: string; //string com s minusciulo
  public usuario: string;
  public senha: string;
  public foto: string;
  public tipo: string;
  public postagem: Postagem[];
}


import { Receita } from "./Receita";
import { Despesa } from "./Despesa";
import { Usuario } from "./abstratas/Usuario";


export class UsuarioComum extends Usuario{
  
  saldo!: number;

  receitas: Receita[] = [];

  despesas: Despesa[] = [];




  
}
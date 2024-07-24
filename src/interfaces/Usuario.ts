import { Despesa } from "../models/Despesa";
import { Receita } from "../models/Receita";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  foto: Blob;
  saldo: number;

  receitas: Receita[] ;

  despesas: Despesa[] ;
}
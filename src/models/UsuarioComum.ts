
import { Receita } from "./Receita";
import { Despesa } from "./Despesa";
import { Usuario } from "../interfaces/Usuario";


export class UsuarioComum implements Usuario {
  id!: number;
  nome!: string;
  email!: string;
  senha!: string;
  foto!: Blob;
  saldo!: number;
  receitas: Receita[] = [];
  despesas: Despesa[] = [];





}
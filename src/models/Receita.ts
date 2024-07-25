
import { UsuarioComum } from "./UsuarioComum";
import { Conta } from "../interfaces/Conta";

import { Status } from "../enums/Status";


export enum CategoriaReceita {
  SALARIO = "Salário",
  INVESTIMENTO = "Investimento",
  PRODUTOS_E_SERVICOS = "Produtos e Servicos Vendidos",
}


export class Receita implements Conta{
  ;
  id!: number;
  titulo!: string;
  descricao!: string;
  valor!: number;
  
  categoria!: CategoriaReceita;


  usuario!: UsuarioComum;

  status: Status = Status.ATIVO

}
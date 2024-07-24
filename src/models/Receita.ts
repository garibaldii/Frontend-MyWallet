
import { UsuarioComum } from "./UsuarioComum";
import { Conta } from "./abstratas/Conta";

import { Status } from "../enums/Status";


export enum CategoriaReceita {
  SALARIO = "Salário",
  INVESTIMENTO = "Investimento",
  PRODUTOS_E_SERVICOS = "Produtos e Servicos Vendidos",
}


export class Receita extends Conta{


  operacao(receita: Receita, usuario: UsuarioComum): void {
    usuario.saldo = receita.valor + usuario.saldo
    receita.status = Status.FINALIZADO

  }
 

  categoria!: CategoriaReceita;


  usuario!: UsuarioComum;


}
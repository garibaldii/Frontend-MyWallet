
import { UsuarioComum } from "./UsuarioComum";
import { Conta } from "./abstratas/Conta";
import { Status } from "../enums/Status";


export enum CategoriaDespesa {
    ALIMENTACAO = "Alimentação",
    CARTAO_DE_CREDITO = "Cartão de Crédito",
    SEGURO_MEDICO = "Seguro Médico",
  }


export class Despesa extends Conta{

      operacao(conta: Conta, usuario: UsuarioComum): void {
        usuario.saldo = conta.valor - usuario.saldo
        conta.status = Status.FINALIZADO
      }

      categoria!: CategoriaDespesa;
      

      usuario!: UsuarioComum;

    
    }

import { UsuarioComum } from "./UsuarioComum";
import { Conta } from "../interfaces/Conta";
import { Status } from "../enums/Status";


export enum CategoriaDespesa {
    ALIMENTACAO = "Alimentação",
    CARTAO_DE_CREDITO = "Cartão de Crédito",
    SEGURO_MEDICO = "Seguro Médico",
  }


export class Despesa implements Conta{
      
      id!: number;
      titulo!: string;
      descricao!: string;
      valor!: number;
      categoria!: CategoriaDespesa;
      usuario!: UsuarioComum;
      status: Status = Status.ATIVO;
    
    }
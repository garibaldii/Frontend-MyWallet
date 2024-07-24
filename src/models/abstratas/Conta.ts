import { Status } from "@/enums/Status";
import { Transacao } from "@/interfaces/Transacao";
import { UsuarioComum } from "../UsuarioComum";


export abstract class Conta implements Transacao{



      titulo!: String;
    

      descricao!: String;
    

      valor!: number;


      status: Status = Status.ATIVO


    abstract operacao(conta: Conta, usuario: UsuarioComum): void 
    
}
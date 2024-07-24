import { Conta } from "@/models/abstratas/Usuario";
import { UsuarioComum } from "entity/UsuarioComum";



export interface Transacao{
    
    operacao(conta: Conta, usuario: UsuarioComum):void

}
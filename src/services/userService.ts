import { apiClient } from "./apiServices";

import { UsuarioComum } from "@/models/UsuarioComum";
import { verificaJwt } from "./authService";



export const cadastraUsuario = async (usuario: Omit<UsuarioComum, 'id'>): Promise<UsuarioComum> => {
    const resposta = await apiClient.post('usuarioComum/', usuario)
    return resposta.data;
}

export const retornaUsuarioId = async (id: string): Promise<UsuarioComum> => {
    const resposta = await apiClient.get(`usuarioComum/${id}`)
    return resposta.data
}


export const retornaUsarioJwt = async (): Promise<UsuarioComum> => {
    const sessao = await verificaJwt()
    const idUsuario = sessao.id

    const usuario = await retornaUsuarioId(idUsuario)

    return usuario
}
import { Receita } from "@/models/Receita";
import { apiClient } from "./apiServices";
import { UsuarioComum } from "@/models/UsuarioComum";

export const cadastrarReceita = async (receita: Receita): Promise<Receita> => {
    const resposta = await apiClient.post('receita/', receita)
   return resposta.data
}

export const obterReceitaPorId = async (id: number): Promise<Receita> => {
    const resposta = await apiClient.get(`receita/${id}`)
    return resposta.data
}

export const editarReceita = async (id: number, receita: Receita): Promise<Receita> => {
    const resposta = await apiClient.put(`receita/${id}`, receita)
    return resposta.data
}

export const deletarReceita = async (id: number): Promise<void> => {
    const resposta = await apiClient.delete(`receita/${id}`)
}

export const finalizarReceita = async (idReceita: number, idUsuario: number): Promise<[Receita, UsuarioComum]> => {
    const resposta = await apiClient.post(`receita/${idReceita}/operacao/${idUsuario}`)
    return resposta.data

} 
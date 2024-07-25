import { Despesa } from "@/models/Despesa";
import { apiClient } from "./apiServices";
import { UsuarioComum } from "@/models/UsuarioComum";

export const cadastrarDespesa = async (despesa: Despesa): Promise<Despesa> => {
    const resposta = await apiClient.post('despesa/', despesa)
   return resposta.data
}

export const deletarDespesa = async (id: number): Promise<void> => {
    const resposta = await apiClient.delete(`despesa/${id}`)
}

export const finalizarDespesa = async (idDespesa: number, idUsuario: number): Promise<[Despesa, UsuarioComum]> => {
    const resposta = await apiClient.post(`despesa/${idDespesa}/operacao/${idUsuario}`)
    return resposta.data

} 

export const editarDespesa = async (id: number, despesa: Despesa): Promise<Despesa> => {
    const resposta = await apiClient.put(`despesa/${id}`, despesa)
    return resposta.data
}

export const obterDespesaPorId = async (id: number): Promise<Despesa> => {
    const resposta = await apiClient.get(`despesa/${id}`)
    return resposta.data
}
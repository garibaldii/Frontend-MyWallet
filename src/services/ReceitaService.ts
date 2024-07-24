import { Receita } from "@/models/Receita";
import { apiClient } from "./apiServices";

export const cadastrarReceita = async (receita: Receita): Promise<Receita> => {
    const resposta = await apiClient.post('receita/', receita)
   return resposta.data
}


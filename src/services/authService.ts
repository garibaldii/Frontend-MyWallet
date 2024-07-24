import { apiClient } from "./apiServices";

export const loginUsuario = async (email: string, senha: string) => {
    const resposta = await apiClient.post("/auth/login/", {email, senha})
    return resposta.data
}
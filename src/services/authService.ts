import { apiClient } from "./apiServices";

export const loginUsuario = async (email: string, senha: string) => {
    const resposta = await apiClient.post("/auth/login/", {email, senha})
    console.log(resposta.data.token)
    const {token} = resposta.data   

    localStorage.setItem('token', token);

    return resposta.data
}

export const verificaJwt = async () => {
    const resposta = await apiClient.post("/auth/verificar")
    const sessao = resposta.data

    return sessao
}
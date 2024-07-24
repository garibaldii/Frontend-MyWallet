import { apiClient } from "./apiServices";

import { UsuarioComum } from "@/models/UsuarioComum";

export const cadastraUsuario = async (usuario: UsuarioComum): Promise<UsuarioComum> => {
    const resposta = await apiClient.post('usuarioComum/', usuario)
    return resposta.data;
}
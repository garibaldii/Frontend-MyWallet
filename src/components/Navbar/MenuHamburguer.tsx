import React from "react";

const DropdownMenu = () => {
    return (
        <div className="flex flex-col">
            <ul className= "flex flex-col gap-4">
                <li>Cadastrar Nova Conta</li>
                <li>Contas a Receber</li>
                <li>Contas a Pagar</li>
                <li>Histórico de Contas Pagas</li>
            </ul>
        </div>
    )
}


export default DropdownMenu
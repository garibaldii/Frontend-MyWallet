interface DropdownMenuProps {
    isOpen: boolean;
  }
  
  const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen }) => {
    return (
      <div className={`flex flex-col dropdownMenu ${isOpen ? "open" : ""}`}>
        <ul className="flex flex-col gap-4 text-xs">
          <li className="dropdownItem">Cadastrar Nova Conta</li>
          <li className="dropdownItem">Contas a Receber</li>
          <li className="dropdownItem">Contas a Pagar</li>
          <li className="dropdownItem">Histórico de Contas Pagas</li>
        </ul>
      </div>
    );
  };
  
  export default DropdownMenu;
import Link from 'next/link';

interface DropdownMenuProps {
    isOpen: boolean;
  }
  
  const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen }) => {
    return (
      <div className={`flex flex-col dropdownMenu ${isOpen ? "open" : ""}`}>
        <ul className="flex flex-col gap-4 text-xs">

          <Link href="/ContaForm">
          <li className="dropdownItem">Cadastrar Nova Conta</li>
          </Link>

          
          <Link href="/Receitas">
          <li className="dropdownItem" >Contas a Receber</li>
          </Link>
          
          <Link href="/Despesas">
          <li className="dropdownItem">Contas a Pagar</li>
          </Link>

          <Link href="/ContasFinalizadas">
          <li className="dropdownItem">Histórico de Contas Finalizadas </li>
          </Link>
        </ul>
      </div>
    );
  };
  
  export default DropdownMenu;
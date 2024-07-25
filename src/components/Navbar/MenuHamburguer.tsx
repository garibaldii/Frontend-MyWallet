// src/components/MenuHamburguer.tsx

import Link from 'next/link';

interface DropdownMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, closeMenu }) => {
  const handleMenuClick = () => {
    closeMenu();
  };

  return (
    <div className={`flex flex-col dropdownMenu ${isOpen ? "open" : ""}`}>
      <ul className="flex flex-col gap-4 text-xs">
        <Link href="/ContaForm">
          <li className="dropdownItem" onClick={handleMenuClick}>Cadastrar Nova Conta</li>
        </Link>

        <Link href="/Receitas">
          <li className="dropdownItem" onClick={handleMenuClick}>Contas a Receber</li>
        </Link>
        
        <Link href="/Despesas">
          <li className="dropdownItem" onClick={handleMenuClick}>Contas a Pagar</li>
        </Link>

        <Link href="/ContasFinalizadas">
          <li className="dropdownItem" onClick={handleMenuClick}>Histórico de Contas Finalizadas</li>
        </Link>
      </ul>
    </div>
  );
};

export default DropdownMenu;

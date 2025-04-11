import { useState } from "react";
import { RxEnter, RxHamburgerMenu, RxCross2 } from "react-icons/rx";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50 ">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo e botão "Abra sua conta" lado a lado (mobile) */}
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Logo */}
          <div className="flex items-center cursor-pointer">
            <span className="text-3xl tracking-tight">
              <span className="text-black font-bold">ita</span>
              <span className="text-orange-600 font-extrabold">Lux</span>
            </span>
          </div>

          {/* Botão "Abra sua conta" (somente mobile) */}
          <div className="md:hidden">
            <a href="#abrir_conta">
              <button className="cursor-pointer bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-2 rounded-full text-sm">
                Abra sua conta
              </button>
            </a>
          </div>
        </div>

        {/* Links (desktop) */}
        <ul className="hidden md:flex gap-10 text-gray-700 font-medium">
          <li><a href="#investimentos" className="hover:text-orange-600 transition">Investimentos</a></li>
          <li><a href="#educacao" className="hover:text-orange-600 transition">Educação</a></li>
          <li><a href="#sobre" className="hover:text-orange-600 transition">Sobre</a></li>
          <li><a href="#sobre" className="hover:text-orange-600 transition">Tire suas dúvidas</a></li>
        </ul>

        {/* Botões (desktop) */}
        <div className="hidden md:flex gap-4 items-center">
          <a href="#acesse_conta">
            <button className="group flex items-center gap-2 text-black font-medium cursor-pointer">
              Acesse sua conta
              <RxEnter size={18} className="text-orange-600 group-hover:translate-x-1 transition" />
            </button>
          </a>
          <a href="#abrir_conta">
            <button className="cursor-pointer bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-2 rounded-full hover:from-orange-500 hover:to-orange-700 transition">
              Abra sua conta
            </button>
          </a>
        </div>

        {/* Ícone menu mobile */}
        <div className="md:hidden ml-2">
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <RxCross2 size={28} className="text-black" />
            ) : (
              <RxHamburgerMenu size={28} className="text-black" />
            )}
          </button>
        </div>
      </nav>

      {/* Menu Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white px-4 pb-4 shadow">
          <div className="-mx-4 h-px bg-gray-400 w-screen "></div>
        
          <div className="mt-4 flex flex-col gap-2">
            <a href="#acesse_conta">
              <button className="cursor-pointer flex items-center gap-2 text-orange-600 font-medium">
                Acesse sua conta
                <RxEnter size={18} />
              </button>
            </a>
          </div>

          <ul className="flex flex-col gap-3 mt-4 text-gray-700 font-medium">
            <li><a href="#investimentos">Investimentos</a></li>
            <li><a href="#educacao">Educação</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#sobre">Tire suas dúvidas</a></li>
          </ul>

          
        </div>
      )}
    </header>
  );
}

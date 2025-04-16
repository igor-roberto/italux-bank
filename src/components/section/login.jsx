import { useState } from "react";
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function LogIn() {
    const [formData, setFormData] = useState({
        cpf: '',
        senha: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        let maskedValue = value;

        if (name === 'cpf') {
            maskedValue = value.replace(/\D/g, '').slice(0, 11)
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }

        setFormData({ ...formData, [name]: maskedValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (formData.cpf.length < 14) {
            newErrors.cpf = 'CPF inválido';
        }

        if (!formData.senha) {
            newErrors.senha = 'Senha é obrigatória';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log('Login enviado:', formData);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* barra menu */}
            <div className="bg-white shadow z-50 py-4">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-center md:justify-start">
                    <Link to="/">
                        <span className="text-3xl cursor-pointer tracking-tight">
                            <span className="text-black font-bold">ita</span>
                            <span className="text-orange-600 font-extrabold">Lux</span>
                        </span>
                    </Link>
                </div>
            </div>
            {/* btn voltar */}
            <div className="mt-8 flex justify-start px-4 group hidden md:flex">
            <Link to='/'>   
                <button className="py-2 px-5 rounded-full bg-orange-500 cursor-pointer text-white flex items-center gap-2"><FaLongArrowAltLeft size={18} className="transform group-hover:translate-x-1 transition"/>Voltar</button>
            </Link> 
            </div>
            {/* formulário */}
            <div className="pt-4">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-4">
                    <h1 className="text-3xl font-bold text-orange-600 mb-4">Bem-vindo de volta!</h1>

                    <input
                        type="text"
                        name="cpf"
                        placeholder="Digite seu CPF"
                        value={formData.cpf}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-gray-200 rounded-md border ${errors.cpf ? 'border-red-500' : 'border-transparent'}`}
                    />
                    {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}

                    <input
                        type="password"
                        name="senha"
                        placeholder="Digite sua senha"
                        value={formData.senha}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-gray-200 rounded-md border ${errors.senha ? 'border-red-500' : 'border-transparent'}`}
                    />
                    {errors.senha && <p className="text-red-500 text-sm mt-1">{errors.senha}</p>}
                    <div className="text-right pr-2">
                        <Link to='/abrir-conta'>
                            <h1 className="underline text-blue-700">Ainda não tenho conta!</h1>
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition-all cursor-pointer"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

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

    const handleSubmit = async (e) => {
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
            try {
                const response = await fetch("http://localhost:8000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        cpf: formData.cpf.replace(/\D/g, ''), // remove . e -
                        senha: formData.senha
                    })
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log("Login bem-sucedido!", data);
    
                    // Salvar token no localStorage, se usar JWT
                    // localStorage.setItem("token", data.access_token);
    
                    // Redirecionar ou mostrar mensagem
                    alert("Login realizado com sucesso!");
                } else {
                    const errorData = await response.json();
                    alert("Erro no login: " + errorData.detail);
                }
    
            } catch (error) {
                console.error("Erro na requisição:", error);
                alert("Erro na conexão com o servidor");
            }
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
            {/* <div className="mt-8 flex justify-start px-4 group hidden md:flex">
            <Link to='/'>   
                <button className="py-2 px-5 rounded-full bg-orange-500 cursor-pointer text-white flex items-center gap-2"><FaLongArrowAltLeft size={18} className="transform group-hover:translate-x-1 transition"/>Voltar</button>
            </Link> 
            </div> */}
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

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition-all cursor-pointer"
                    >
                        Entrar
                    </button>

                    <div className="text-right pr-2">
                        <Link to='/abrir-conta'>
                            <h1 className="underline text-blue-700">Ainda não tenho conta!</h1>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

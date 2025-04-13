import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function FormPage() {

    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        nascimento: '',
        telefone: '',
        email: '',
        confirmEmail: '',
        senha: '',
        confirmSenha: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Máscaras simples
        let maskedValue = value;
        if (name === 'cpf') {
            maskedValue = value.replace(/\D/g, '').slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else if (name === 'telefone') {
            maskedValue = value.replace(/\D/g, '').slice(0, 11)
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
        } else if (name === 'nascimento') {
            maskedValue = value.replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '$1/$2')
                .replace(/(\d{2})(\d)/, '$1/$2')
                .slice(0, 10);
        }

        setFormData({ ...formData, [name]: maskedValue });
    };

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const senhaRegex = /^.{6,}$/;
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; 
        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/; 
        const nascimentoRegex = /^\d{2}\/\d{2}\/\d{4}$/;

        if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
        if (!formData.cpf || !cpfRegex.test(formData.cpf)) newErrors.cpf = 'CPF inválido';
        if (!formData.nascimento || !nascimentoRegex.test(formData.nascimento)) newErrors.nascimento = 'Data de nascimento inválida';
        if (!formData.telefone || !telefoneRegex.test(formData.telefone)) newErrors.telefone = 'Telefone inválido';
        if (!emailRegex.test(formData.email)) newErrors.email = 'E-mail inválido';
        if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = 'E-mails não coincidem';
        if (!senhaRegex.test(formData.senha)) newErrors.senha = 'Senha deve ter no mínimo 6 caracteres';
        if (formData.senha !== formData.confirmSenha) newErrors.confirmSenha = 'Senhas não coincidem';

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log('Formulário enviado:', formData);
            // Aqui você pode redirecionar ou enviar para a API
        }
    };

    return (
        <div className="min-h-screen bg-white">

            {/* Barra de navegação */}
            <div className="bg-white shadow z-50 py-4">
                
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-start">
                    <Link to='/'>
                    <span className="text-3xl tracking-tight  cursor-pointer">
                        <span className="text-black font-bold">ita</span>
                        <span className="text-orange-600 font-extrabold">Lux</span>
                    </span>
                    </Link>
                </div>
            </div>

            {/* Formulário */}
            <div className="p-4">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-4">
                    <h1 className="text-3xl font-bold text-orange-600 mb-2">Vamos começar o seu cadastro</h1>
                    <p className='text-sm text-gray-700'>Crie sua conta digital de forma rápida, segura e 100% online.<br />
                        Você só precisa de alguns minutos e um documento com foto.<br />
                        Tudo é feito de forma simples e sem burocracia — direto pelo nosso sistema.
                        < br /> <br />
                        💡 <span className='font-semibold'> Dica:</span> Separe RG ou CNH antes de começar. Seus dados estarão protegidos durante todo o processo.</p>
                    {[
                        { name: 'nome', placeholder: 'Nome completo' },
                        { name: 'cpf', placeholder: 'CPF' },
                        { name: 'nascimento', placeholder: 'Data de nascimento (dd/mm/aaaa)' },
                        { name: 'telefone', placeholder: 'Telefone celular' },
                        { name: 'email', placeholder: 'E-mail', type: 'email' },
                        { name: 'confirmEmail', placeholder: 'Confirmação de e-mail', type: 'email' },
                        { name: 'senha', placeholder: 'Senha', type: 'password' },
                        { name: 'confirmSenha', placeholder: 'Confirmação de senha', type: 'password' }
                    ].map(({ name, placeholder, type = 'text' }) => (
                        <div key={name}>
                            <input
                                type={type}
                                name={name}
                                placeholder={placeholder}
                                value={formData[name]}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 bg-gray-200 font-bold rounded-md border ${errors[name] ? 'border-red-500' : 'border-transparent'}`}
                            />
                            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
                        </div>
                    ))}
                    < br />
                    <p className='text-[14px]'>Ao clicar em Enviar informações, <span className='font-bold'>você autoriza a itaLux a coletar seus dados pessoais de acordo com a nossa Política de Privacidade,</span> com o objetivo de comunicar informações sobre o processo de abertura da sua conta. Caso queira, você pode ajustar quais notificações e avisos deseja receber.</p>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 cursor-pointer transition-all"
                    >
                        Enviar informações!
                    </button>
                </form>
            </div>

        </div>
    );
}
